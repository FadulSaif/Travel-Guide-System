// Dashboard functionality

class Dashboard {
    constructor() {
        this.user = null;
        this.bookmarks = [];
        this.searches = [];
        this.reviews = [];
        
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
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
            return;
        }
        
        try {
            this.user = JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
            window.location.href = 'login.html';
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
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
        
        // Refresh button
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadDashboardData();
                showMessage('Dashboard refreshed!', 'success');
            });
        }
        
        // Clear searches button
        const clearSearchesBtn = document.getElementById('clearSearches');
        if (clearSearchesBtn) {
            clearSearchesBtn.addEventListener('click', () => {
                this.clearSearches();
            });
        }
    }
    
    loadDashboardData() {
        this.loadBookmarks();
        this.loadSearches();
        this.loadReviews();
        this.loadRecommendations();
        this.updateStats();
    }
    
    loadBookmarks() {
        // Get bookmarks from localStorage
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
        // Get search history from localStorage
        const searchHistory = localStorage.getItem('searchHistory');
        this.searches = searchHistory ? JSON.parse(searchHistory) : [];
        
        this.renderSearches();
    }
    
    loadReviews() {
        // Get reviews from localStorage
        const reviewsData = localStorage.getItem('userReviews');
        this.reviews = reviewsData ? JSON.parse(reviewsData) : [];
    }
    
    loadRecommendations() {
        const destinations = this.getDestinationsData();
        const recommendations = this.getRecommendations(destinations);
        this.renderRecommendations(recommendations);
    }
    
    getRecommendations(destinations) {
        // Simple recommendation algorithm based on user preferences
        const userPreferences = this.getUserPreferences();
        let recommendations = [...destinations];
        
        // Filter out already bookmarked destinations
        recommendations = recommendations.filter(dest => 
            !this.bookmarks.some(bookmark => bookmark.id === dest.id)
        );
        
        // Sort by rating and limit to 6 recommendations
        recommendations.sort((a, b) => b.rating - a.rating);
        return recommendations.slice(0, 6);
    }
    
    getUserPreferences() {
        // In a real app, this would be based on user behavior analysis
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
                    <a href="destination.html?id=${bookmark.id}" class="btn btn-primary">View</a>
                    <button class="btn btn-secondary remove-bookmark" data-id="${bookmark.id}">Remove</button>
                </div>
            </div>
        `).join('');
        
        bookmarksList.innerHTML = bookmarksHTML;
        
        // Add event listeners to remove bookmark buttons
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
            <a href="destination.html?id=${dest.id}" class="recommendation-item">
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
        document.getElementById('destinationsCount').textContent = this.getDestinationsData().length;
    }
    
    removeBookmark(destinationId) {
        // Remove from localStorage
        localStorage.removeItem(`bookmark_${destinationId}`);
        
        // Remove from bookmarks array
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== destinationId);
        
        // Re-render bookmarks
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
            window.location.href = 'index.html';
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
    
    getDestinationsData() {
        // This would normally come from an API, but for demo purposes we'll use static data
        return [
            {
                id: 'swiss-alps',
                name: 'Swiss Alps',
                country: 'Switzerland',
                category: 'Mountain',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                rating: 5.0
            },
            {
                id: 'santorini',
                name: 'Santorini',
                country: 'Greece',
                category: 'Beach',
                image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80',
                rating: 4.9
            },
            {
                id: 'banff',
                name: 'Banff National Park',
                country: 'Canada',
                category: 'Nature',
                image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
                rating: 4.8
            },
            {
                id: 'tokyo',
                name: 'Tokyo',
                country: 'Japan',
                category: 'City',
                image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
                rating: 4.7
            },
            {
                id: 'machu-picchu',
                name: 'Machu Picchu',
                country: 'Peru',
                category: 'Historical',
                image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80',
                rating: 4.9
            },
            {
                id: 'new-zealand',
                name: 'New Zealand',
                country: 'New Zealand',
                category: 'Adventure',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                rating: 4.8
            }
        ];
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Dashboard();
}); 