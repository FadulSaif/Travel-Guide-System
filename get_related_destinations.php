<?php
require_once 'connection.php';

$slug = $_GET['id'] ?? '';

if (!$slug) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT destination_id FROM destinations WHERE slug = ?");
$stmt->bind_param("s", $slug);
$stmt->execute();
$stmt->bind_result($destinationId);
if (!$stmt->fetch()) {
    echo json_encode([]);
    exit;
}
$stmt->close();

$query = "
    SELECT d.destination_id, d.slug, d.destination_name, d.image_url, d.country
    FROM related_destinations r
    JOIN destinations d ON r.related_id = d.destination_id
    WHERE r.destination_id = ?
";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $destinationId);
$stmt->execute();
$result = $stmt->get_result();

$related = [];
while ($row = $result->fetch_assoc()) {
    $related[] = $row;
}

echo json_encode($related);
?>