/**
 * Created by Rookie on 08.03.2017.
 */
var app = angular.module('Angulach');

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('ngEscape', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 27) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('icon', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            icon: '@'
        },
        template: '<i class="glyphicon glyphicon-{{icon}}"></i>'
    };
});

app.directive('toNum', function(){
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel){
            ngModel.$parsers.push(function(val){
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function(val){
                return '' + val;
            });
        }
    }
});

app.directive('toDate', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (date) {
                return moment(date, "DD.MM.YYYY")._d;
            });
            ngModel.$formatters.push(function (date) {
                return moment(date).format("DD.MM.YYYY");
            });
        }

    }
});
