<?php
    include "connect.php";

    $conn = connect();

    $data = json_decode(file_get_contents("php://input"));
    $password = $data->{"verification"}->{"adminPass"};

    if ($password === "WeKnowTheGame23") {
        echo json_encode(true);
    }
    else {
        echo json_encode(false);
    }
    $conn->close();
?>
