(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'templates-app',
    'templates-common',
    'note-application.home',
    'note-application.create-new',
    'note-application.view-note',
    'note-application-project',
    'ui.router'
  ];

  var _PROJECT_DEPENDENCIES = [

  ];

  var API_BASE = 'http://54.254.198.177:3000/api';
  var LIST_NOTES_URL = API_BASE + '/notes';
  var CREATE_NOTE_URL = API_BASE + '/note';
  var GET_NOTE_URL = API_BASE + '/note/{subject}';

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

  noteService.$inject = ['$http', '$q', '$timeout', '$location'];
  function noteService($http, $q, $timeout, $location) {
    var notes = [];
    var selectedNote = null;

    return {
      getSelectedNote: getSelectedNote,
      listNotes: listNotes,
      createNote: createNote,
      viewNote: viewNote
    };

    function getSelectedNote() {
      return selectedNote;
    }

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

    function createNote(newSubject, newContent) {
      var data = {
        subject: newSubject,
        content: newContent
      };

      $http.post(CREATE_NOTE_URL, data).then(
        function(response) {
          console.log("Note created successfully");

          $timeout(function () {
            $location.path("/home");
          }, 0);
        },
        function(error) {
          console.log(error);
        }
      );
    }

    function viewNote(subject) {
      var url = GET_NOTE_URL.replace('{subject}', subject);

      $http.get(url).then(
        function(response) {
          console.log("Note retrieved successfully");
          selectedNote = response.data.data;

          $timeout(function () {
            $location.path("/view-note");
          }, 0);
        },
        function(error) {
          console.log(error);
        }
      );
    }
  }

})(angular, document);
