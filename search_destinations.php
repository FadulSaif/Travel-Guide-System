<?php
require_once 'connection.php';
header('Content-Type: application/json; charset=utf-8');

$search = trim($_GET['search'] ?? '');
$country = trim($_GET['country'] ?? '');
$category = trim($_GET['category'] ?? '');
$minRating = floatval($_GET['rating'] ?? 0);

$sql = "SELECT * FROM destinations WHERE 1=1";
$params = [];
$types = "";

if (!empty($search)) {
    $sql .= " AND (destination_name LIKE ? OR description LIKE ? OR full_description LIKE ?)";
    $searchParam = "%$search%";
    $params[] = $searchParam;
    $params[] = $searchParam;
    $params[] = $searchParam;
    $types .= "sss";
}

if (!empty($country)) {
    $sql .= " AND country = ?";
    $params[] = $country;
    $types .= "s";
}

if (!empty($category)) {
    $sql .= " AND category = ?";
    $params[] = $category;
    $types .= "s";
}

if ($minRating > 0) {
    $sql .= " AND average_rating >= ?";
    $params[] = $minRating;
    $types .= "d";
}

$stmt = $conn->prepare($sql);

if ($params) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$destinations = [];
while ($row = $result->fetch_assoc()) {
    $row['average_rating'] = (float) $row['average_rating'];
    $destinations[] = $row;
}

echo json_encode($destinations);
exit;
?>
