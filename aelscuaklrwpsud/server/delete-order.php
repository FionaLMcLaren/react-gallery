<?php
    include "connect.php";

    $conn = connect();

    $orderData = json_decode(file_get_contents("php://input"));
    $orderID = $orderData->{"orderID"};

    $deleteQuery = "DELETE FROM `xqb21129` . `cs312artOrders` WHERE `orderID` = $orderID";

    $conn->query($deleteQuery);

    $newTableQuery = "SELECT * FROM `xqb21129` . `cs312artOrders`";

    $result = $conn->query($newTableQuery);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $orders[] = [
                    "orderID" => $row["orderID"],
                    "name" => $row["name"],
                    "phoneNo" => $row["phone-no"],
                    "email" => $row["email"],
                    "address" => $row["address"],
                    "paintingID" => $row["paintingID"]
                ];
            }
            echo json_encode($orders);
    }
        else {
            echo json_encode([]);
        }
        $conn->close();

?>
