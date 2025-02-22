<?php
// Database credentials
$host = "localhost"; // Host name (usually localhost for WAMP)
$username = "root"; // Default username for WAMP
$password = ""; // Default password for WAMP (leave empty if not set)
$database = "maid_recruiting"; // Your database name

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully!";
?>
