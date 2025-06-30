<?php
session_start();
require_once 'connection.php';

if (!isset($_SESSION['user_id'])) {
    echo 'not_logged_in';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['destination_id'])) {
    http_response_code(400);
    echo 'invalid_request';
    exit;
}

$user_id = $_SESSION['user_id'];
$destination_id = (int) $_POST['destination_id'];

$stmt = $conn->prepare("SELECT * FROM favorites WHERE user_id = ? AND destination_id = ?");
$stmt->bind_param("ii", $user_id, $destination_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $delete = $conn->prepare("DELETE FROM favorites WHERE user_id = ? AND destination_id = ?");
    $delete->bind_param("ii", $user_id, $destination_id);
    $delete->execute();
    echo 'removed';
} else {
    $insert = $conn->prepare("INSERT INTO favorites (user_id, destination_id) VALUES (?, ?)");
    $insert->bind_param("ii", $user_id, $destination_id);
    $insert->execute();
    echo 'added';
}
?>
