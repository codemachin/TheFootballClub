

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/home-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'myTeam'
        })
        .when('/epl/:id',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'myTeam'
        })
        .when('/single/:date/:team/:eplid',{
        	templateUrl     : 'views/match-view.html',
        	controller 		: 'matchController',
        	controllerAs 	: 'myMatch'
        })
        .when('/team1',{

        	templateUrl     : 'views/team1-view.html',
        	
        })
        .when('/team2',{

        	templateUrl     : 'views/team2-view.html',
        	
        })
        .when('/teamStats/:teamname/:tid',{

        	templateUrl     : 'views/teamStat-view.html',
        	controller 		: 'teamStat',
        	controllerAs 	: 'myMatch'
        })
        

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);