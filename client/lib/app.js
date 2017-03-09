var app = angular.module('Angulach', ['angular-meteor', 'ui.router', 'ngMaterial'])

    .config(function ($urlRouterProvider, $stateProvider, $locationProvider, $urlMatcherFactoryProvider, $mdThemingProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state("signup", {
                url: '/signup',
                templateUrl: 'client/auth/signup.html',
                controller: 'SignupCtrl'
            })
            .state("signin", {
                url: '/login',
                templateUrl: 'client/main/signin.html',
                controller: 'SigninCtrl'
            })
            .state("logout", {
                url: '/logout',
                resolve: {
                    "logout": function ($meteor, $state) {
                        return $meteor.logout().then(
                            function () {
                                $state.go('default');
                            },
                            function (err) {
                                console.log('logout error: ', err);
                            });
                    }
                }
            })
            .state('detail', {
                url: "/news/{num:int}",
                templateUrl: "client/thread/detail.html",
                controller: "ThreadDetailCtrl",
                controllerAs: 'c'
            })
            .state('add',{
                url: '/news/add',
                templateUrl: "client/thread/add.html",
                controller: "ThreadAddCtrl"
            })
            .state('all', {
                url: "/news/all",
                templateUrl: "client/thread/index.html",
                controller: "ThreadIndexCtrl",
                controllerAs: 'c'
            })
            .state('fav', {
                url: "/news/fav",
                templateUrl: "client/thread/index.html",
                controller: "ThreadFavCtrl",
                controllerAs: 'c'
            })

            .state('news', {
                url: "/news*",
                templateUrl: "client/thread/index.html",
                controller: "ThreadIndexCtrl",
                controllerAs: 'c'
            })
            .state("default", {
                url: "/",
                onEnter: function ($state) {
                    $state.go("all");
                }
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('orange')
            .accentPalette('deep-orange');
    })

    .controller('AppCtrl', ["$scope", "$reactive", "$mdDialog", "$rootScope",
        function ($$, $reactive, $mdDialog, $rootScope) {
            $rootScope.showAddThread = false;
            //глобальный подписон на тредs
            $reactive(this).attach($$);
            var self = this;
            this.subscribe("threads");

            $$.showLogin = function (ev) {
                $mdDialog.show({
                    controller: "SigninCtrl",
                    templateUrl: "client/auth/signin.html",
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(
                    function (answer) {
                        $$.status = answer;
                    },
                    function () {
                        $$.status = "dialog cancelled";
                    });
            };

            $$.rate = function (thread, rateDir) {
                if (rateDir != "up" && rateDir != "down")
                    return false;
                var incRate = rateDir == "up" ? 1 : -1;
                if (!thread.ratedBy || (!thread.ratedBy.indexOf(headers.getClientIP()) <0))
                    Post.update({_id: thread._id}, {$inc: {rating: incRate}, $push: {ratedBy: headers.getClientIP()}});
            };

            $$.rateClass = function (rating) {
                return rating >= 0 ? "js-rate g-green" : "js-rate g-red";
            };

            $$.favorite = function (thread) {
                if (!thread.favorite) {
                    self.call("post.addFavorite", thread._id);
                    thread.favorite = true;
                }
                else {
                    self.call("post.removeFavorite", thread._id);
                    thread.favorite = false;
                }
            };

            $$.toggleAddThread = function(){
                $$.showAddThread = !$$.showAddThread;
            };
        }])
    ;
