class Dashboard {
    constructor() {
        this.user = null;
        this.bookmarks = [];
        this.searches = [];
        this.reviews = [];
        this.allDestinations = [];
        this.init();
    }
    
    init() {
        this.checkAuthentication();
        this.loadUserData();
        this.bindEvents();
        this.loadDashboardData();
    }
    
    checkAuthentication() {
        const userData = localStorage.getItem('user');
        if (!userData) {
            window.location.href = 'login.php';
            return;
        }
        
        try {
            this.user = JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
            window.location.href = 'login.php';
        }
    }
    
    loadUserData() {
        if (this.user) {
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = this.user.name || this.user.username || 'Traveler';
            }
        }
    }
    
    bindEvents() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
        
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadDashboardData();
                showMessage('Dashboard refreshed!', 'success');
            });
        }
        
        const clearSearchesBtn = document.getElementById('clearSearches');
        if (clearSearchesBtn) {
            clearSearchesBtn.addEventListener('click', () => {
                this.clearSearches();
            });
        }
    }
    
    async loadDashboardData() {
        try {
            const res = await fetch('get_dashboard_data.php');
            if (!res.ok) throw new Error('Failed to fetch dashboard data');
            const data = await res.json();

            this.allDestinations = data.destinations || [];
            this.bookmarks = this.allDestinations.filter(dest =>
                data.bookmarks.includes(parseInt(dest.id))
            );

            this.loadSearches();
            this.loadReviews();
            this.renderBookmarks();
            this.loadRecommendations();
            this.updateStats();
        } catch (err) {
            console.error('Dashboard load error:', err);
            showMessage('Could not load dashboard data.', 'error');
        }
    }

    
    loadBookmarks() {
        this.bookmarks = [];
        const destinations = this.getDestinationsData();
        
        destinations.forEach(dest => {
            const isBookmarked = localStorage.getItem(`bookmark_${dest.id}`);
            if (isBookmarked) {
                this.bookmarks.push(dest);
            }
        });
        
        this.renderBookmarks();
    }
    
    loadSearches() {
        const searchHistory = localStorage.getItem('searchHistory');
        this.searches = searchHistory ? JSON.parse(searchHistory) : [];
        
        this.renderSearches();
    }
    
    loadReviews() {
        const reviewsData = localStorage.getItem('userReviews');
        this.reviews = reviewsData ? JSON.parse(reviewsData) : [];
    }
    
    loadRecommendations() {
        const recommendations = this.getRecommendations(this.allDestinations);
        this.renderRecommendations(recommendations);
    }
    
    getRecommendations(destinations) {
        const userPreferences = this.getUserPreferences();
        let recommendations = [...destinations];
        
        recommendations = recommendations.filter(dest => 
            !this.bookmarks.some(bookmark => bookmark.slug === dest.id)
        );
        
        recommendations.sort((a, b) => b.rating - a.rating);
        return recommendations.slice(0, 6);
    }
    
    getUserPreferences() {
        return {
            categories: ['Mountain', 'Beach', 'Cultural'],
            countries: ['Switzerland', 'Greece', 'Canada']
        };
    }
    
    renderBookmarks() {
        const bookmarksList = document.getElementById('bookmarksList');
        const emptyBookmarks = document.getElementById('emptyBookmarks');
        
        if (!bookmarksList) return;
        
        if (this.bookmarks.length === 0) {
            bookmarksList.innerHTML = '';
            if (emptyBookmarks) emptyBookmarks.style.display = 'block';
            return;
        }
        
        if (emptyBookmarks) emptyBookmarks.style.display = 'none';
        
        const bookmarksHTML = this.bookmarks.slice(0, 5).map(bookmark => `
            <div class="bookmark-item">
                <img src="${bookmark.image}" alt="${bookmark.name}" class="bookmark-image">
                <div class="bookmark-info">
                    <h4>${bookmark.name}</h4>
                    <p>${bookmark.country} • ${bookmark.category}</p>
                </div>
                <div class="bookmark-actions">
                    <a href="destination.php?id=${bookmark.slug}" class="btn btn-primary">View</a>
                    <button class="btn btn-secondary remove-bookmark" data-id="${bookmark.slug}">Remove</button>
                </div>
            </div>
        `).join('');
        
        bookmarksList.innerHTML = bookmarksHTML;
        
        const removeButtons = document.querySelectorAll('.remove-bookmark');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const destinationId = btn.dataset.id;
                this.removeBookmark(destinationId);
            });
        });
    }
    
    renderSearches() {
        const searchesList = document.getElementById('searchesList');
        const emptySearches = document.getElementById('emptySearches');
        
        if (!searchesList) return;
        
        if (this.searches.length === 0) {
            searchesList.innerHTML = '';
            if (emptySearches) emptySearches.style.display = 'block';
            return;
        }
        
        if (emptySearches) emptySearches.style.display = 'none';
        
        const searchesHTML = this.searches.slice(0, 10).map(search => `
            <div class="search-item">
                <span class="search-text">${search.query}</span>
                <span class="search-time">${this.formatTimeAgo(search.timestamp)}</span>
            </div>
        `).join('');
        
        searchesList.innerHTML = searchesHTML;
    }
    
    renderRecommendations(recommendations) {
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        
        if (!recommendationsGrid) return;
        
        const recommendationsHTML = recommendations.map(dest => `
            <a href="destination.php?id=${dest.slug}" class="recommendation-item">
                <img src="${dest.image}" alt="${dest.name}" class="recommendation-image">
                <div class="recommendation-content">
                    <h4>${dest.name}</h4>
                    <p>${dest.country} • ${dest.category} • ⭐ ${dest.rating}</p>
                </div>
            </a>
        `).join('');
        
        recommendationsGrid.innerHTML = recommendationsHTML;
    }
    
    updateStats() {
        document.getElementById('bookmarksCount').textContent = this.bookmarks.length;
        document.getElementById('searchesCount').textContent = this.searches.length;
        document.getElementById('reviewsCount').textContent = this.reviews.length;
        document.getElementById('destinationsCount').textContent = this.allDestinations.length;
    }
    
    removeBookmark(destinationId) {
        localStorage.removeItem(`bookmark_${destinationId}`);
        
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.slug !== destinationId);
        
        this.renderBookmarks();
        this.updateStats();
        
        showMessage('Bookmark removed successfully!', 'success');
    }
    
    clearSearches() {
        if (confirm('Are you sure you want to clear all search history?')) {
            localStorage.removeItem('searchHistory');
            this.searches = [];
            this.renderSearches();
            this.updateStats();
            showMessage('Search history cleared!', 'success');
        }
    }
    
    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
            window.location.href = 'index.php';
        }
    }
    
    formatTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);
        
        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Dashboard();
}); 