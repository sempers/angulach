var app = angular.module('Angulach', ['angular-meteor', 'ui.router']);

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $urlMatcherFactoryProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
        .state("signout", {
            url: '/signout',
            resolve: {
                "signout": function ($rootScope, $state) {
                    return Meteor.logout(function(err){
                        if (err){
                            console.log("logout error");
                        } else {
                            $rootScope.auth.currentUser = null;
                        }
                    });
                }
            }
        })
        .state('detail', {
            url: "/news/{num:int}",
            templateUrl: "client/blog/detail.html",
            controller: "ThreadDetailCtrl",
            controllerAs: 'c'
        })
        .state('add', {
            url: '/news/add',
            templateUrl: "client/blog/add.html",
            controller: "ThreadAddCtrl"
        })
        .state('all', {
            url: "/news/all",
            templateUrl: "client/blog/list.html",
            controller: "ThreadListCtrl",
            controllerAs: 'c'
        })
        .state('fav', {
            url: "/news/fav",
            templateUrl: "client/blog/list.html",
            controller: "ThreadFavCtrl",
            controllerAs: 'c'
        })
        .state('news', {
            url: "/news",
            templateUrl: "client/blog/list.html",
            controller: "ThreadNewsCtrl",
            controllerAs: 'c'
        })
        .state("default", {
            url: "/",
            onEnter: function ($state) {
                $state.go("all");
            }
        });
});

app.controller('AppCtrl', ["$scope", "$reactive", "$rootScope",
    function ($$, $reactive, $rootScope) {
        $reactive(this).attach($$);

        $$.signIn = function () {
            if (!Meteor.loggingIn()) {
                Meteor.loginWithPassword($$.auth.username, $$.auth.password, function (err) {
                        if (err) {
                            console.log("Неверное имя пользователя или пароль!");
                        }
                        else {
                            $$.auth.currentUser = Meteor.user();
                            //Session.set('currentUser', $$.auth.currentUser);
                            $$.auth.password = "";
                        }
                    }
                );
            }
        };

        $$.setTitle = function(title) {
            document.title = title + " | Ангуляч";
        }
    }]);

app.run(function($rootScope, $reactive, $meteor){
    $reactive(this).attach($rootScope);

    var self = this;

    this.subscribe("threads");
    this.subscribe("userInfo");
    this.subscribe("userData");
    this.subscribe("allUserData");

    this.autorun(function(){
        self.loggingIn = Meteor.loggingIn();
        self.currentUser = Meteor.user();
    });
});
