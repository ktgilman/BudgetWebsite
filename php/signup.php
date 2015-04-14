<?php
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbServer, $dbUser, $dbPass, $dbName);
    
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $userName = $_POST['user_name'];
    $passWord = $_POST['pass_word'];
    $idFirstPart = substr($userName, 0,4);
    $idSecondPart = strval(rand("1E3", "9E3"));
    $authId = $idFirstPart.$idSecondPart;
    $authPass = rand("1e6","9e6");
    
    if(mysqli_connect_errno()){
        echo '100';
    }else{
        $checkUsernameQuery = "SELECT username FROM user WHERE username='$userName'";
        $checkUsernameResult = mysqli_query($mysqli, $checkUsernameQuery);
        $checkUsernameArray = mysqli_fetch_array($checkUsernameResult, MYSQLI_ASSOC);
        if($checkUsernameArray != NULL){
            echo '300';
        }else{
            $insertQuery = "INSERT INTO user (id, username, password, authId, authPass, firstName, lastName) VALUES (NULL,'$userName','$passWord','$authId','$authPass','$firstName','$lastName')";
            $result = mysqli_query($mysqli, $insertQuery);
            
            $getIdQuery = "SELECT id FROM user WHERE authId='$authId'";
            $idQueryResult = mysqli_query($mysqli, $getIdQuery);
            $idArray = mysqli_fetch_array($idQueryResult, MYSQLI_ASSOC);
            $id = $idArray['id'];
            
            $insertBudget = "INSERT INTO budget (id,income,household,auto,other) VALUES ('$id','0','0','0','0')";
            $budgetResultQuery = mysqli_query($mysqli, $insertBudget);
            if($budgetResultQuery){
                $sendBack = "$authId,$authPass";
                echo $sendBack;
            }else{
                echo '200';
            }
        }
    }
?>