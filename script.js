document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

(function () {
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
            dest.element.style.display = match ? '' : 'none';
            if (match) shown++;
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

    filterDestinations();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', function () {
        navList.classList.toggle('open');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
    });

    navList.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navList.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    menuToggle.setAttribute('tabindex', '0');
    menuToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        }
    });
});

window.showModal = function (content, options = {}) {
    let modal = document.getElementById('globalModal');
    if (!modal) return;
    const body = modal.querySelector('.global-modal-body');
    body.innerHTML = '';
    if (typeof content === 'string') body.innerHTML = content;
    else if (content instanceof Node) body.appendChild(content);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    modal.focus();
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

window.showGlobalSpinner = function (parent = document.body) {
    const spinner = document.createElement('div');
    spinner.className = 'global-spinner';
    parent.appendChild(spinner);
    return spinner;
};
window.hideGlobalSpinner = function (spinner) {
    if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
};

document.addEventListener('DOMContentLoaded', function () {
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function () {
            const destinationId = this.dataset.id;
            console.log("Bookmark clicked for ID:", destinationId); // ✅ Debug log
            if (!destinationId) return;

            fetch('toggle_favorite.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'destination_id=' + encodeURIComponent(destinationId)
            })
            .then(response => response.text())
            .then(result => {
                if (result === 'added') {
                    this.classList.add('bookmarked');
                } else if (result === 'removed') {
                    this.classList.remove('bookmarked');
                } else if (result === 'not_logged_in') {
                    alert('Please log in to bookmark destinations.');
                } else {
                    alert('Error updating bookmark.');
                }
            })
            .catch(() => {
                alert('Error connecting to server.');
            });
        });
    });
});
