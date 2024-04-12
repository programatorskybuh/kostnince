<?php 
    include "connection.php";


    // Read the raw POST data from the input stream
    $postData = file_get_contents('php://input');

    // Parse the JSON data into an associative array
    $data = json_decode($postData, true);

    // Check if the data contains the required fields
    if (!isset($data['email'], $data['password'], $data['name'], $data['surname'])) {
        echo "Missing required fields";
        exit();
    }

    // Extract data from the associative array
    $email = $data['email'];
    $password = $data['password'];
    $name = $data['name'];
    $surname = $data['surname'];

    // Check if the email already exists in the database
    $checkEmailQuery = "SELECT COUNT(*) AS count FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmailQuery);
    $row = $result->fetch_assoc();
    if ($row['count'] > 0) {
        echo "Email already exists";
        exit();
    }

    // Hash the password using password_hash() function
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Execute SQL query to insert data into the database
    $sql = "INSERT INTO users (email, password, name, surname) VALUES ('$email', '$hashedPassword', '$name', '$surname')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close database connection
    $conn->close();
?>