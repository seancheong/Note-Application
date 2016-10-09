(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'templates-app',
    'templates-common',
    'note-application.home',
    'note-application-project',
    'ui.router'
  ];

  var _PROJECT_DEPENDENCIES = [

  ];

  var API_BASE = 'http://54.254.198.177:3000/api';
  var LIST_NOTES_URL = API_BASE + '/notes';

  angular.module( 'note-application', _DEPENDENCIES)
         .config(appConfig)
         .run(function() {
         })
         .controller('AppCtrl', AppCtrl);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise( '/home' );
  }

  AppCtrl.$inject = ['$scope', '$location'];
  function AppCtrl( $scope, $location) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | Note Application' ;
      }
    });
  }

  /*
   * service that manages application data
   */
  angular.module('note-application-project', _PROJECT_DEPENDENCIES)
         .factory('noteService', noteService);

  noteService.$inject = ['$http', '$q'];
  function noteService($http, $q) {
    var notes = [];

    return {
      listNotes: listNotes
    };

    function listNotes() {
      return $q(function(resolve, reject) {
        $http.get(LIST_NOTES_URL).then(function(response) {
          notes = response.data.data;
          console.log("Succesfully listed all notes: " + notes);
          resolve(notes);
        },
        function(error) {
          reject(error);
        });
      });
    }
  }

})(angular, document);
