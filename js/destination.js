class DestinationDetails {
    constructor() {
        this.currentDestination = null;
        this.currentUser = window.currentUser || null;
        this.bookmarkedDestinations = window.bookmarkedDestinations || [];
        this.init();
    }

    init() {
        this.loadDestination();
        this.bindEvents();
    }

    async loadDestination() {
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = urlParams.get('id');

    if (!destinationId) {
        this.showError();
        return;
    }

    try {
        const response = await fetch(`get_destination.php?id=${encodeURIComponent(destinationId)}`);
        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        if (!data || data.error) {
            this.showError();
            return;
        }

        this.currentDestination = data;
        this.currentDestination.slug = destinationId;

        this.renderDestination();
        this.loadReviews(destinationId);

        this.loadRelatedDestinations(destinationId);

        if (this.currentDestination.destination_id) {
            this.updateBookmarkUI(this.currentDestination.destination_id);
        }
        } catch (err) {
            console.error(err);
            this.showError();
        }
    }

    async loadRelatedDestinations(destinationId) {
        try {
            const response = await fetch(`get_related_destinations.php?id=${encodeURIComponent(this.currentDestination.slug)}`);
            const related = await response.json();

            const container = document.getElementById('relatedDestinations');
            if (!related || related.length === 0) {
                container.innerHTML = '<p>No related destinations found.</p>';
                return;
            }

            container.innerHTML = related.map(dest => `
                <div class="related-card">
                    <a href="destination.php?id=${dest.slug}">
                        <div class="related-image">
                            <img src="${dest.image_url}" alt="${dest.destination_name}">
                        </div>
                        <div class="related-content">
                            <h4>${dest.destination_name}</h4>
                            <div class="related-location">${dest.country}</div>
                        </div>
                    </a>
                </div>
            `).join('');
        } catch (err) {
            console.error('Failed to load related destinations', err);
        }
    }

    renderDestination() {
        const dest = this.currentDestination;

        document.title = `${dest.destination_name} - TravelGuide`;
        document.getElementById('destinationName').textContent = dest.destination_name;
        document.getElementById('destinationTitle').textContent = dest.destination_name;
        document.getElementById('destinationLocation').textContent = dest.country;
        document.getElementById('destinationImage').src = dest.image_url;
        document.getElementById('destinationImage').alt = dest.destination_name;

        const stars = '★'.repeat(Math.floor(dest.average_rating)) + '☆'.repeat(5 - Math.floor(dest.average_rating));
        document.getElementById('destinationStars').textContent = stars;
        document.getElementById('destinationRating').textContent = dest.average_rating.toFixed(1);

        document.getElementById('destinationDescription').textContent = dest.full_description || dest.description || '';
        document.getElementById('destinationCategory').textContent = dest.category;
        document.getElementById('destinationCountry').textContent = dest.country;
        document.getElementById('destinationAvgRating').textContent = `${dest.average_rating.toFixed(1)}/5.0`;
        document.getElementById('destinationPrice').textContent = dest.price_range;

        const mapFrame = document.getElementById('destinationMap');
        if (mapFrame && dest.map_embed_url) {
            mapFrame.src = dest.map_embed_url;
        }

        document.getElementById('bestTimeTip').textContent = dest.best_time_to_visit || 'No information';
        document.getElementById('gettingThereTip').textContent = dest.getting_there || 'No information';
        document.getElementById('currencyTip').textContent = dest.currency || 'No information';

        const reviewerInput = document.getElementById('reviewerName');
        if (this.currentUser && reviewerInput) {
            reviewerInput.value = this.currentUser;
            reviewerInput.readOnly = true;
            const reviewerGroup = reviewerInput.closest('.form-group');
            if (reviewerGroup) reviewerGroup.style.display = 'none';
        }

        document.getElementById('loading').style.display = 'none';
        document.getElementById('destinationContent').style.display = 'block';
    }

    async loadReviews(destinationSlug) {
        try {
            const response = await fetch(`get_reviews.php?id=${encodeURIComponent(destinationSlug)}`);
            if (!response.ok) throw new Error('Review fetch failed');

            const reviews = await response.json();
            const reviewsList = document.getElementById('reviewsList');

            if (!reviews || reviews.length === 0) {
                reviewsList.innerHTML = '<p>No reviews yet. Be the first to review this destination!</p>';
                return;
            }

            let totalRating = 0;
            reviews.forEach(r => totalRating += r.rating);
            const avgRating = (totalRating / reviews.length).toFixed(1);

            document.getElementById('destinationAvgRating').textContent = `${avgRating}/5.0`;
            document.getElementById('destinationStars').textContent = '★'.repeat(Math.floor(avgRating)) + '☆'.repeat(5 - Math.floor(avgRating));
            document.getElementById('destinationRating').textContent = avgRating;

            const reviewsHTML = reviews.map(review => this.createReviewHTML(review)).join('');
            reviewsList.innerHTML = reviewsHTML;
        } catch (err) {
            console.error(err);
            document.getElementById('reviewsList').innerHTML = '<p>Unable to load reviews.</p>';
        }
    }

    createReviewHTML(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const date = new Date(review.date).toLocaleDateString();

        return `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${review.reviewerName}</span>
                    <span class="review-date">${date}</span>
                </div>
                <div class="review-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">${review.rating}/5</span>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `;
    }

    bindEvents() {
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }

        const bookmarkBtn = document.getElementById('bookmarkBtn');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => {
                const id = this.currentDestination?.destination_id;
                if (!id) return;
                this.toggleBookmark(id);
            });
        }
    }

    async toggleBookmark(destinationId) {
        try {
            const response = await fetch('toggle_favorite.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'destination_id=' + encodeURIComponent(destinationId)
            });
            const result = await response.text();

            if (result === 'added') {
                if (!this.bookmarkedDestinations.includes(destinationId)) {
                    this.bookmarkedDestinations.push(destinationId);
                }
            } else if (result === 'removed') {
                this.bookmarkedDestinations = this.bookmarkedDestinations.filter(id => Number(id) !== Number(destinationId));
            } else if (result === 'not_logged_in') {
                alert('Please log in to bookmark destinations.');
                return;
            } else {
                alert('Error updating bookmark.');
                return;
            }

            this.updateBookmarkUI(destinationId);
        } catch (err) {
            console.error(err);
            alert('Connection error.');
        }
    }

    updateBookmarkUI(destinationId) {
        const btn = document.getElementById('bookmarkBtn');
        if (!btn) return;
        const icon = btn.querySelector('.bookmark-icon');
        const label = btn.querySelector('.bookmark-text');
        const isBookmarked = this.bookmarkedDestinations.includes(Number(destinationId));

        btn.classList.toggle('bookmarked', isBookmarked);
        icon.textContent = isBookmarked ? '♥' : '♡';
        label.textContent = isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks';
    }

    async submitReview() {
        const form = document.getElementById('reviewForm');
        const formData = new FormData(form);

        try {
            const response = await fetch('submit_review.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                form.reset();
                this.loadReviews(this.currentDestination.slug);
                showMessage('Review submitted successfully!', 'success');
            } else {
                showMessage(result.message || 'Failed to submit review', 'error');
            }
        } catch (err) {
            console.error(err);
            showMessage('Network error. Please try again.', 'error');
        }
    }

    showError() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('errorState').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DestinationDetails();
});
