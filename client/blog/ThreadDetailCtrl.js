angular.module('Angulach').controller("ThreadDetailCtrl", ["$scope", "$reactive", "$stateParams",
    function ($$, $reactive, $stateParams) {
        $reactive(this).attach($$);

        var thread_num = +$stateParams.num;
        this.subscribe("thread-detail", function() { return [thread_num]; });
        var self = this;
        $$.setTitle('Пост №' + thread_num);


        this.helpers({
            thread: function () {
                return Post.loadOneThread({num: thread_num});
            },
            comments: function() {
                return Post.loadComments({thread_num: thread_num});
            }
        });

        $$.blankComment = function () {
            $$.nComment = {
                body: "",
                board: "",
                thread_num: thread_num
            };
        };

        $$.addComment = function () {
            self.call("post.addComment", $$.nComment);
            $$.blankComment();
        };

        $$.$on("pasteNum", function(o, num){
            $$.nComment.body += ">>" + num;
        });

        $$.blankComment();
    }]);