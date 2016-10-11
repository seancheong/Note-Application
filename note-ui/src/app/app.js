(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'templates-app',
    'templates-common',
    'note-application.home',
    'note-application.create-new',
    'note-application.view-note',
    'note-application-project',
    'note-application.login',
    'note-application.register',
    'note-application.persistence',
    'ui.router'
  ];

  var _PROJECT_DEPENDENCIES = [
    'note-application.persistence'
  ];

  var API_BASE = 'http://54.254.198.177:3000';
  var LIST_NOTES_URL = API_BASE + '/api/notes';
  var CREATE_NOTE_URL = API_BASE + '/api/note';
  var GET_NOTE_URL = API_BASE + '/api/view-note/{subject}';
  var EDIT_NOTE_URL = API_BASE + '/api/note';
  var REMOVE_NOTE_URL = API_BASE + '/api/delete-note';
  var LOGOUT_URL = API_BASE + '/users/logout';
  var LOGIN_URL = API_BASE + '/users/login';
  var REGISTER_URL = API_BASE + '/users/register';

  angular.module( 'note-application', _DEPENDENCIES)
         .config(appConfig)
         .run(function() {
         })
         .controller('AppCtrl', AppCtrl);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise( '/home' );
  }

  AppCtrl.$inject = ['$scope', '$location', 'noteService', 'SessionPersistenceService'];
  function AppCtrl( $scope, $location, noteService, PersistenceService) {
    $scope.isLoggedIn = false;
    $scope.username = "";

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | Note Application' ;
      }
    });

    $scope.$on('userSession', function(event, result) {
      $scope.isLoggedIn = result;

      if($scope.isLoggedIn) {
        $scope.username = PersistenceService.getUserSession();
      }
    });

    $scope.logout = function() {
      noteService.logout();
    };
  }

  /*
   * service that manages application data
   */
  angular.module('note-application-project', _PROJECT_DEPENDENCIES)
         .factory('noteService', noteService);

  noteService.$inject = ['$rootScope', '$http', '$q', '$timeout', '$location', 'SessionPersistenceService'];
  function noteService($rootScope, $http, $q, $timeout, $location, PersistenceService) {
    var notes = [];
    var selectedNote = null;

    return {
      getSelectedNote: getSelectedNote,
      listNotes: listNotes,
      createNote: createNote,
      viewNote: viewNote,
      editNote: editNote,
      removeNote: removeNote,
      logout: logout,
      login: login,
      register: register
    };

    function getSelectedNote() {
      return selectedNote;
    }

    function listNotes() {
      var data = {
        usernameSession: PersistenceService.getUserSession()
      };

      return $q(function(resolve, reject) {
        $http.post(LIST_NOTES_URL, data).then(function(response) {
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
        content: newContent,
        usernameSession: PersistenceService.getUserSession()
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

      var data = {
        usernameSession: PersistenceService.getUserSession()
      };

      $http.post(url, data).then(
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

    function editNote(subject, content) {
      var data = {
        subject: subject,
        content: content,
        usernameSession: PersistenceService.getUserSession()
      };

      $http.put(EDIT_NOTE_URL, data).then(
        function(response) {
          console.log("Note edited successfully");

          $timeout(function () {
            $location.path("/home");
          }, 0);
        },
        function(error) {
          console.log(error);
        }
      );
    }

    function removeNote(subject) {
      return $q(function(resolve, reject) {
        var data = {
          subject: subject,
          usernameSession: PersistenceService.getUserSession()
        };

        $http.post(REMOVE_NOTE_URL, data).then(
          function(response) {
            console.log("Note removed successfully");
            resolve(response);
          },
          function(error) {
            reject(error);
          }
        );
      });
    }

    function logout() {
      $http.post(LOGOUT_URL).then(
        function(response) {
          console.log("Logout successfully");

          PersistenceService.remove();

          // broadcast to tell that user is logged out
          $rootScope.$broadcast('userSession', false);

          $timeout(function () {
            $location.path("/home");
          }, 0);
        },
        function(error) {
          console.log(error);
        }
      );
    }

    function login(username, password) {
      var data = {
        username: username,
        password: password
      };

      $http.post(LOGIN_URL, data).then(
        function(response) {
          console.log("Login successfully");

          PersistenceService.save(response.data.data);

          // broadcast to tell that user is logged in
          $rootScope.$broadcast('userSession', true);

          $timeout(function () {
            $location.path("/home");
          }, 0);
        },
        function(error) {
          console.log(error);
        }
      );
    }

    function register(username, password) {
      var data = {
        username: username,
        password: password
      };

      $http.post(REGISTER_URL, data).then(
        function(response) {
          console.log("Register successfully");

          PersistenceService.save(response.data.data);

          // broadcast to tell that user is logged in
          $rootScope.$broadcast('userSession', true);

          $timeout(function () {
            $location.path("/home");
          }, 0);
        },
        function(error) {
          console.log(error);
        }
      );
    }
  }

})(angular, document);
