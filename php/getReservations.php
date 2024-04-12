<?php
    include "connection.php"; // Include your database connection script

    // Execute SQL query to fetch data from the reservations table
    $sql = "SELECT ID_reservation, date, time FROM reservations";

    $result = $conn->query($sql);

    $reservations = array();

    if ($result->num_rows > 0) {
        // Fetch rows and store them in the $reservations array
        while($row = $result->fetch_assoc()) {
            $reservations[] = $row;
        }
    } else {
        echo "No reservations found";
        exit();
    }

    // Encode the $reservations array as JSON and send it to the frontend
    echo json_encode($reservations);

    // Close database connection
    $conn->close();
?>