<?php
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbServer, $dbUser, $dbPass, $dbName);
    
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $firstName = $data['firstName'];
    $income = $data['income'];
    $household = $data['household'];
    $auto = $data['auto'];
    $other = $data['other'];
    
    if(mysqli_connect_errno()){
        echo mysqli_connect_error();
        exit();
    }else{
        $saveRequest = "UPDATE budget SET income='$income', household='$household', auto='$auto', other='$other' WHERE id='$id'";
        $saveResult = mysqli_query($mysqli, $saveRequest);
        if(!$saveResult){
            echo mysqli_error();
        }else{
            echo $firstName,', you have successfully saved your budget!';
        }
    }
?>