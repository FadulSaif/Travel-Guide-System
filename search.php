<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Destinations - TravelGuide</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/search.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header" role="banner">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <h1 id="siteTitle" class="site-title-gradient">TravelGuide</h1>
                </div>
                <?php include 'navbar.php'; ?>
                <div class="mobile-menu-toggle" aria-label="Open navigation menu" aria-expanded="false" tabindex="0" role="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>

    <main>
    <section class="search-section" aria-label="Search Destinations">
        <div class="container">
            <div class="search-header">
                <h1>Find Your Perfect Destination</h1>
                <p>Search through thousands of destinations and find your next adventure</p>
            </div>
            <div class="search-container">
                <div class="search-filters" aria-label="Filters" role="region">
                    <div class="search-bar">
                        <form class="search-bar" id="searchForm" style="flex-direction: column; align-items: stretch; gap: 0.7rem;">
                            <input type="text" class="form-input" id="searchInput" placeholder="Search destinations..." aria-label="Search destinations">
                            <button type="submit" class="btn btn-primary" id="searchBtn">Search</button>
                        </form>
                    </div>
                    <div class="filters">
                        <div class="filter-group">
                            <label for="countryFilter" class="form-label">Country</label>
                            <select id="countryFilter" class="form-input" aria-label="Country">
                                <option value="">All Countries</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Greece">Greece</option>
                                <option value="Canada">Canada</option>
                                <option value="Japan">Japan</option>
                                <option value="Peru">Peru</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Italy">Italy</option>
                                <option value="France">France</option>
                                <option value="Spain">Spain</option>
                                <option value="Thailand">Thailand</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label for="categoryFilter" class="form-label">Category</label>
                            <select id="categoryFilter" class="form-input" aria-label="Category">
                                <option value="">All Categories</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Beach">Beach</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Mountain">Mountain</option>
                                <option value="City">City</option>
                                <option value="Historical">Historical</option>
                                <option value="Nature">Nature</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label for="ratingFilter" class="form-label">Minimum Rating</label>
                            <select id="ratingFilter" class="form-input" aria-label="Minimum Rating">
                                <option value="">Any Rating</option>
                                <option value="4.5">4.5+ Stars</option>
                                <option value="4.0">4.0+ Stars</option>
                                <option value="3.5">3.5+ Stars</option>
                                <option value="3.0">3.0+ Stars</option>
                            </select>
                        </div>
                        <button type="button" id="clearFilters" class="btn btn-secondary" aria-label="Clear Filters">Clear Filters</button>
                    </div>
                </div>
                <div class="search-results" aria-label="Search Results" role="region">
                    <div class="results-header">
                        <h2>Search Results</h2>
                        <p id="resultsCount">Showing all destinations</p>
                    </div>
                    <div id="destinationsList" class="destinations-grid">
                    </div>
                    <div id="noResults" class="no-results" style="display: none;">
                        <h3>No destinations found</h3>
                        <p>Try adjusting your search criteria or filters</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>

    <?php include 'footer.php'; ?>

    <script>
        const CURRENT_USER_ID = <?= isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : 'null' ?>;
    </script>
    <script src="js/search.js"></script>
    <script src="script.js"></script>
</body>
</html> 