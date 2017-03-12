angular.module('Angulach').directive('boardSelect', function () {
    return {
        templateUrl: 'client/blog/components/boardSelect.html',
        scope: {
            ctx: '='
        },
        controller: function ($scope,  $element, $attrs, $transclude, Boards) {
            $scope.items = Boards.all();

            $scope.showMenu = function () {
                $scope.menuShown = !$scope.menuShown;
            };

            $scope.setValue = function (item) {
                $scope.ctx.board = item.name;
                $scope.menuShown = false;
            };

            $scope.boardImg = function(name) {
                return Boards.img(name);
            };
        }
    };
});