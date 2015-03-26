function completionCheck(dataObject){
    if (dataObject.username == "") {
        return false;
    }else if (dataObject.password == ""){
        return false;
    }
    else{
        return true;
    }
}

$('#login_button').click(function(evt){
    evt.preventDefault();
    var usernameEntered = $('#username').val();
    var passwordEntered = $('#password').val();
    var loginData = {
        username: usernameEntered,
        password: passwordEntered
    }
    if (completionCheck(loginData)) {
        $.ajax({
            method: "POST",
            url: "../php/login.php",
            data: loginData,
            success: function(returnNum, textStatus, jqXHR){
                if (returnNum=="100") {
                    alert("Your Username is incorrect, please try again");
                }else if (returnNum == "200"){
                    alert("Your Password is incorrect, please try again");
                }else if (returnNum == "300") {
                    alert("We are experiencing difficulties.  Please try again later");
                }else{
                    var results = returnNum.split(",");
                    var expiration = 30 / 60 / 24;
                    $.cookie("authId", results[0], {expires: expiration});
                    $.cookie("authPass", results[1], {expires: expiration});
                    //var d = new Date();
                    //d.setTime(d.getTime() + (30*60*1000));
                    //var expires = "expires="+d.toUTCString();
                    //document.cookie="authId="+results+"; "+expires;
                    //document.cookie="authPass="+results[1]+"; "+expires;
                    $window.location.href="mybudget.html";
                }
            }            
        });
    }else{
        alert("Please type in your username and password");
    }
});