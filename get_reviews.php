<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'connection.php';

// Validate query param
if (!isset($_GET['id']) || empty(trim($_GET['id']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing destination ID']);
    exit;
}

$slug = trim($_GET['id']);

$stmt = $conn->prepare("SELECT destination_id FROM destinations WHERE slug = ?");
$stmt->bind_param("s", $slug);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Destination not found']);
    exit;
}

$destination = $result->fetch_assoc();
$destination_id = (int)$destination['destination_id'];

$reviewStmt = $conn->prepare("
    SELECT reviewer_name, rating, comment, created_at 
    FROM reviews 
    WHERE destination_id = ? 
    ORDER BY created_at DESC
");
$reviewStmt->bind_param("i", $destination_id);
$reviewStmt->execute();
$reviewsResult = $reviewStmt->get_result();

$reviews = [];
while ($row = $reviewsResult->fetch_assoc()) {
    $reviews[] = [
        'reviewerName' => $row['reviewer_name'],
        'rating' => (int) $row['rating'],
        'comment' => $row['comment'],
        'date' => $row['created_at']
    ];
}

echo json_encode($reviews);
exit;
?>
