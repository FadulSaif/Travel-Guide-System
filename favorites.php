<?php
session_start();
require_once 'connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Login required.']);
    exit;
}

$user_id = $_SESSION['user_id'];
$destination_id = isset($_POST['destination_id']) ? (int)$_POST['destination_id'] : 0;

if ($destination_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid destination.']);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM favorites WHERE user_id = ? AND destination_id = ?");
$stmt->bind_param("ii", $user_id, $destination_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmtDel = $conn->prepare("DELETE FROM favorites WHERE user_id = ? AND destination_id = ?");
    $stmtDel->bind_param("ii", $user_id, $destination_id);
    $stmtDel->execute();
    echo json_encode(['success' => true, 'action' => 'removed']);
    exit;
} else {
    $stmtAdd = $conn->prepare("INSERT INTO favorites (user_id, destination_id) VALUES (?, ?)");
    $stmtAdd->bind_param("ii", $user_id, $destination_id);
    if ($stmtAdd->execute()) {
        echo json_encode(['success' => true, 'action' => 'added']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Could not save favorite.']);
        exit;
    }
}
?>
