<?php

    // Allow requests from both domains
    $allowedOrigins = array('http://kler.soskolin.eu', 'http://jelinek.soskolin.eu');

    // Check if the request origin is allowed
    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require './PHPMailer.php';
    require './SMTP.php';
    require './Exception.php';

    // Read the raw POST data from the input stream
    $postData = file_get_contents('php://input');

    // Parse the JSON data into an associative array
    $data = json_decode($postData, true);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Passing true enables exceptions

    try {
        // SMTP configuration for Gmail
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'kostnice.neodpovidejte@gmail.com'; // Your Gmail username
        $mail->Password = 'lslq ekrs sxrc onbn'; // Your Gmail password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        // Sender and recipient
        $mail->setFrom('kostnice.neodpovidejte@gmail.com', 'Rezervační systém kostnice'); // Sender's email and name
        $mail->addAddress($data['email'], 'Recipient Name'); // Recipient's email and name

        // Email subject
        $mail->Subject = 'Registrace';
        $mail->isHTML(true); // Set email format to HTML
        $mail->CharSet = 'UTF-8'; // Set the charset to UTF-8

        // HTML body of the email
        $mail->Body = "
            <!DOCTYPE html>
            <html lang='cs'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Your Title</title>
                <style>
                    /* Add your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                        line-height: 1.6;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <h1>Rezervační systém Kostnice</h1>
                    <p>Právě jste si u nás vytvořili účet, děkujeme.</p>
                    <p>V případě technických, či jiných problémů neprodleně kontaktujte naší telefonickou podporu.</p>
                    <p>+420 777 288 492</p>
                </div>
            </body>
            </html>
        ";

        // Send the email
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>
