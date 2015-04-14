$('#signup_button').click(function(evt){
    evt.preventDefault();
    firstName = $('#first_name').val();
    lastName = $('#last_name').val();
    userName = $('#new_username').val();
    password = $('#new_password').val();
    confirmPassword = $('#confirm_password').val();
    dataToSend = {
        first_name : firstName,
        last_name : lastName,
        user_name : userName,
        pass_word : password
    }
    if (!firstName || !lastName || !userName || !password || !confirmPassword) {
        alert("Please completely fill out the form below to sign up.");
    }else if(password != confirmPassword){
        alert("Password and Confirm Password do not match");
    }else{
        $.ajax({
            url: "php/signup.php",
            data: dataToSend,
            method: 'POST',
            success: function(response){
                if (response=='100') {
                    alert('Could not connect to server. Please try again');
                }else if (response=='200') {
                    alert('Could not speak to database. PLease try again');
                }else if (response=='300'){
                    alert('Username has already been taken. Please try a different User Name');
                }else{
                    setCookieAndGo(response);
                }
            }
        });
    }
});