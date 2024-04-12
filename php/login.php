<?php
    include "connection.php";

    // Read the raw POST data from the input stream
    $postData = file_get_contents('php://input');

    // Parse the JSON data into an associative array
    $data = json_decode($postData, true);

    // Check if the data contains the required fields
    if (!isset($data['email'], $data['password'])) {
        echo json_encode(["error" => "Missing email or password"]);
        exit();
    }

    // Extract email and password from the associative array
    $email = $data['email'];
    $password = $data['password'];

    // Prepare and execute a SELECT query to check if the email exists
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Email exists in the database, retrieve user data
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        // Verify the password using password_verify() function
        if (password_verify($password, $hashedPassword)) {
            // Password matches, login successful
            echo json_encode(["success" => "Login successful", "ID_user" => $row['ID_user']]);
        } else {
            // Password does not match
            echo json_encode(["error" => "Invalid password"]);
        }
    } else {
        // Email does not exist in the database
        echo json_encode(["error" => "Email not found"]);
    }

    // Close database connection
    $conn->close();
?>
