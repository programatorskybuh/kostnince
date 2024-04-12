<?php
    include "connection.php"; // Include your database connection script

    // Read the raw POST data from the input stream
    $postData = file_get_contents('php://input');

    // Parse the JSON data into an associative array
    $data = json_decode($postData, true);

    // Check if the data contains the required field (ID_user)
    if (!isset($data['ID_user'])) {
        echo json_encode(["error" => "Missing ID_user"]);
        exit();
    }

    // Extract the ID_user from the associative array
    $ID_user = $data['ID_user'];

    // Initialize a variable to store user's name and surname
    $userInfo = "";
    $email = "";
    
    // Prepare and execute a SELECT query to find the user with the specified ID_user
    $userQuery = "SELECT name, surname, email FROM users WHERE ID_user = $ID_user";
    $userResult = $conn->query($userQuery);
    
    if ($userResult->num_rows > 0) {
        // User found, retrieve name, surname, and email
        $userRow = $userResult->fetch_assoc();
        $userInfo = $userRow['name'] . " " . $userRow['surname'];
        $email = $userRow['email'];
    } else {
        // User not found
        echo json_encode(["error" => "User not found"]);
        exit();
    }

    // Prepare and execute a SELECT query to find all reservations associated with the user
    $reservationsQuery = "SELECT * FROM reservations WHERE ID_user = $ID_user";
    $reservationsResult = $conn->query($reservationsQuery);

    // Initialize an array to store reservations
    $reservations = [];

    if ($reservationsResult->num_rows > 0) {
        // Reservations found, retrieve reservation details
        while ($row = $reservationsResult->fetch_assoc()) {
            $reservations[] = $row; // Add reservation to the array
        }
    }

    // Close database connection
    $conn->close();

    // Prepare the response data
    $responseData = [
        "name" => $userInfo,
        "email" => $email,
        "reservations" => $reservations
    ];

    // Encode the response into JSON format and echo it
    echo json_encode($responseData);
?>