<?php
session_start();
require_once 'connection.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Login required']);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = [];

$sql = "SELECT d.destination_id AS id, d.destination_name AS name, d.slug, d.country, d.category, d.image_url AS image, 
               IFNULL(ROUND(AVG(r.rating), 2), 0) AS rating
        FROM destinations d
        LEFT JOIN reviews r ON d.destination_id = r.destination_id
        GROUP BY d.destination_id";
$result = $conn->query($sql);

$destinations = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $destinations[] = $row;
    }
}
$data['destinations'] = $destinations;

$bookmarked = [];
$stmt = $conn->prepare("SELECT destination_id FROM favorites WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $bookmarked[] = (int) $row['destination_id'];
}
$data['bookmarks'] = $bookmarked;

echo json_encode($data);
exit;
?>
