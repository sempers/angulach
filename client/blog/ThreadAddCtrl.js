angular.module('Angulach').controller("ThreadAddCtrl", ["$scope", "$reactive", "$state",
    function ($$, $reactive, $state) {
        $reactive(this).attach($$);
        var self = this;
        $$.setTitle('Добавить пост');

        $$.blankThread = function () {
            $$.nThread = {
                heading: "",
                body: "",
                link: "",
                board: "",
            };
        };

        $$.blankThread();

        $$.startThread = function () {
            self.call("post.startThread", $$.nThread,
                function (error, num) {
                    $state.go("detail", {num: num});
                });
        };
    }]);
