function getCookies() {
    var user = document.cookie.split('; ');
    var nameCheck = user[0].split('=');
    var passCheck = user[1].split('=');
    console.log(passCheck[1]);
    return [nameCheck[1],passCheck[1]];
}

angular.module('toggleBudget', [])
        .factory('Budget', function($http){
            var people = [];
            console.log("After people, before cookies");
                                     
            return{
                get: function(){
                    console.log("In get");
                    var cookieVerify = getCookies();
                    url = 'php/getbudgetitems.php?authId='+cookieVerify[0]+'&authPass='+cookieVerify[1];
                    console.log(url);
                    
                    if(people.length == 0){
                      $http.get(url)
                        .success(function(response){
                            console.log(response);
                            people.push(response);
                        });
                    }
                    return people;
                },
                
                save: function(){
                    console.log("In Save");
                    $saveInfo = people[0];
                    console.log($saveInfo);
                    url = 'php/savebudgetitems.php';
                    $http.post(url, $saveInfo)
                        .success(function(response){
                        alert(response);
                        });
                    
                    return people;
                }
            }
        })
        .controller('budgetControl', function($scope, Budget){
            console.log("In the controller");
            $scope.user = Budget.get();
            $scope.save = Budget.save;
        });