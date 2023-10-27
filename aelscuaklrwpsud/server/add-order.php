<?php
    include "connect.php";
    include "validation.php";
    $conn = connect();

    $data = json_decode(file_get_contents("php://input"));

    $errors = "";

    $fname = $data->{"order"}->{"fname"};
    $lname = $data->{"order"}->{"lname"};
    $errors .= checkLength($fname, 1, 80);
    $errors .= checkLength($lname, 1, 80);
    $name = $fname . " " . $lname;

    $phone = $data->{"order"}->{"phoneNo"};
    $errors .= checkPhone($phone);

    $email = $data->{"order"}->{"email"};
    $errors .= checkEmail($email);

    $street = $data->{"order"}->{"street"};
    $city = $data->{"order"}->{"city"};
    $postcode = $data->{"order"}->{"postcode"};
    $errors .= checkPostCode($postcode);
    $address = $street . ", " . $city . ", " . $postcode;

    $paintIDs = $data->{"order"}->{"paintID"};

    foreach ($paintIDs as $paintID) {
        $errors .= checkPresent($paintID);
    }

    if (empty($errors)) {
        foreach ($paintIDs as $paintID) {
            $sql = "INSERT INTO `xqb21129` . `cs312artOrders` (`orderID`, `name`, `phone-no`, `email`, `address`, `paintingID`) 
        VALUES (NULL, '$name', '$phone', '$email', '$address', $paintID)";

            if ($conn->query($sql) === FALSE) {
                die ("error");
            }
        }
        echo "SUCCESS!";
        $conn->close();
    } else {
        die ($errors);
    }


?>
