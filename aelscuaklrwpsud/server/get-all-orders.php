<?php
    include "connect.php";

    $conn = connect();

    $sql = "SELECT * FROM `xqb21129` . `cs312artOrders`";

    $result = $conn->query($sql);

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
