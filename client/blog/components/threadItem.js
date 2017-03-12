/**
 * Created by Rookie on 12.03.2017.
 */
angular.module('Angulach').directive('threadItem', function () {
   return {
       templateUrl: 'client/blog/components/threadItem.html',
       scope: {
           thread: '='
       },
       controller: ["$scope", "$element", "$attrs", "$transclude", "$reactive", "$state", function ($$,  $element, $attrs, $transclude, $reactive, $state) {
           $reactive(this).attach($$);
           var self = this;

           $$.rate = function (thread, dir) {
               self.call("post.rate", thread._id, dir, function (error, result) {
                   if (!result) {
                        console.log("you've already rated")
                   }
               });
           };

           $$.rateClass = function (rating) {
               return rating >= 0 ? "js-rate g-green" : "js-rate g-red";
           };

           $$.favorite = function (thread) {
               if (!thread.favorite) {
                   self.call("userInfo.addFavorite", thread._id);
                   thread.favorite = true;
               }
               else {
                   self.call("userInfo.removeFavorite", thread._id);
                   thread.favorite = false;
               }
           };

           $$.hide = function (thread) {
               if (!thread.hidden) {
                   self.call("userInfo.hideThread", thread._id);
                   thread.hidden = true;
               }
           };

           $$.showThread = function (thread) {
               if (thread.hidden) {
                   self.call("userInfo.showThread", thread._id);
                   thread.hidden = false;
               }
               else {
                   $state.go("detail", {num: thread.num});
               }
           }
       }]
   };
});