<?php
    include "connect.php";

    $conn = connect();

    $sql = "SELECT * FROM `xqb21129` . `cs312painting`";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $paintings[] = [
                "paintingID" => $row["paintingID"],
                "name" => $row["name"],
                "completed" => $row["completed"],
                "width" => $row["width"],
                "height" => $row["height"],
                "pricetag" => number_format(round ($row["price"], 2), 2, '.'),
                "description" => $row["description"],
                "image" => base64_encode($row["image"])
                ];
            }
        echo json_encode($paintings);
        }
    else {
        echo json_encode([]);
    }
    $conn->close();
?>
