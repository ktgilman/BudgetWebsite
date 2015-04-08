<?php
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbServer, $dbUser, $dbPass, $dbName);
    
    $authId = $_GET['authId'];
    $authPass = $_GET['authPass'];
    $id;
    $firstName;
    $lastName;
    $income;
    $household;
    $auto;
    $other;
    $returnValues;
    
    if(mysqli_connect_errno()){
        printf("Connect Failed: %s\n",mysqli_connect_error());
        exit();
    }else{
        $reqLoginAuth = "SELECT * FROM user WHERE authId = '$authId'";
        $firstResult = mysqli_query($mysqli, $reqLoginAuth);
        
        if($firstResult){
            $resultsArray = mysqli_fetch_array($firstResult, MYSQLI_ASSOC);
            $id = $resultsArray['id'];
            $firstName = $resultsArray['firstName'];
            $lastName = $resultsArray['lastName'];
            
        
        }else{
            printf("Error: %s\n", mysqli_error($mysqli));
        }
        
        $reqBudgetInfo = "SELECT * FROM budget WHERE id = '$id'";
        $secondResult = mysqli_query($mysqli, $reqBudgetInfo);
        
        if($secondResult){
            $budgetItemsArray = mysqli_fetch_array($secondResult, MYSQLI_ASSOC);
            $income = $budgetItemsArray['income'];
            $household = $budgetItemsArray['household'];
            $auto = $budgetItemsArray['auto'];
            $other = $budgetItemsArray['other'];
        }else{
            printf("Error: %s\n", mysqli_error($mysqli));
        }
        
    }
    
    $returnValues = array(
                "id" => $id,
                "firstName" => $firstName,
                "lastName" => $lastName,
                "income" => $income,
                "household" => $household,
                "auto" => $auto,
                "other" => $other
            );
    
    echo json_encode($returnValues);
?>