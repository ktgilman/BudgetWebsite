<?php
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbServer, $dbUser, $dbPass, $dbName);
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    if(mysqli_connect_errno()){
        printf("Connect Failed: %s\n",mysqli_connect_error());
        exit();
    }else{
        $reqLoginAuth = "SELECT * FROM user WHERE username = '$username'";
        $result = mysqli_query($mysqli, $reqLoginAuth);
        if($result){
            $resultsArray = mysqli_fetch_array($result, MYSQLI_ASSOC);
            if(!$resultsArray){
                echo "100";
            }else{
                $testId = $resultsArray['id'];
                $testPassword = $resultsArray['password'];
                if($password != $testPassword){
                    echo "200";
                }else{
                    $idFirstPart = substr($username, 0,4);
                    $idSecondPart = strval(rand("1E3", "9E3"));
                    $authId = $idFirstPart.$idSecondPart;
                    $authPass = rand("1e6","9e6");
                    $insertAuthNums = "UPDATE user SET authId = '$authId',authPass = '$authPass' WHERE id = '$testId'";
                    $insertResult = mysqli_query($mysqli, $insertAuthNums);
                    if(!$insertResult){
                        echo "300";
                    }else{
                        $sendBack = "$authId,$authPass";
                        echo $sendBack;
                    }
                    
                }
                
            }
            
        
        }else{
            printf("Error: %s\n", mysqli_error($mysqli));
        }
    }
?>