<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $leaderboardFile = '../js/leaderboardData.json';

    $currentData = json_decode(file_get_contents($leaderboardFile), true);
    $currentData[] = $data;

    file_put_contents($leaderboardFile, json_encode($currentData, JSON_PRETTY_PRINT));

    http_response_code(201);
    echo json_encode(['message' => 'Leaderboard data updated']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
