angular.module("Angulach").controller("ThreadIndexCtrl", ["$scope", "$reactive", "$state", "$stateParams",
    function ($$, $reactive, $state, $stateParams) {
        $reactive(this).attach($$);
        var self = this;

        this.helpers({
            threads: function () {
                var options = $stateParams.action == "news" ? {approved: true}: {};
                return Post.find(options, {sort: {num: -1}}).fetch().map(function (post) {
                    return angular.extend(post, {
                        favorite: !!post.favoritedBy && (post.favoritedBy.indexOf(headers.getClientIP()) >=0),
                        hidden: !!post.hiddenBy && (post.hiddenBy.indexOf(headers.getClientIP()) >=0)
                    })
                })
            }
        });

        $$.hide = function (thread) {
            if (!thread.hidden) {
                self.call("post.hideThread", thread._id);
                thread.hidden = true;
            }
        };

        $$.showThread = function (thread) {
            if (thread.hidden) {
                self.call("post.showThread", thread._id);
                thread.hidden = false;
            }
            else {
                $state.go("detail", {num: thread.num});
            }
        }
    }]);