<?php
    include "connect.php";
    include "validation.php";

    $conn = connect();

    $errors = "";

    $name = $_POST['name'];
    $errors .= checkLength($name, 1, 250);

    $completed = $_POST['completed'];
    $errors .= checkPresent($completed);

    $width = $_POST['width'];
    $errors .= checkRange($width, 200, 2000);

    $height = $_POST['height'];
    $errors .= checkRange($height, 200, 2000);

    $pricetag = $_POST['pricetag'];
    $errors .= checkPrice($pricetag);

    $description = $_POST['description'];
    $errors .= checkLength($description, 1, 4000);

    $image = addslashes(file_get_contents($_FILES['image']['tmp_name']));
    $errors .= checkPresent($image);


    $sql = "INSERT INTO `xqb21129` . `cs312painting` (`paintingID`, `name`, `completed`, `width`, `height`, `price`, `description`, `image`)
    VALUES (NULL, '$name', '$completed', $width, $height, $pricetag, '$description', '$image')";

    if ($conn->query($sql) === FALSE) {
        die ("error");
    }
    echo "SUCCESS!";
    $conn->close();

?>
