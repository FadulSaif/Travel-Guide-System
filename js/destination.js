// Destination Details functionality

// Sample destinations data (same as search.js)
const destinations = [
    {
        id: 'swiss-alps',
        name: 'Swiss Alps',
        country: 'Switzerland',
        category: 'Mountain',
        description: 'Experience the breathtaking beauty of the Swiss Alps with world-class skiing, hiking trails, and stunning mountain vistas. The Swiss Alps offer some of the most spectacular mountain scenery in the world, with peaks reaching over 4,000 meters. Whether you\'re an experienced mountaineer or a casual hiker, there are trails and activities for every skill level. The region is also famous for its charming alpine villages, crystal-clear lakes, and excellent skiing conditions during winter months.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 5.0,
        price: '$1200',
        coordinates: { lat: 46.8182, lng: 8.2275 },
        travelTips: {
            bestTime: 'June to September for hiking, December to March for skiing',
            gettingThere: 'Fly to Zurich or Geneva, then take train to mountain regions',
            currency: 'Swiss Franc (CHF)'
        }
    },
    {
        id: 'santorini',
        name: 'Santorini',
        country: 'Greece',
        category: 'Beach',
        description: 'Discover the iconic white-washed buildings and stunning sunsets of this beautiful Greek island paradise. Santorini is one of the most picturesque islands in the world, known for its dramatic volcanic landscape, stunning caldera views, and beautiful beaches. The island\'s unique architecture, with white buildings perched on cliffs overlooking the Aegean Sea, creates a magical atmosphere that attracts visitors from around the globe.',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80',
        rating: 4.9,
        price: '$800',
        coordinates: { lat: 36.3932, lng: 25.4615 },
        travelTips: {
            bestTime: 'May to October, with peak season in July and August',
            gettingThere: 'Fly to Santorini International Airport or take ferry from Athens',
            currency: 'Euro (EUR)'
        }
    },
    {
        id: 'banff',
        name: 'Banff National Park',
        country: 'Canada',
        category: 'Nature',
        description: 'Explore the pristine wilderness of Canada\'s oldest national park with crystal-clear lakes and majestic mountains. Banff National Park is a UNESCO World Heritage site that offers some of the most stunning natural landscapes in North America. From the iconic turquoise waters of Lake Louise to the dramatic peaks of the Canadian Rockies, every corner of this park offers breathtaking views and incredible wildlife viewing opportunities.',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        rating: 4.8,
        price: '$900',
        coordinates: { lat: 51.4968, lng: -115.9281 },
        travelTips: {
            bestTime: 'June to September for hiking, December to March for skiing',
            gettingThere: 'Fly to Calgary International Airport, then drive 1.5 hours to Banff',
            currency: 'Canadian Dollar (CAD)'
        }
    },
    {
        id: 'tokyo',
        name: 'Tokyo',
        country: 'Japan',
        category: 'City',
        description: 'Experience the perfect blend of traditional culture and modern innovation in Japan\'s vibrant capital city. Tokyo is a fascinating metropolis where ancient temples stand alongside futuristic skyscrapers, and traditional tea ceremonies coexist with cutting-edge technology. The city offers an incredible variety of experiences, from exploring historic neighborhoods to shopping in the world\'s largest electronics district.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
        rating: 4.7,
        price: '$1100',
        coordinates: { lat: 35.6762, lng: 139.6503 },
        travelTips: {
            bestTime: 'March to May (cherry blossom season) and September to November',
            gettingThere: 'Fly to Narita or Haneda International Airport',
            currency: 'Japanese Yen (JPY)'
        }
    },
    {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        country: 'Peru',
        category: 'Historical',
        description: 'Journey to the ancient Incan citadel perched high in the Andes Mountains, a UNESCO World Heritage site. Machu Picchu is one of the most impressive archaeological sites in the world, offering a glimpse into the sophisticated engineering and architectural skills of the Inca civilization. The site\'s dramatic mountain setting and mysterious history continue to captivate visitors from around the world.',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80',
        rating: 4.9,
        price: '$750',
        coordinates: { lat: -13.1631, lng: -72.5450 },
        travelTips: {
            bestTime: 'April to October (dry season)',
            gettingThere: 'Fly to Cusco, then take train or hike the Inca Trail',
            currency: 'Peruvian Sol (PEN)'
        }
    },
    {
        id: 'new-zealand',
        name: 'New Zealand',
        country: 'New Zealand',
        category: 'Adventure',
        description: 'Discover the stunning landscapes of Middle-earth with adventure activities and breathtaking natural beauty. New Zealand offers some of the most diverse and spectacular scenery in the world, from snow-capped mountains to pristine beaches, from geothermal wonders to ancient forests. The country is a paradise for adventure seekers, offering activities like bungee jumping, skydiving, hiking, and water sports.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        rating: 4.8,
        price: '$1500',
        coordinates: { lat: -40.9006, lng: 174.8860 },
        travelTips: {
            bestTime: 'December to February (summer) for outdoor activities',
            gettingThere: 'Fly to Auckland, Wellington, or Christchurch International Airport',
            currency: 'New Zealand Dollar (NZD)'
        }
    }
];

// Sample reviews data
let reviews = [
    {
        id: 1,
        destinationId: 'swiss-alps',
        reviewerName: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely breathtaking! The Swiss Alps exceeded all my expectations. The hiking trails were well-maintained and the views were incredible. Highly recommend visiting in summer for the best experience.',
        date: '2024-01-15'
    },
    {
        id: 2,
        destinationId: 'santorini',
        reviewerName: 'Michael Chen',
        rating: 5,
        comment: 'Santorini is pure magic! The sunsets are indescribable and the white architecture against the blue sea is stunning. The food was amazing too. A must-visit destination.',
        date: '2024-01-10'
    },
    {
        id: 3,
        destinationId: 'banff',
        reviewerName: 'Emily Rodriguez',
        rating: 4,
        comment: 'Banff National Park is a nature lover\'s paradise. The lakes are incredibly beautiful and the wildlife sightings were amazing. The only downside was the crowds during peak season.',
        date: '2024-01-08'
    }
];

class DestinationDetails {
    constructor() {
        this.currentDestination = null;
        this.init();
    }
    
    init() {
        this.loadDestination();
        this.bindEvents();
    }
    
    loadDestination() {
        const urlParams = new URLSearchParams(window.location.search);
        const destinationId = urlParams.get('id');
        
        if (!destinationId) {
            this.showError();
            return;
        }
        
        this.currentDestination = destinations.find(dest => dest.id === destinationId);
        
        if (!this.currentDestination) {
            this.showError();
            return;
        }
        
        this.renderDestination();
        this.loadReviews();
        this.loadRelatedDestinations();
        this.updateBookmarkStatus();
    }
    
    renderDestination() {
        const dest = this.currentDestination;
        
        // Update page title
        document.title = `${dest.name} - TravelGuide`;
        
        // Update breadcrumb
        document.getElementById('destinationName').textContent = dest.name;
        
        // Update hero section
        document.getElementById('destinationTitle').textContent = dest.name;
        document.getElementById('destinationLocation').textContent = dest.country;
        document.getElementById('destinationImage').src = dest.image;
        document.getElementById('destinationImage').alt = dest.name;
        
        // Update rating
        const stars = '★'.repeat(Math.floor(dest.rating)) + '☆'.repeat(5 - Math.floor(dest.rating));
        document.getElementById('destinationStars').textContent = stars;
        document.getElementById('destinationRating').textContent = dest.rating;
        
        // Update description
        document.getElementById('destinationDescription').textContent = dest.description;
        
        // Update key information
        document.getElementById('destinationCategory').textContent = dest.category;
        document.getElementById('destinationCountry').textContent = dest.country;
        document.getElementById('destinationAvgRating').textContent = `${dest.rating}/5.0`;
        document.getElementById('destinationPrice').textContent = dest.price;
        
        // Update map
        this.updateMap(dest.coordinates);
        
        // Update travel tips
        if (dest.travelTips) {
            document.getElementById('bestTimeTip').textContent = dest.travelTips.bestTime;
            document.getElementById('gettingThereTip').textContent = dest.travelTips.gettingThere;
            document.getElementById('currencyTip').textContent = dest.travelTips.currency;
        }
        
        // Show content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('destinationContent').style.display = 'block';
    }
    
    updateMap(coordinates) {
        // Removed Google Maps API usage
    }
    
    loadReviews() {
        const destinationReviews = reviews.filter(review => review.destinationId === this.currentDestination.id);
        const reviewsList = document.getElementById('reviewsList');
        
        if (destinationReviews.length === 0) {
            reviewsList.innerHTML = '<p>No reviews yet. Be the first to review this destination!</p>';
            return;
        }
        
        const reviewsHTML = destinationReviews.map(review => this.createReviewHTML(review)).join('');
        reviewsList.innerHTML = reviewsHTML;
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
    
    loadRelatedDestinations() {
        const relatedDestinations = destinations
            .filter(dest => dest.id !== this.currentDestination.id && dest.category === this.currentDestination.category)
            .slice(0, 3);
        
        const relatedContainer = document.getElementById('relatedDestinations');
        
        if (relatedDestinations.length === 0) {
            relatedContainer.innerHTML = '<p>No related destinations found.</p>';
            return;
        }
        
        const relatedHTML = relatedDestinations.map(dest => `
            <a href="destination.html?id=${dest.id}" class="related-destination">
                <img src="${dest.image}" alt="${dest.name}">
                <div class="related-destination-info">
                    <h4>${dest.name}</h4>
                    <p>${dest.country}</p>
                </div>
            </a>
        `).join('');
        
        relatedContainer.innerHTML = relatedHTML;
    }
    
    bindEvents() {
        // Bookmark button
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => {
                this.toggleBookmark();
            });
        }
        
        // Review form
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }
    }
    
    toggleBookmark() {
        const destinationId = this.currentDestination.id;
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const icon = bookmarkBtn.querySelector('.bookmark-icon');
        const text = bookmarkBtn.querySelector('.bookmark-text');
        
        const bookmarked = localStorage.getItem(`bookmark_${destinationId}`);
        
        if (bookmarked) {
            // Remove bookmark
            localStorage.removeItem(`bookmark_${destinationId}`);
            icon.textContent = '♡';
            icon.classList.remove('active');
            text.textContent = 'Add to Bookmarks';
            showMessage('Removed from bookmarks', 'info');
        } else {
            // Add bookmark
            localStorage.setItem(`bookmark_${destinationId}`, 'true');
            icon.textContent = '♥';
            icon.classList.add('active');
            text.textContent = 'Remove from Bookmarks';
            showMessage('Added to bookmarks', 'success');
        }
    }
    
    updateBookmarkStatus() {
        const destinationId = this.currentDestination.id;
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const icon = bookmarkBtn.querySelector('.bookmark-icon');
        const text = bookmarkBtn.querySelector('.bookmark-text');
        
        const bookmarked = localStorage.getItem(`bookmark_${destinationId}`);
        
        if (bookmarked) {
            icon.textContent = '♥';
            icon.classList.add('active');
            text.textContent = 'Remove from Bookmarks';
        }
    }
    
    submitReview() {
        const form = document.getElementById('reviewForm');
        const formData = new FormData(form);
        
        const review = {
            id: reviews.length + 1,
            destinationId: this.currentDestination.id,
            reviewerName: formData.get('reviewerName'),
            rating: parseInt(formData.get('reviewRating')),
            comment: formData.get('reviewComment'),
            date: new Date().toISOString().split('T')[0]
        };
        
        // Add review to array
        reviews.push(review);
        
        // Reload reviews
        this.loadReviews();
        
        // Reset form
        form.reset();
        
        // Show success message
        showMessage('Review submitted successfully!', 'success');
    }
    
    showError() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('errorState').style.display = 'block';
    }
}

// Initialize destination details when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new DestinationDetails();
}); 