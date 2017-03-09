angular.module("Angulach").controller("SigninCtrl", ["$scope", "$meteor", "$state", "$mdDialog",
    function ($$, $meteor, $state, $mdDialog) {
        $$.user = {
            email: '',
            password: ''
        };

        $$.signin = function () {
            $meteor.loginWithPassword($$.user.email, $$.user.password).then(
                function () {
                    $mdDialog.hide();
                    $state.go("public");
                },
                function (err) {
                    $$.error = true;
                }
            );
        }
    }]);