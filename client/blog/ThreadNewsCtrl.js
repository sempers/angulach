angular.module('Angulach').controller("ThreadNewsCtrl", ["$scope", "$reactive", "$state",
    function ($$, $reactive, $state) {
        $reactive(this).attach($$);
        var self = this;
        $$.setTitle('Одобренные посты');


        this.helpers({
            threads: function () {
                return Post.loadThreads({approved: true});
            }
        });
    }]);