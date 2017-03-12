/**
 * Created by Rookie on 12.03.2017.
 */
angular.module('Angulach').directive('commentItem', function () {
    return {
        templateUrl: 'client/blog/components/commentItem.html',
        scope: {comment: '='},
        controller: ["$scope", "$element", "$attrs", "$transclude", "$reactive",
            function ($$,  $element, $attrs, $transclude, $reactive) {
                $$.pasteNum = function(num){
                    $$.$emit("pasteNum", num);
                }
        }]
    };
});