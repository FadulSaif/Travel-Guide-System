<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - TravelGuide</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/dashboard.css">
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
    <section class="dashboard-section" aria-label="User Dashboard">
        <div class="container">
            <div class="welcome-section" aria-label="Welcome">
                <div class="welcome-content">
                    <h1>Welcome back, <span><?= htmlspecialchars($_SESSION['user_name']) ?></span>! 👋</h1>
                    <p>Ready to plan your next adventure? Here's what's new for you.</p>
                    <div class="welcome-actions">
                        <a href="search.php" class="btn btn-primary">Explore Destinations</a>
                        <button class="btn btn-secondary" id="refreshBtn">Refresh Data</button>
                    </div>
                </div>
            </div>
            <div class="dashboard-main-grid">
                <div class="dashboard-col">
                    <div class="dashboard-card stats-card" aria-label="Travel Stats">
                        <h2>Your Travel Stats</h2>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-number" id="bookmarksCount">0</div>
                                <div class="stat-label">Bookmarks</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="searchesCount">0</div>
                                <div class="stat-label">Searches</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="reviewsCount">0</div>
                                <div class="stat-label">Reviews</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="destinationsCount">0</div>
                                <div class="stat-label">Visited</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dashboard-col">
                    <div class="dashboard-card activity-card" aria-label="Recent Activity">
                        <h2>Recent Activity</h2>
                        <div class="activity-list" id="activityList">
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashboard-card bookmarks-card" aria-label="Bookmarked Destinations">
                <div class="card-header">
                    <h2>Your Bookmarks</h2>
                    <a href="search.php" class="view-all">View All</a>
                </div>
                <div class="bookmarks-list" id="bookmarksList"></div>
                <div class="empty-state" id="emptyBookmarks" style="display: none;">
                    <div class="empty-icon" aria-hidden="true">❤️</div>
                    <h3>No bookmarks yet</h3>
                    <p>Start exploring destinations and save your favorites!</p>
                    <a href="search.php" class="btn btn-primary">Explore Destinations</a>
                </div>
            </div>
            <div class="dashboard-main-grid">
                <div class="dashboard-col">
                    <div class="dashboard-card recommendations-card" aria-label="Recommended Destinations">
                        <h2>Recommended for You</h2>
                        <div class="recommendations-grid" id="recommendationsGrid"></div>
                    </div>
                </div>
                <div class="dashboard-col">
                    <div class="dashboard-card tips-card" aria-label="Travel Tips">
                        <h2>Travel Tips</h2>
                        <div class="tips-list" id="tipsList"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>

    <?php include 'footer.php'; ?>

    <script src="script.js"></script>
    <script src="js/main.js"></script>
    <script src="js/dashboard.js"></script>
</body>
</html> 