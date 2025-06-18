// Search functionality for TravelGuide

// Sample destinations data (in a real app, this would come from a database)
const destinations = [
    {
        id: 'swiss-alps',
        name: 'Swiss Alps',
        country: 'Switzerland',
        category: 'Mountain',
        description: 'Experience the breathtaking beauty of the Swiss Alps with world-class skiing, hiking trails, and stunning mountain vistas.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 5.0,
        price: '$1200'
    },
    {
        id: 'santorini',
        name: 'Santorini',
        country: 'Greece',
        category: 'Beach',
        description: 'Discover the iconic white-washed buildings and stunning sunsets of this beautiful Greek island paradise.',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80',
        rating: 4.9,
        price: '$800'
    },
    {
        id: 'banff',
        name: 'Banff National Park',
        country: 'Canada',
        category: 'Nature',
        description: 'Explore the pristine wilderness of Canada\'s oldest national park with crystal-clear lakes and majestic mountains.',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        rating: 4.8,
        price: '$900'
    },
    {
        id: 'tokyo',
        name: 'Tokyo',
        country: 'Japan',
        category: 'City',
        description: 'Experience the perfect blend of traditional culture and modern innovation in Japan\'s vibrant capital city.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
        rating: 4.7,
        price: '$1100'
    },
    {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        country: 'Peru',
        category: 'Historical',
        description: 'Journey to the ancient Incan citadel perched high in the Andes Mountains, a UNESCO World Heritage site.',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80',
        rating: 4.9,
        price: '$750'
    },
    {
        id: 'new-zealand',
        name: 'New Zealand',
        country: 'New Zealand',
        category: 'Adventure',
        description: 'Discover the stunning landscapes of Middle-earth with adventure activities and breathtaking natural beauty.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 4.8,
        price: '$1500'
    },
    {
        id: 'paris',
        name: 'Paris',
        country: 'France',
        category: 'Cultural',
        description: 'The City of Light offers iconic landmarks, world-class museums, and the finest cuisine in the world.',
        image: 'https://images.unsplash.com/photo-1502602898535-0b4c4c0c0c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 4.6,
        price: '$1000'
    },
    {
        id: 'barcelona',
        name: 'Barcelona',
        country: 'Spain',
        category: 'Cultural',
        description: 'Experience the unique architecture of Gaudi, vibrant street life, and Mediterranean charm.',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 4.5,
        price: '$850'
    },
    {
        id: 'bangkok',
        name: 'Bangkok',
        country: 'Thailand',
        category: 'City',
        description: 'A vibrant metropolis where ancient temples meet modern skyscrapers and street food delights.',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 4.4,
        price: '$600'
    },
    {
        id: 'rome',
        name: 'Rome',
        country: 'Italy',
        category: 'Historical',
        description: 'The Eternal City with ancient ruins, Renaissance art, and the heart of the Roman Catholic Church.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 4.7,
        price: '$950'
    }
];

// Search and filter functionality
class DestinationSearch {
    constructor() {
        this.filteredDestinations = [...destinations];
        this.currentFilters = {
            search: '',
            country: '',
            category: '',
            rating: ''
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderDestinations();
        this.updateResultsCount();
    }
    
    bindEvents() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.filterDestinations();
            });
        }
        
        // Search button
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterDestinations();
            });
        }
        
        // Country filter
        const countryFilter = document.getElementById('countryFilter');
        if (countryFilter) {
            countryFilter.addEventListener('change', (e) => {
                this.currentFilters.country = e.target.value;
                this.filterDestinations();
            });
        }
        
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.filterDestinations();
            });
        }
        
        // Rating filter
        const ratingFilter = document.getElementById('ratingFilter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', (e) => {
                this.currentFilters.rating = e.target.value;
                this.filterDestinations();
            });
        }
        
        // Clear filters
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
        
        // Enter key on search input
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filterDestinations();
                }
            });
        }
    }
    
    filterDestinations() {
        this.filteredDestinations = destinations.filter(destination => {
            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                const matchesSearch = destination.name.toLowerCase().includes(searchTerm) ||
                                    destination.country.toLowerCase().includes(searchTerm) ||
                                    destination.description.toLowerCase().includes(searchTerm) ||
                                    destination.category.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }
            
            // Country filter
            if (this.currentFilters.country && destination.country !== this.currentFilters.country) {
                return false;
            }
            
            // Category filter
            if (this.currentFilters.category && destination.category !== this.currentFilters.category) {
                return false;
            }
            
            // Rating filter
            if (this.currentFilters.rating && destination.rating < parseFloat(this.currentFilters.rating)) {
                return false;
            }
            
            return true;
        });
        
        this.renderDestinations();
        this.updateResultsCount();
    }
    
    clearAllFilters() {
        // Reset form inputs
        const searchInput = document.getElementById('searchInput');
        const countryFilter = document.getElementById('countryFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const ratingFilter = document.getElementById('ratingFilter');
        
        if (searchInput) searchInput.value = '';
        if (countryFilter) countryFilter.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (ratingFilter) ratingFilter.value = '';
        
        // Reset filters
        this.currentFilters = {
            search: '',
            country: '',
            category: '',
            rating: ''
        };
        
        // Reset results
        this.filteredDestinations = [...destinations];
        this.renderDestinations();
        this.updateResultsCount();
    }
    
    renderDestinations() {
        const destinationsList = document.getElementById('destinationsList');
        const noResults = document.getElementById('noResults');
        
        if (!destinationsList) return;
        
        if (this.filteredDestinations.length === 0) {
            destinationsList.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
            return;
        }
        
        if (noResults) noResults.style.display = 'none';
        
        const destinationsHTML = this.filteredDestinations.map(destination => this.createDestinationCard(destination)).join('');
        destinationsList.innerHTML = destinationsHTML;
        
        // Add click events to destination cards
        this.addCardClickEvents();
    }
    
    createDestinationCard(destination) {
        const stars = '★'.repeat(Math.floor(destination.rating)) + '☆'.repeat(5 - Math.floor(destination.rating));
        
        return `
            <div class="destination-card" data-id="${destination.id}">
                <div class="card-image">
                    <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3>${destination.name}</h3>
                    <p class="location">${destination.country}</p>
                    <span class="category">${destination.category}</span>
                    <p class="description">${destination.description}</p>
                    <div class="rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-text">${destination.rating}</span>
                    </div>
                    <div class="card-actions">
                        <a href="destination.html?id=${destination.id}" class="btn btn-primary">View Details</a>
                        <button class="btn btn-secondary bookmark-btn" data-id="${destination.id}">
                            <span class="bookmark-icon">♡</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    addCardClickEvents() {
        // Bookmark functionality
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleBookmark(btn);
            });
        });
        
        // Card click to view details
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('bookmark-btn')) {
                    const destinationId = card.dataset.id;
                    window.location.href = `destination.html?id=${destinationId}`;
                }
            });
        });
    }
    
    toggleBookmark(btn) {
        const destinationId = btn.dataset.id;
        const icon = btn.querySelector('.bookmark-icon');
        
        // Check if already bookmarked
        const bookmarked = localStorage.getItem(`bookmark_${destinationId}`);
        
        if (bookmarked) {
            // Remove bookmark
            localStorage.removeItem(`bookmark_${destinationId}`);
            icon.textContent = '♡';
            icon.style.color = '#64748b';
            showMessage('Removed from bookmarks', 'info');
        } else {
            // Add bookmark
            localStorage.setItem(`bookmark_${destinationId}`, 'true');
            icon.textContent = '♥';
            icon.style.color = '#dc2626';
            showMessage('Added to bookmarks', 'success');
        }
    }
    
    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const count = this.filteredDestinations.length;
            const total = destinations.length;
            
            if (count === total) {
                resultsCount.textContent = `Showing all ${total} destinations`;
            } else {
                resultsCount.textContent = `Showing ${count} of ${total} destinations`;
            }
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new DestinationSearch();
}); 