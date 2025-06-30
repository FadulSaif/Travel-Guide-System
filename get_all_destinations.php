<?php
session_start();
require_once 'connection.php';
header('Content-Type: application/json');

$userId = $_SESSION['user_id'] ?? null;

$sql = "SELECT destination_id, destination_name, slug, category, country, description, image_url FROM destinations";
$result = $conn->query($sql);

$destinations = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $destinationId = (int)$row['destination_id'];

        $ratingStmt = $conn->prepare("SELECT AVG(rating) AS avg_rating FROM reviews WHERE destination_id = ?");
        $ratingStmt->bind_param("i", $destinationId);
        $ratingStmt->execute();
        $ratingResult = $ratingStmt->get_result();
        $ratingData = $ratingResult->fetch_assoc();
        $averageRating = $ratingData['avg_rating'] ?? 0;

        $isBookmarked = false;
        if ($userId) {
            $bookmarkStmt = $conn->prepare("SELECT 1 FROM favorites WHERE user_id = ? AND destination_id = ?");
            $bookmarkStmt->bind_param("ii", $userId, $destinationId);
            $bookmarkStmt->execute();
            $bookmarkResult = $bookmarkStmt->get_result();
            $isBookmarked = $bookmarkResult->num_rows > 0;
        }

        $destinations[] = [
            'id' => $destinationId,
            'name' => $row['destination_name'],
            'slug' => $row['slug'],
            'category' => $row['category'],
            'country' => $row['country'],
            'description' => $row['description'],
            'image' => $row['image_url'],
            'rating' => round((float)$averageRating, 2),
            'isBookmarked' => $isBookmarked
        ];
    }
}

echo json_encode($destinations);
exit;
?>