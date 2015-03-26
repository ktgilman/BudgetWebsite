<?php
    include 'credentials.php';
    
    $mysqli = new mysqli($dbServer, $dbUser, $dbPass, $dbName);
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $returnArr;
    
    $username = "kevin";
    if(mysqli_connect_errno()){
        printf("Connect Failed: %s\n",mysqli_connect_error());
        exit();
    }else{
        $reqLoginAuth = "SELECT * FROM user WHERE username = '$username'";
        $result = mysqli_query($mysqli, $reqLoginAuth);
        printf($reqLoginAuth);
        if($result){
            $resultsArray = mysqli_fetch_array($result, MYSQLI_ASSOC);
            $id = $resultsArray['id'];
            printf($id);
        
        }else{
            printf("Error: %s\n", mysqli_error($mysqli));
        }
        $returnArr = array('username' => $username, 'password' => $password);
        echo json_encode($returnArr);
    }
?>