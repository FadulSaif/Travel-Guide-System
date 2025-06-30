<?php
session_start();
?>

<?php
$bookmarkedDestinations = [];

if (isset($_SESSION['user_id'])) {
    require_once 'connection.php';
    $userId = $_SESSION['user_id'];

    $stmt = $conn->prepare("SELECT destination_id FROM favorites WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $bookmarkedDestinations[] = (int) $row['destination_id'];
    }

    $stmt->close();
    $conn->close();
}
?>

<script>
    window.currentUser = <?php echo isset($_SESSION['username']) ? json_encode($_SESSION['username']) : 'null'; ?>;
    window.bookmarkedDestinations = <?php echo json_encode($bookmarkedDestinations); ?>;
</script>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Destination Details - TravelGuide</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/destination.css">
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
    <section class="destination-details" aria-label="Destination Details">
        <div class="container">
            <div id="loading" class="loading">Loading destination details...</div>
            
            <div id="destinationContent" style="display: none;">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                    <a href="index.php">Home</a> <span>&gt;</span>
                    <a href="search.php">Search</a> <span>&gt;</span>
                    <span id="destinationName">Destination Name</span>
                </nav>

                <div class="destination-hero">
                    <div class="hero-image">
                        <img id="destinationImage" src="" alt="Destination image">
                        <div class="hero-overlay">
                            <div class="hero-content">
                                <h1 id="destinationTitle">Destination Name</h1>
                                <p id="destinationLocation" class="location">Country</p>
                                <div class="hero-rating">
                                    <span id="destinationStars" class="stars"></span>
                                    <span id="destinationRating" class="rating-text"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="destination-content">
                    <div class="content-main">
                        <section class="content-section" aria-label="About This Destination">
                            <h2>About This Destination</h2>
                            <p id="destinationDescription">Loading description...</p>
                        </section>

                        <section class="content-section" aria-label="Key Information">
                            <h2>Key Information</h2>
                            <div class="info-grid">
                                <div class="info-item">
                                    <h4>Category</h4>
                                    <p id="destinationCategory">Loading...</p>
                                </div>
                                <div class="info-item">
                                    <h4>Country</h4>
                                    <p id="destinationCountry">Loading...</p>
                                </div>
                                <div class="info-item">
                                    <h4>Average Rating</h4>
                                    <p id="destinationAvgRating">Loading...</p>
                                </div>
                                <div class="info-item">
                                    <h4>Price Range</h4>
                                    <p id="destinationPrice">Loading...</p>
                                </div>
                            </div>
                        </section>

                        <section class="content-section" aria-label="Location Map">
                            <h2>Location</h2>
                            <div class="map-container">
                                <iframe 
                                    id="destinationMap"
                                    width="100%" 
                                    height="400" 
                                    frameborder="0" 
                                    style="border:0" 
                                    allowfullscreen
                                    aria-label="Map of destination">
                                </iframe>
                            </div>
                        </section>

                        <div class="content-section">
                            <h2>Reviews</h2>
                            <div id="reviewsList" class="reviews-list"></div>
                            
                            <div class="review-form-container modern-review-form">
                                <h3 class="review-form-title">Share Your Experience</h3>
                                <p class="review-form-subtitle">Leave a review and help other travelers!</p>
                                <form id="reviewForm" class="review-form" autocomplete="off">
                                    <div class="form-group">
                                        <label for="reviewerName" class="form-label">Your Name</label>
                                        <input type="text" id="reviewerName" name="reviewerName" class="form-input" required placeholder="Enter your name">
                                    </div>
                                    <div class="form-group">
                                        <label for="reviewRating" class="form-label">Your Rating</label>
                                        <div class="star-rating-input">
                                            <input type="radio" id="star5" name="reviewRating" value="5" required><label for="star5">★</label>
                                            <input type="radio" id="star4" name="reviewRating" value="4"><label for="star4">★</label>
                                            <input type="radio" id="star3" name="reviewRating" value="3"><label for="star3">★</label>
                                            <input type="radio" id="star2" name="reviewRating" value="2"><label for="star2">★</label>
                                            <input type="radio" id="star1" name="reviewRating" value="1"><label for="star1">★</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="reviewComment" class="form-label">Your Review</label>
                                        <textarea id="reviewComment" name="reviewComment" class="form-input" rows="4" placeholder="Share your experience..." required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary review-submit-btn">Submit Review</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <aside class="content-sidebar" aria-label="Sidebar">
                        <div class="sidebar-section">
                            <h3>Quick Actions</h3>
                            <div class="action-buttons">
                                <?php
                                    $destId = $_GET['id'] ?? 0;
                                    $isFavorite = in_array((int)$destId, $bookmarkedDestinations);
                                ?>
                                <button id="bookmarkBtn" class="btn btn-secondary btn-full<?= $isFavorite ? ' bookmarked' : '' ?>">
                                    <span class="bookmark-icon"><?= $isFavorite ? '♥' : '♡' ?></span>
                                    
                                    <span class="bookmark-text"><?= $isFavorite ? 'Remove Bookmark' : 'Add to Bookmarks' ?></span>
                                </button>

                                <a href="search.php" class="btn btn-primary btn-full">Find Similar</a>
                            </div>
                        </div>

                        <section class="sidebar-section" aria-label="Related Destinations">
                            <h3>Related Destinations</h3>
                            <div id="relatedDestinations" class="related-grid"></div>
                        </section>

                        <section class="sidebar-section" aria-label="Travel Tips">
                            <h3>Travel Tips</h3>
                            <div class="travel-tips">
                                <div class="tip">
                                    <h4>Best Time to Visit</h4>
                                    <p id="bestTimeTip">Loading...</p>
                                </div>
                                <div class="tip">
                                    <h4>Getting There</h4>
                                    <p id="gettingThereTip">Loading...</p>
                                </div>
                                <div class="tip">
                                    <h4>Currency</h4>
                                    <p id="currencyTip">Loading...</p>
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>

            <div id="errorState" class="error-state" style="display: none;">
                <h2>Destination Not Found</h2>
                <p>The destination you're looking for doesn't exist or has been removed.</p>
                <a href="search.php" class="btn btn-primary">Browse All Destinations</a>
            </div>
        </div>
    </section>
    </main>

    <?php include 'footer.php'; ?>

    <script>
        window.currentUser = <?php echo isset($_SESSION['username']) ? json_encode($_SESSION['username']) : 'null'; ?>;
    </script>
    <script src="script.js"></script>
    <script src="js/destination.js"></script>
</body>
</html>
