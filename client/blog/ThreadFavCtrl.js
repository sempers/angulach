angular.module('Angulach').controller("ThreadFavCtrl", ["$scope", "$reactive", "$state",
    function ($$, $reactive, $state) {
        $reactive(this).attach($$);
        var self = this;
        $$.setTitle('Избранные посты');

        this.helpers({
            threads: function () {
                var userInfo = UserInfo.findOne({});
                if (userInfo) {
                    return Post.loadThreads({_id: {$in: userInfo.favorites}});
                }
            }
        });
    }]
);