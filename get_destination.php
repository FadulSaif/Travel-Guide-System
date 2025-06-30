<?php
require_once 'connection.php';

header('Content-Type: application/json; charset=utf-8');

if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing destination ID']);
    exit;
}

$slug = $_GET['id'];

$stmt = $conn->prepare("
    SELECT d.*, t.best_time_to_visit, t.getting_there, t.currency
    FROM destinations d
    LEFT JOIN travel_tips t ON d.destination_id = t.destination_id
    WHERE d.slug = ?
");
$stmt->bind_param("s", $slug);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Destination not found']);
    exit;
}

$destination = $result->fetch_assoc();

$ratingStmt = $conn->prepare("SELECT AVG(rating) AS avg_rating FROM reviews WHERE destination_id = ?");
$ratingStmt->bind_param("i", $destination['destination_id']);
$ratingStmt->execute();
$ratingResult = $ratingStmt->get_result();
$ratingData = $ratingResult->fetch_assoc();

$averageRating = $ratingData['avg_rating'] ?? 0;
$destination['average_rating'] = round((float) $averageRating, 2);

echo json_encode($destination);
exit;
?>
