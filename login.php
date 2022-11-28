<?php
$servername = "finalead.ckjuvekv4lf4.us-east-2.rds.amazonaws.com";
$username = "finalead";
$password = "finalead123";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>