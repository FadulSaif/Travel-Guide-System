<?php
session_start();
require_once 'connection.php';

$user_id = $_SESSION['user_id'] ?? null;
$favorites = [];

if ($user_id) {
    $favStmt = $conn->prepare("SELECT destination_id FROM favorites WHERE user_id = ?");
    $favStmt->bind_param("i", $user_id);
    $favStmt->execute();
    $favResult = $favStmt->get_result();
    while ($favRow = $favResult->fetch_assoc()) {
        $favorites[] = $favRow['destination_id'];
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TravelGuide - Your Ultimate Travel Companion</title>
    <link rel="stylesheet" href="style.css" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
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
        <section class="hero" aria-label="Featured Destinations Carousel">
            <div class="carousel">
                <div class="swiper hero-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="hero-content">
                                <h2>Discover Amazing Destinations</h2>
                                <p>Explore the world's most beautiful places and create unforgettable memories</p>
                                <a href="search.php" class="btn btn-primary">Start Exploring</a>
                            </div>
                            <div class="hero-image">
                                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80" alt="Beautiful mountain landscape">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="hero-content">
                                <h2>Experience Local Culture</h2>
                                <p>Immerse yourself in diverse cultures and traditions around the globe</p>
                                <a href="search.php" class="btn btn-primary">Find Culture</a>
                            </div>
                            <div class="hero-image">
                                <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2079&q=80" alt="Cultural city street">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="hero-content">
                                <h2>Adventure Awaits</h2>
                                <p>From beaches to mountains, find your next adventure destination</p>
                                <a href="search.php" class="btn btn-primary">Find Adventure</a>
                            </div>
                            <div class="hero-image">
                                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Adventure mountain climbing">
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
                <noscript>
                    <div class="carousel-slide active">
                        <div class="hero-content">
                            <h2>Discover Amazing Destinations</h2>
                            <p>Explore the world's most beautiful places and create unforgettable memories</p>
                            <a href="search.php" class="btn btn-primary">Start Exploring</a>
                        </div>
                        <div class="hero-image">
                            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80" alt="Beautiful mountain landscape">
                        </div>
                    </div>
                </noscript>
            </div>
        </section>

        <section class="featured-destinations" aria-label="Featured Destinations">
            <div class="container">
                <div class="section-header">
                    <h2>Featured Destinations</h2>
                    <p>Discover our handpicked destinations that will inspire your next journey</p>
                </div>
                <div class="destinations-grid">
                    <?php
                    $query = "
                        SELECT d.*, 
                            IFNULL(AVG(r.rating), 0) AS avg_rating
                        FROM destinations d
                        LEFT JOIN reviews r ON d.destination_id = r.destination_id
                        GROUP BY d.destination_id
                        ORDER BY d.created_at DESC
                    ";
                    $result = $conn->query($query);
                    if ($result && $result->num_rows > 0):
                        while ($row = $result->fetch_assoc()):
                            $isFavorite = in_array($row['destination_id'], $favorites);
                    ?>
                            <div class="destination-card">
                                <div class="card-image">
                                    <img src="<?= htmlspecialchars($row['image_url']) ?>" alt="<?= htmlspecialchars($row['destination_name']) ?>">
                                    <button type="button" class="bookmark-btn<?= $isFavorite ? ' bookmarked' : '' ?>" data-id="<?= $row['destination_id'] ?>" title="Bookmark this destination">
                                        <svg class="heart-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="card-content">
                                    <span class="category-badge"><?= htmlspecialchars($row['category']) ?></span>
                                    <h3><?= htmlspecialchars($row['destination_name']) ?></h3>
                                    <p class="location"><?= htmlspecialchars($row['country']) ?></p>
                                    <p class="description"><?= htmlspecialchars($row['description']) ?></p>
                                    <div class="rating">
                                        <?php
                                            $stars = str_repeat('★', floor($row['avg_rating']));
                                            $stars .= str_repeat('☆', 5 - floor($row['avg_rating']));
                                        ?>
                                        <span class="stars"><?= $stars ?></span>
                                        <span class="rating-text"><?= number_format($row['avg_rating'], 1) ?>/5</span>
                                    </div>
                                    <a href="destination.php?id=<?= urlencode($row['slug']) ?>" class="btn btn-secondary">Learn More</a>
                                </div>
                            </div>
                        <?php endwhile;
                    else: ?>
                        <p>No destinations found.</p>
                    <?php endif; ?>
                </div>
            </div>
        </section>
    </main>

    <?php include 'footer.php'; ?>

    <div id="globalModal" class="global-modal" tabindex="-1" aria-modal="true" role="dialog" style="display:none;">
        <div class="global-modal-content">
            <button class="global-modal-close" aria-label="Close modal">&times;</button>
            <div class="global-modal-body"></div>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (window.Swiper) {
                new Swiper('.hero-swiper', {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    effect: 'fade',
                });
            }
        });
    </script>
</body>

</html>
