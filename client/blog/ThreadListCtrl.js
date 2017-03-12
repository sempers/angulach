angular.module('Angulach').controller("ThreadListCtrl", ["$scope", "$reactive", "$state", "$stateParams",
    function ($$, $reactive, $state, $stateParams) {
        $reactive(this).attach($$);
        var self = this;
        $$.setTitle('Все посты');

        this.helpers({
            threads: function () {
                return Post.loadThreads();
            }
        });
    }]);