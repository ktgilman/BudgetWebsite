function getCookies() {
    var user = document.cookie.split('; ');
    if (user.length < 2) {
        return null;
    }else{
        var nameCheck = user[0].split('=');
        var passCheck = user[1].split('=');
        console.log(passCheck[1]);
        return [nameCheck[1],passCheck[1]]; 
    }
}

function deleteCookies() {
    document.cookie = "authId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "authPass=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

angular.module('toggleBudget', [])
        .factory('Budget', function($http){
            var people = [];
            console.log("After people, before cookies");
                                     
            return{
                get: function(){
                    console.log("In get");
                    var cookieVerify = getCookies();
                    if (!cookieVerify) {
                        people.push({
                            noResponse:"Please log in to access your budget.",
                            loggedIn: false
                            });
                        }else{
                        url = 'php/getbudgetitems.php?authId='+cookieVerify[0]+'&authPass='+cookieVerify[1];
                        console.log(url);
                    
                        if(people.length == 0){
                        $http.get(url)
                          .success(function(response){
                              console.log(response);
                              people.push(response);
                          })
                          .error(function(){
                              people.push({
                                noResponse:"Please log in to access your budget.",
                                loggedIn: false
                                });
                          });
                        }
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
                },
                
                logOut: function(){
                    deleteCookies();
                    people.pop();
                    people.push({
                        noResponse: "You have successfully logged out",
                        loggedIn: false
                    })
                    return people;
                }
            }
        })
        .controller('budgetControl', function($scope, Budget){
            console.log("In the controller");
            $scope.user = Budget.get();
            $scope.save = Budget.save;
            $scope.logOut = Budget.logOut;
        })
        .directive('goodToGo', function(){
            return{
                scope:{
                    'feedback': '=goodToGo'
                },
                link: function($scope, $element, $attrs){
                    $attrs.$observe('calculation', function(newValue){
                        if (newValue <= 0) {
                            $element.text('Way to Go!');
                        }else if (newValue > 0) {
                            $element.text('Still needs some work!');
                        }
                    });
                }
            }
        });