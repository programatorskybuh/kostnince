<?php
    include "connection.php"; // Include your database connection script

    // Read the raw POST data from the input stream
    $postData = file_get_contents('php://input');

    // Parse the JSON data into an associative array
    $data = json_decode($postData, true);

    // Check if the data contains the required fields
    if (!isset($data['date'], $data['time'], $data['email'])) {
        echo "Missing required fields";
        exit();
    }

    // Extract data from the associative array
    $date = $data['date'];
    $time = $data['time'];
    $email = $data['email'];

    // Check if there are already 3 reservations associated with the given email
    $reservationCountQuery = "SELECT COUNT(*) AS count FROM reservations WHERE email = '$email'";
    $result = $conn->query($reservationCountQuery);
    $row = $result->fetch_assoc();
    $reservationCount = $row['count'];

    if ($reservationCount >= 3) {
        echo "Maximum number of reservations reached for this email";
        exit();
    }

    // Prepare the placeholders for the optional ID_user field
    $idUserPlaceholder = isset($data['ID_user']) ? "'" . $data['ID_user'] . "'" : "NULL";

    // Execute SQL query to insert data into the reservations table
    $sql = "INSERT INTO reservations (ID_user, date, time, email) 
            VALUES ($idUserPlaceholder, '$date', '$time', '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "New reservation created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close database connection
    $conn->close();
?>
