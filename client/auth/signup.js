angular.module("Angulach").controller("SignupCtrl", ["$scope", "$meteor", "$state",
    function ($$, $meteor, $state) {
        $$.user = {
            email: "",
            password: "",
            profile: {
                name: "",
                surname: "",
                sex: ""
            }
        };

        $$.error = false;

        $$.signup = function () {
            $meteor.createUser($$.user).then(
                function () {
                    $state.go('public');
                },
                function (err) {
                    $$.error = true;
                }
            )
        }
    }
]);