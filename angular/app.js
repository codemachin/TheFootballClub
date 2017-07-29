
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('teamApp', ['ngRoute']); 


// this is without $scope
myApp.controller('mainController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;

  this.name = "";
  this.matches = [];
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.rounds = [];
  
  console.log(this.rounds);
  if($routeParams.id==15){
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.mn = 15;
  }else if($routeParams.id==16) {
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    this.mn = 16;
  }

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

          
          
          

          console.log(main.matches);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all blogs
   


}]); // end controller






myApp.controller('matchController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;
  this.name = '';
  this.name2 = '';
  console.log($routeParams.mn);
  
  this.match = $routeParams.date;
  this.tem = $routeParams.team;
  console.log(this.match);
  console.log(this.tem);
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
          console.log(main.rounds);

          angular.forEach(main.rounds, function(value, key1) {
              
            angular.forEach(value.matches, function(value, key) {
            if(value.date==main.match&& value.team1.name==main.tem){
              
              main.name = value.team1.name;
              main.name2 = value.team2.name;
              main.matchDay = main.rounds[key1].name;
              main.date = value.date;
              main.score1 = value.score1;
              main.score2 = value.score2;
              console.log(value.score2 , main.matchDay);
            }
          });

          });

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs




}]); // end controller






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
console.log(main.teamname);

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
          console.log(main.rounds);

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

          });

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
  
   


}]); // end controller




myApp.controller('blogEditController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'Edit Blog Post';
  this.pageSubHeading = 'please edit the field you want to change';

  this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }// end get parameter by name

  this.blogId = this.getParameterByName('blogId');
  console.log(this.blogId);

  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.loadBlog = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog);

          main.heading = main.blog.heading;
          main.subHeading = main.blog.subHeading;
          main.bodyHtml = main.blog.bodyHtml;
          main.author = main.blog.author;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs


  this.editPost = function(){

      var myData ={

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      console.log(myData);
   
      $http({
        method: 'PUT',
        data  : myData,
        url: main.baseUrl+'/'+main.blogId+'/edit'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog edited successfully");
          window.location = 'post.html?blogId='+response.data.data.blogId;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]);