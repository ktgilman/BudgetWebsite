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
            url: "login.php",
            data: loginData,
            dataType: 'json',
            success: function(returnObject, textStatus, jqXHR){
                alert(returnObject.username);
                alert(returnObject.password);
            }            
        });
    }else{
        alert("Please type in your username and password");
    }
});