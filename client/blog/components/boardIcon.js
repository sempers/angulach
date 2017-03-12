/**
 * Created by Rookie on 12.03.2017.
 */
angular.module('Angulach').directive('boardIcon', function () {
        return {
            templateUrl: 'client/blog/components/boardIcon.html',
            scope: {
                board: '@'
            },
            controller: function ($scope, $element, $attrs, $transclude, Boards) {
                $scope.boardImg = function (name) {
                    return Boards.img(name);
                };

                $scope.getBoard = function(name) {
                    return Boards.get(name);
                }
            }
        }
    }
);