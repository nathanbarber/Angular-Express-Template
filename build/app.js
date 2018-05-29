var app = angular.module("myapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        controller: "home",
        templateUrl: "/views/home.html"
    });
});