
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('teamApp', ['ngRoute']); 


// for getting all match details
myApp.controller('mainController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;

  this.name = "";
  this.matches = [];
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.rounds = [];
  
  //if-else to use correct json data using $routeParams for year 15/16 and year 16/17
  if($routeParams.id==15){
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.mn = 15;
  }else if($routeParams.id==16) {
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    this.mn = 16;
  }
  //gets all the list of matches for current session
  this.loadAllMatches = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          main.name = response.data.name;
          main.rounds = response.data.rounds;

          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all matches
   


}]); // end controller




//controller for getting single match details

myApp.controller('matchController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;
  this.name = '';
  this.name2 = '';
  //gets date and team info from routeParams to filter out a specific match
  this.match = $routeParams.date;
  this.tem = $routeParams.team;
  
  //checks if match details for 2015 or 2016
  if($routeParams.eplid==15){
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  } else if($routeParams.eplid==16){
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  }
  this.loadSingleMatch = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.rounds = response.data.rounds;
          //Twice nested for each loops for getting values for a specific match.
          angular.forEach(main.rounds, function(value, key1) {
              
            angular.forEach(value.matches, function(value, key) {
            if(value.date==main.match&& value.team1.name==main.tem){
              
              main.name = value.team1.name;
              main.name2 = value.team2.name;
              main.matchDay = main.rounds[key1].name;
              main.date = value.date;
              main.score1 = value.score1;
              main.score2 = value.score2;
              //console.log(value.score2 , main.matchDay);
            }
          });

          }); //end of loops

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load single match




}]); // end controller





//for getting team details and catculating team statistics
myApp.controller('teamStat',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;

  this.teamname='teamname';
  this.totalGoals=0;
  this.matchCount=0;
  this.totalWon=0;
  this.totalLoss=0;
  this.totalDraw=0;

this.teamname=$routeParams.teamname;
//console.log(main.teamname);
// checks if match details needed for 2015 or 2016
if($routeParams.tid==15){
this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
}else {
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
}

  this.loadTeamStats = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.rounds = response.data.rounds;
          //console.log(main.rounds);
          //double nested loops to calculate team stats
          angular.forEach(main.rounds, function(value, key1) {
              
            angular.forEach(value.matches, function(value, key) {
              if(value.team1.name==main.teamname){
                  main.matchCount+=1;
                  main.totalGoals+=value.score1;
                if(value.score1>value.score2){
                  main.totalWon+=1;

                }else if(value.score1<value.score2){
                  main.totalLoss+=1;
                }else if(value.score1===value.score2){
                  main.totalDraw+=1;
                      }} 

                      else if(value.team2.name==main.teamname){
                      main.matchCount+=1;
                      main.totalGoals+=value.score2;
                      if(value.score2>value.score1){
                        main.totalWon+=1;

                      }else if(value.score2<value.score1){
                        main.totalLoss+=1;

                      }else if(value.score1===value.score2){
                        main.totalDraw+=1;
                        }}
          });

          }); //end of loops

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end calculating team stats
  
   


}]); // end controller

