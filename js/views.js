function signUpDisplay(event){
    event.preventDefault();
    $('#user_login').hide();
    $('#user_signup').show();
}

function logInDisplay(event){
    event.preventDefault();
    $('#user_signup').hide();
    $('#user_login').show();
}

$('#sign_up').click(function(evt){
    signUpDisplay(evt);
});

$('#log_in').click(function(evt){
    logInDisplay(evt);
});

$('#loginTop').click(function(evt){
    logInDisplay(evt);
})

$('#signupTop').click(function(evt){
    signUpDisplay(evt);
})