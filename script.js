// Navigation Active Link Highlighting

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Remove all active classes first
        link.classList.remove('active');
        // If the link href matches the current page, add 'active'
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// --- Login Form Validation & Modern Feedback ---
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = loginForm.querySelector('#email');
        const passwordInput = loginForm.querySelector('#password');
        const emailError = loginForm.querySelector('#emailError');
        const passwordError = loginForm.querySelector('#passwordError');
        const submitBtn = loginForm.querySelector('button[type="submit"]');

        // Tooltip for password
        passwordInput.addEventListener('focus', function () {
            showTooltip(passwordInput, 'Password must be at least 6 characters');
        });
        passwordInput.addEventListener('blur', function () {
            hideTooltip(passwordInput);
        });

        // Real-time validation
        emailInput.addEventListener('input', function () {
            validateEmail();
        });
        passwordInput.addEventListener('input', function () {
            validatePassword();
        });

        // Form submit
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            if (!validateEmail()) valid = false;
            if (!validatePassword()) valid = false;
            if (!valid) return;
            showLoading(submitBtn);
            setTimeout(() => {
                hideLoading(submitBtn);
                // Demo credentials
                const demoCredentials = {
                    'demo@travelguide.com': 'password123',
                    'user@example.com': 'password123',
                    'admin@travelguide.com': 'admin123'
                };
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                if (demoCredentials[email] && demoCredentials[email] === password) {
                    localStorage.setItem('user', JSON.stringify({ email }));
                    window.location.href = 'dashboard.html';
                } else {
                    passwordError.textContent = 'Invalid email or password. Please try again.';
                    passwordError.classList.add('show');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign In';
                }
            }, 1200);
        });

        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                emailError.textContent = 'Email is required';
                emailError.classList.add('show');
                return false;
            }
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
                return false;
            }
            emailError.classList.remove('show');
            return true;
        }
        function validatePassword() {
            const password = passwordInput.value;
            if (!password) {
                passwordError.textContent = 'Password is required';
                passwordError.classList.add('show');
                return false;
            }
            if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                passwordError.classList.add('show');
                return false;
            }
            passwordError.classList.remove('show');
            return true;
        }
        function showError(input, errorDiv, msg) {
            errorDiv.textContent = msg;
            errorDiv.style.display = 'block';
            input.classList.add('error');
            input.classList.remove('success');
            animateShake(input);
        }
        function showSuccess(input, errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
            input.classList.remove('error');
            input.classList.add('success');
        }
        function animateShake(input) {
            input.classList.remove('shake');
            void input.offsetWidth; // trigger reflow
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 400);
        }
        // Tooltip helpers
        function showTooltip(input, msg) {
            let tip = input.parentElement.querySelector('.input-tooltip');
            if (!tip) {
                tip = document.createElement('div');
                tip.className = 'input-tooltip';
                input.parentElement.appendChild(tip);
            }
            tip.textContent = msg;
            tip.style.display = 'block';
        }
        function hideTooltip(input) {
            let tip = input.parentElement.querySelector('.input-tooltip');
            if (tip) tip.style.display = 'none';
        }
        // Loading spinner
        function showLoading(btn) {
            btn.disabled = true;
            btn.dataset.original = btn.innerHTML;
            btn.innerHTML = '<span class="spinner"></span> Signing In...';
        }
        function hideLoading(btn) {
            btn.disabled = false;
            btn.innerHTML = btn.dataset.original || 'Sign In';
        }
    }
});

// --- Register Form Validation & Modern Feedback ---
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const usernameInput = registerForm.querySelector('#username');
        const emailInput = registerForm.querySelector('#email');
        const passwordInput = registerForm.querySelector('#password');
        const confirmPasswordInput = registerForm.querySelector('#confirmPassword');
        const termsInput = registerForm.querySelector('#agreeTerms');
        const usernameError = registerForm.querySelector('#usernameError');
        const emailError = registerForm.querySelector('#emailError');
        const passwordError = registerForm.querySelector('#passwordError');
        const confirmPasswordError = registerForm.querySelector('#confirmPasswordError');
        const termsError = registerForm.querySelector('#termsError');
        const submitBtn = registerForm.querySelector('button[type="submit"]');

        // Tooltips
        usernameInput.addEventListener('focus', function () {
            showTooltip(usernameInput, '3-20 chars, letters/numbers/underscores only');
        });
        usernameInput.addEventListener('blur', function () { hideTooltip(usernameInput); });
        emailInput.addEventListener('focus', function () {
            showTooltip(emailInput, 'Enter a valid email address');
        });
        emailInput.addEventListener('blur', function () { hideTooltip(emailInput); });
        passwordInput.addEventListener('focus', function () {
            showTooltip(passwordInput, '8+ chars, upper/lowercase, number');
        });
        passwordInput.addEventListener('blur', function () { hideTooltip(passwordInput); });
        confirmPasswordInput.addEventListener('focus', function () {
            showTooltip(confirmPasswordInput, 'Must match password');
        });
        confirmPasswordInput.addEventListener('blur', function () { hideTooltip(confirmPasswordInput); });
        termsInput.addEventListener('focus', function () {
            showTooltip(termsInput, 'You must agree to continue');
        });
        termsInput.addEventListener('blur', function () { hideTooltip(termsInput); });

        // Real-time validation
        usernameInput.addEventListener('input', function () { validateUsername(); });
        emailInput.addEventListener('input', function () { validateEmail(); });
        passwordInput.addEventListener('input', function () { validatePassword(); });
        confirmPasswordInput.addEventListener('input', function () { validateConfirmPassword(); });
        termsInput.addEventListener('change', function () { validateTerms(); });

        // Form submit
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            if (!validateUsername()) valid = false;
            if (!validateEmail()) valid = false;
            if (!validatePassword()) valid = false;
            if (!validateConfirmPassword()) valid = false;
            if (!validateTerms()) valid = false;
            if (!valid) return;
            showLoading(submitBtn, 'Creating...');
            setTimeout(() => {
                hideLoading(submitBtn, 'Create Account');
                // Simulate registration success
                localStorage.setItem('user', JSON.stringify({ email: emailInput.value.trim(), username: usernameInput.value.trim() }));
                window.location.href = 'dashboard.html';
            }, 1400);
        });

        function validateUsername() {
            const username = usernameInput.value.trim();
            if (!username) {
                usernameError.textContent = 'Username is required';
                usernameError.classList.add('show');
                return false;
            }
            if (username.length < 3) {
                usernameError.textContent = 'At least 3 characters';
                usernameError.classList.add('show');
                return false;
            }
            if (username.length > 20) {
                usernameError.textContent = 'Less than 20 characters';
                usernameError.classList.add('show');
                return false;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                usernameError.textContent = 'Only letters, numbers, underscores';
                usernameError.classList.add('show');
                return false;
            }
            usernameError.classList.remove('show');
            return true;
        }
        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                emailError.textContent = 'Email is required';
                emailError.classList.add('show');
                return false;
            }
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
                return false;
            }
            emailError.classList.remove('show');
            return true;
        }
        function validatePassword() {
            const password = passwordInput.value;
            if (!password) {
                passwordError.textContent = 'Password is required';
                passwordError.classList.add('show');
                return false;
            }
            if (password.length < 8) {
                passwordError.textContent = 'At least 8 characters';
                passwordError.classList.add('show');
                return false;
            }
            if (!/(?=.*[a-z])/.test(password)) {
                passwordError.textContent = 'At least one lowercase letter';
                passwordError.classList.add('show');
                return false;
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                passwordError.textContent = 'At least one uppercase letter';
                passwordError.classList.add('show');
                return false;
            }
            if (!/(?=.*\d)/.test(password)) {
                passwordError.textContent = 'At least one number';
                passwordError.classList.add('show');
                return false;
            }
            passwordError.classList.remove('show');
            return true;
        }
        function validateConfirmPassword() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            if (!confirmPassword) {
                confirmPasswordError.textContent = 'Please confirm your password';
                confirmPasswordError.classList.add('show');
                return false;
            }
            if (password !== confirmPassword) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.classList.add('show');
                return false;
            }
            confirmPasswordError.classList.remove('show');
            return true;
        }
        function validateTerms() {
            if (!termsInput.checked) {
                termsError.textContent = 'You must agree to continue';
                termsError.classList.add('show');
                return false;
            }
            termsError.classList.remove('show');
            return true;
        }
        function showError(input, errorDiv, msg) {
            errorDiv.textContent = msg;
            errorDiv.style.display = 'block';
            input.classList.add('error');
            input.classList.remove('success');
            animateShake(input);
        }
        function showSuccess(input, errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
            input.classList.remove('error');
            input.classList.add('success');
        }
        function animateShake(input) {
            input.classList.remove('shake');
            void input.offsetWidth;
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 400);
        }
        // Tooltip helpers
        function showTooltip(input, msg) {
            let tip = input.parentElement.querySelector('.input-tooltip');
            if (!tip) {
                tip = document.createElement('div');
                tip.className = 'input-tooltip';
                input.parentElement.appendChild(tip);
            }
            tip.textContent = msg;
            tip.style.display = 'block';
        }
        function hideTooltip(input) {
            let tip = input.parentElement.querySelector('.input-tooltip');
            if (tip) tip.style.display = 'none';
        }
        // Loading spinner
        function showLoading(btn, text) {
            btn.disabled = true;
            btn.dataset.original = btn.innerHTML;
            btn.innerHTML = `<span class="spinner"></span> ${text || 'Loading...'}`;
        }
        function hideLoading(btn, text) {
            btn.disabled = false;
            btn.innerHTML = btn.dataset.original || text || 'Submit';
        }
    }
});

// Add shake and spinner styles if not present
(function addModernFormStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
    .form-input.shake { animation: shake 0.4s; }
    @keyframes shake { 0%{transform:translateX(0);} 20%{transform:translateX(-6px);} 40%{transform:translateX(6px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(4px);} 100%{transform:translateX(0);} }
    .input-tooltip { position: absolute; left: 100%; top: 50%; transform: translateY(-50%); background: #fff; color: #5f2c82; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 12px; font-size: 0.95rem; box-shadow: 0 2px 8px rgba(95,44,130,0.08); margin-left: 10px; z-index: 10; white-space: nowrap; display: none; }
    .spinner { display: inline-block; width: 1.2em; height: 1.2em; border: 3px solid #e2e8f0; border-top: 3px solid #7c3aed; border-radius: 50%; animation: spin 0.7s linear infinite; vertical-align: middle; margin-right: 8px; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
})();

// --- Search Filtering Functionality ---
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const clearFilters = document.getElementById('clearFilters');
    const destinationsList = document.getElementById('destinationsList');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    if (!searchInput || !countryFilter || !categoryFilter || !ratingFilter || !destinationsList) return;

    // Placeholder/mock data for now
    let destinations = window._mockDestinations || [];
    if (!destinations.length) {
        destinations = Array.from(destinationsList.children).map(card => ({
            title: card.querySelector('h3')?.textContent || '',
            country: card.querySelector('.location')?.textContent || '',
            category: card.dataset.category || '',
            rating: parseFloat(card.querySelector('.rating-text')?.textContent) || 0,
            element: card
        }));
    }

    function filterDestinations() {
        const search = searchInput.value.trim().toLowerCase();
        const country = countryFilter.value;
        const category = categoryFilter.value;
        const minRating = parseFloat(ratingFilter.value) || 0;
        let shown = 0;
        destinations.forEach(dest => {
            let match = true;
            if (search && !dest.title.toLowerCase().includes(search)) match = false;
            if (country && dest.country !== country) match = false;
            if (category && dest.category !== category) match = false;
            if (minRating && dest.rating < minRating) match = false;
            if (match) {
                dest.element.style.display = '';
                shown++;
            } else {
                dest.element.style.display = 'none';
            }
        });
        resultsCount.textContent = shown === destinations.length ? 'Showing all destinations' : `Showing ${shown} destination${shown !== 1 ? 's' : ''}`;
        noResults.style.display = shown === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', filterDestinations);
    countryFilter.addEventListener('change', filterDestinations);
    categoryFilter.addEventListener('change', filterDestinations);
    ratingFilter.addEventListener('change', filterDestinations);
    clearFilters.addEventListener('click', function () {
        searchInput.value = '';
        countryFilter.value = '';
        categoryFilter.value = '';
        ratingFilter.value = '';
        filterDestinations();
    });

    filterDestinations(); // Initial 
});

// --- Universal Bookmarking System for All Destination Cards (Home Page & Others) ---
document.addEventListener('DOMContentLoaded', function () {
    // Utility: Modern SVG heart icon
    const heartSVG = (filled = false) => filled
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z"/></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z"/></svg>`;

    // Get bookmarks from localStorage
    function getBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarkedDestinations') || '[]');
    }
    function setBookmarks(ids) {
        localStorage.setItem('bookmarkedDestinations', JSON.stringify(ids));
    }
    function isBookmarked(id) {
        return getBookmarks().includes(id);
    }
    function toggleBookmark(id) {
        let bookmarks = getBookmarks();
        if (bookmarks.includes(id)) {
            bookmarks = bookmarks.filter(bid => bid !== id);
        } else {
            bookmarks.push(id);
        }
        setBookmarks(bookmarks);
    }

    // Extract destination ID from card (from data-id, link href, or title)
    function extractDestinationId(card) {
        // First try data-id attribute
        if (card.dataset.id) return card.dataset.id;
        
        // Then try to extract from "Learn More" link
        const learnMoreLink = card.querySelector('a[href*="destination.html?id="]');
        if (learnMoreLink) {
            const url = new URL(learnMoreLink.href, window.location.origin);
            const id = url.searchParams.get('id');
            if (id) return id;
        }
        
        // Finally, generate from title
        const title = card.querySelector('h3')?.textContent;
        if (title) {
            return title.toLowerCase().replace(/\s+/g, '-');
        }
        
        return '';
    }

    // Attach bookmark logic to all .bookmark-btn in .destination-card
    function setupUniversalBookmarking() {
        const cards = document.querySelectorAll('.destination-card');
        cards.forEach(card => {
            let btn = card.querySelector('.bookmark-btn');
            if (!btn) return;
            
            // Extract destination ID
            const id = extractDestinationId(card);
            if (!id) return;
            
            btn.dataset.id = id;
            updateBookmarkBtn(btn, id);
            
            // Remove any existing click handlers
            btn.replaceWith(btn.cloneNode(true));
            btn = card.querySelector('.bookmark-btn');
            
            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(id);
                updateBookmarkBtn(btn, id, true);
            };
        });
    }
    
    function updateBookmarkBtn(btn, id, animate = false) {
        const bookmarked = isBookmarked(id);
        btn.innerHTML = heartSVG(bookmarked);
        btn.classList.toggle('bookmarked', bookmarked);
        if (animate) {
            btn.classList.add('pop');
            setTimeout(() => btn.classList.remove('pop'), 400);
        }
    }

    // Initial setup for all destination cards on the page
    setupUniversalBookmarking();

    // If cards are dynamically loaded, you may want to call setupUniversalBookmarking() after rendering

    // Add modern styles for bookmark button (if not already present)
    (function addBookmarkStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
        .bookmark-btn { position: absolute; top: 18px; right: 18px; background: rgba(255,255,255,0.98); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(95,44,130,0.08); transition: background 0.2s, transform 0.2s; z-index: 2; }
        .bookmark-btn svg { display: block; transition: fill 0.2s, stroke 0.2s; }
        .bookmark-btn.bookmarked { background: linear-gradient(135deg, #fbb6ce 0%, #e11d48 100%); }
        .bookmark-btn.bookmarked svg { fill: #e11d48; stroke: #e11d48; }
        .bookmark-btn.pop { animation: pop 0.4s; }
        @keyframes pop { 0%{transform:scale(1);} 50%{transform:scale(1.25);} 100%{transform:scale(1);} }
        `;
        document.head.appendChild(style);
    })();
});

// --- Dynamic Destination Card Rendering from JSON ---
document.addEventListener('DOMContentLoaded', function () {
    const destinationsList = document.getElementById('destinationsList');
    if (!destinationsList) return;

    fetch('destinations.json')
        .then(res => res.json())
        .then(destinations => {
            window._mockDestinations = destinations.map(dest => ({
                ...dest,
                element: createDestinationCard(dest)
            }));
            destinationsList.innerHTML = '';
            window._mockDestinations.forEach(dest => destinationsList.appendChild(dest.element));
            // Re-run filter and bookmark setup
            if (typeof filterDestinations === 'function') filterDestinations();
            if (typeof addBookmarkButtons === 'function') addBookmarkButtons();
        });

    function createDestinationCard(dest) {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.dataset.id = dest.id;
        card.dataset.category = dest.category;
        card.innerHTML = `
            <div class="card-image">
                <img src="${dest.image}" alt="${dest.title}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${dest.title}</h3>
                <p class="location">${dest.country}</p>
                <span class="category">${dest.category}</span>
                <p class="description">${dest.description}</p>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(dest.rating)) + '☆'.repeat(5 - Math.floor(dest.rating))}</span>
                    <span class="rating-text">${dest.rating}</span>
                </div>
                <div class="card-actions">
                    <a href="destination.html?id=${dest.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
        return card;
    }
});

// --- Hamburger Menu for Mobile Navigation ---
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', function () {
        navList.classList.toggle('open');
        menuToggle.classList.toggle('active');
        const expanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when a nav link is clicked (for SPA feel)
    navList.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navList.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Keyboard accessibility
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        }
    });
});

// --- Global Modal Popup Utility ---
window.showModal = function(content, options = {}) {
    let modal = document.getElementById('globalModal');
    if (!modal) return;
    const body = modal.querySelector('.global-modal-body');
    body.innerHTML = '';
    if (typeof content === 'string') body.innerHTML = content;
    else if (content instanceof Node) body.appendChild(content);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    modal.focus();
    // Trap focus
    const focusable = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = 'none'; body.innerHTML = ''; }, 300);
        document.removeEventListener('keydown', escListener);
    }
    modal.querySelector('.global-modal-close').onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };
    function escListener(e) { if (e.key === 'Escape') closeModal(); }
    document.addEventListener('keydown', escListener);
};

// --- Global Loading Spinner Utility ---
window.showGlobalSpinner = function(parent = document.body) {
    let spinner = document.createElement('div');
    spinner.className = 'global-spinner';
    parent.appendChild(spinner);
    return spinner;
};
window.hideGlobalSpinner = function(spinner) {
    if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
};

// --- Modularize: Expose filterDestinations and addBookmarkButtons globally for dynamic use ---
window.filterDestinations = window.filterDestinations || function(){};
window.addBookmarkButtons = window.addBookmarkButtons || function(){}; 