angular.module("Angulach").controller("ThreadDetailCtrl", ["$scope", "$reactive", "$stateParams",
    function ($$, $reactive, $stateParams) {
        $reactive(this).attach($$);
        var thread_num = +$stateParams.num;

        this.subscribe("thread-detail", function() { return [thread_num];});
        var self = this;

        this.helpers({
            thread: function () {
                return Post.findOne({num: thread_num});
            },
            comments: function() {
                return Post.find({thread_num: thread_num, isThreadStart: false})
            }
        });

        $$.blankComment = function () {
            $$.nComment = {
                body: "",
                board: "",
                thread_num: thread_num
            };
        };

        $$.blankComment();

        $$.addComment = function () {
            self.call("post.addComment", $$.nComment);
            $$.blankComment();
        };

        $$.pasteNum = function(num) {
            $$.nComment.body += ">>" + num;
        }
    }]);