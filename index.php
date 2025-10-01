<?php

include 'config.php';

// REGISTER PROCESSING
if (isset($_POST['register'])) {
    $firstname = trim($connection->real_escape_string($_POST['firstname']));
    $lastname = trim($connection->real_escape_string($_POST['lastname']));
    $email = trim($connection->real_escape_string($_POST['email']));
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $tin = trim($connection->real_escape_string($_POST['tin']));
    $department = trim($connection->real_escape_string($_POST['department']));

    // CHECKS IF ACCOUNT ALREADY EXISTS
    $check_sql = "SELECT * FROM user_info WHERE username = '$email' OR  = '$tin'";
    $result = $connection->query($check_sql);

    if ($result->num_rows > 0) {
        echo "Account Already Exists";
    } else {
        $sql = "INSERT INTO user_info (first_name, last_name, tin_no, department, username, password_hash) 
                    VALUES ('$firstname', '$lastname', '$tin', '$department', '$email', '$password')";

        if ($connection->query($sql) === TRUE) {
            //echo "Registration successful!<br>";
            //echo "Welcome, $firstname $lastname!<br>";
        } else {
            echo "Error: " . $connection->error;
        }
        include 'index.html';
    }
} else {
    include 'index.html';
}
?>