$('#sign_up').click(function(evt){
    evt.preventDefault();
    $('#user_login').hide();
    $('#user_signup').show();
});

$('#log_in').click(function(evt){
    evt.preventDefault();
    $('#user_signup').hide();
    $('#user_login').show();
});