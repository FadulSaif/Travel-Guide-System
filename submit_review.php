<?php
require_once 'connection.php';
session_start();

header('Content-Type: application/json');

if (
    !isset($_POST['reviewRating'], $_POST['reviewComment']) ||
    empty($_POST['reviewRating']) || empty($_POST['reviewComment'])
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$reviewerName = '';
if (isset($_SESSION['user']) && isset($_SESSION['user']['username'])) {
    $reviewerName = $_SESSION['user']['username'];
} elseif (isset($_POST['reviewerName']) && !empty($_POST['reviewerName'])) {
    $reviewerName = trim($_POST['reviewerName']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Reviewer name is required']);
    exit;
}

if (!isset($_SERVER['HTTP_REFERER'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing destination reference']);
    exit;
}

$referer = $_SERVER['HTTP_REFERER'];
parse_str(parse_url($referer, PHP_URL_QUERY), $queryParams);
$slug = $queryParams['id'] ?? null;

if (!$slug) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing destination ID']);
    exit;
}

$stmt = $conn->prepare("SELECT destination_id FROM destinations WHERE slug = ?");
$stmt->bind_param("s", $slug);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Destination not found']);
    exit;
}

$destination = $result->fetch_assoc();
$destinationId = $destination['destination_id'];

$rating = (int) $_POST['reviewRating'];
$comment = trim($_POST['reviewComment']);

$insertStmt = $conn->prepare("INSERT INTO reviews (destination_id, reviewer_name, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())");
$insertStmt->bind_param("isis", $destinationId, $reviewerName, $rating, $comment);

if ($insertStmt->execute()) {
    $avgStmt = $conn->prepare("SELECT AVG(rating) AS avg_rating FROM reviews WHERE destination_id = ?");
    $avgStmt->bind_param("i", $destinationId);
    $avgStmt->execute();
    $avgResult = $avgStmt->get_result();
    $avgRow = $avgResult->fetch_assoc();
    $averageRating = round((float) ($avgRow['avg_rating'] ?? 0), 2);

    echo json_encode([
        'success' => true,
        'average_rating' => $averageRating
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save review']);
}
?>
