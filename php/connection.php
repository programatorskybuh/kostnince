<?php
    // Allow requests from both domains
    $allowedOrigins = array('http://kler.soskolin.eu', 'http://jelinek.soskolin.eu');

    // Check if the request origin is allowed
    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    $servername = "localhost";
    $username = "c361root";
    $password = "hesloheslo";
    $dbname = "c361maturita";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>