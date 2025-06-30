class DestinationSearch {
    constructor() {
        this.allDestinations = [];
        this.filteredDestinations = [];
        this.currentFilters = {
            search: '',
            country: '',
            category: '',
            rating: ''
        };

        this.init();
    }

    async init() {
        await this.fetchDestinations();
        this.bindEvents();
        this.filterDestinations();
    }

    async fetchDestinations() {
        try {
            const response = await fetch('get_all_destinations.php');
            if (!response.ok) throw new Error('Failed to fetch destinations');

            this.allDestinations = await response.json();
            this.filteredDestinations = [...this.allDestinations];
        } catch (err) {
            console.error(err);
            showMessage('Error loading destinations. Please try again later.', 'error');
        }
    }

    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.filterDestinations();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filterDestinations();
                }
            });
        }

        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterDestinations();
            });
        }

        const countryFilter = document.getElementById('countryFilter');
        if (countryFilter) {
            countryFilter.addEventListener('change', (e) => {
                this.currentFilters.country = e.target.value;
                this.filterDestinations();
            });
        }

        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.filterDestinations();
            });
        }

        const ratingFilter = document.getElementById('ratingFilter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', (e) => {
                this.currentFilters.rating = e.target.value;
                this.filterDestinations();
            });
        }

        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    }

    filterDestinations() {
        this.filteredDestinations = this.allDestinations.filter(destination => {
            const { search, country, category, rating } = this.currentFilters;

            if (search) {
                const s = search.toLowerCase();
                const matches = destination.name.toLowerCase().includes(s) ||
                                destination.country.toLowerCase().includes(s) ||
                                destination.description.toLowerCase().includes(s) ||
                                destination.category.toLowerCase().includes(s);
                if (!matches) return false;
            }

            if (country && destination.country !== country) return false;
            if (category && destination.category !== category) return false;
            if (rating && destination.rating < parseFloat(rating)) return false;

            return true;
        });

        this.renderDestinations();
        this.updateResultsCount();
    }

    clearAllFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('countryFilter').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('ratingFilter').value = '';

        this.currentFilters = {
            search: '',
            country: '',
            category: '',
            rating: ''
        };

        this.filteredDestinations = [...this.allDestinations];
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

        const html = this.filteredDestinations.map(destination => this.createDestinationCard(destination)).join('');
        destinationsList.innerHTML = html;

        this.addCardClickEvents();
    }

    createDestinationCard(destination) {
        const stars = '★'.repeat(Math.floor(destination.rating)) + '☆'.repeat(5 - Math.floor(destination.rating));

        return `
            <div class="destination-card" data-id="${destination.slug}">
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
                        <span class="rating-text">${destination.rating.toFixed(1)}</span>
                    </div>
                    <div class="card-actions">
                        <a href="destination.php?id=${destination.slug}" class="btn btn-primary">View Details</a>
                        <button class="btn btn-secondary bookmark-btn ${destination.isBookmarked ? 'active' : ''}" data-id="${destination.slug}">
                            <span class="bookmark-icon">${destination.isBookmarked ? '♥' : '♡'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addCardClickEvents() {
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showMessage('Login to bookmark destinations from search page.', 'info');
            });
        });

        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const destinationId = btn.dataset.id;

                if (!CURRENT_USER_ID) {
                    showMessage('Please log in to use bookmarks.', 'info');
                    return;
                }

                try {
                    const response = await fetch('favorites.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `destination_id=${destinationId}`
                    });

                    const result = await response.json();

                    if (result.action === 'added') {
                        btn.classList.add('active');
                        btn.querySelector('.bookmark-icon').textContent = '♥';
                    } else if (result.action === 'removed') {
                        btn.classList.remove('active');
                        btn.querySelector('.bookmark-icon').textContent = '♡';
                    } else {
                        showMessage(result.message || 'Something went wrong.', 'error');
                    }
                } catch (error) {
                    console.error('Bookmark error:', error);
                    showMessage('Failed to update bookmark.', 'error');
                }
            });
        });


        const cards = document.querySelectorAll('.destination-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('bookmark-btn')) {
                    const id = card.dataset.id;
                    window.location.href = `destination.php?id=${id}`;
                }
            });
        });
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const count = this.filteredDestinations.length;
            const total = this.allDestinations.length;

            if (count === total) {
                resultsCount.textContent = `Showing all ${total} destinations`;
            } else {
                resultsCount.textContent = `Showing ${count} of ${total} destinations`;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DestinationSearch();
});
