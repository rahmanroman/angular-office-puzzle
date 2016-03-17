/**
 * Created by Roman Rahman on 06.03.2016.
 */
angular.module('game', ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/state/:id/', {
            templateUrl: '/state.html',
            controller: 'StateCtrl as state',

            resolve: {
                StateData: ['$http', '$route', function ($http, $route) {
                    return $http.get('/api/' + $route.current.params.id + '.json?' + parseInt(Math.random() * +new Date())).then(function (result) {
                        return result.data;
                    }, function (r) {
                        console.error('error', r);
                    });
                }]
            }
        });

        $routeProvider.otherwise({redirectTo: '/state/01-295735'});
    }])

    .value('FoundValue', [])

    .controller('StateCtrl', ['$routeParams', '$location', 'StateData', 'FoundValue', function ($routeParams, $location, StateData, FoundValue) {
        var state = this;

        state.id = $routeParams.id;
        state.data = StateData;

        if(angular.isNumber(state.data.item) && (FoundValue.indexOf(state.id) == -1)) {
            FoundValue.push(state.id);
        }

        state.found = FoundValue.length;

        state.go = function (id) {
            $location.url('/state/' + id);
        }
    }]);

