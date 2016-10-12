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
    'note-application.logout-confirm',
    'ui.router',
    'ui.bootstrap',
    'angular-growl'
  ];

  var _PROJECT_DEPENDENCIES = [
    'note-application.persistence',
    'note-application.settings',
    'angular-growl'
  ];

  angular.module( 'note-application', _DEPENDENCIES)
         .config(appConfig)
         .run(function() {
         })
         .controller('AppCtrl', AppCtrl);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'growlProvider'];
  function appConfig($stateProvider, $urlRouterProvider, growlProvider) {
    $urlRouterProvider.otherwise( '/home' );

    growlProvider.onlyUniqueMessages(true);
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalPosition('top-right');
    growlProvider.globalTimeToLive(5000);
  }

  AppCtrl.$inject = ['$scope', '$location', '$uibModal', 'noteService', 'SessionPersistenceService'];
  function AppCtrl( $scope, $location, $uibModal, noteService, PersistenceService) {
    $scope.isLoggedIn = false;
    $scope.username = "";

    // check to user whether user has logged in
    checkUserSession();

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
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modal/modal-logout.tpl.html',
        controller: 'LogoutConfirmationController',
        // controllerAs: 'vm',
        size: 'md',
        scope: $scope,
        keyboard: false,
        backdrop: 'static'
      });

      modalInstance.result.then(function(command) {
        if(command === 'logout') {
          noteService.logout();
        }
      });
    };

    function checkUserSession() {
      if(PersistenceService.getUserSession()) {
        $scope.isLoggedIn = true;
        $scope.username = PersistenceService.getUserSession();
      }
    }
  }

  /*
   * service that manages application data
   */
  angular.module('note-application-project', _PROJECT_DEPENDENCIES)
         .factory('noteService', noteService);

  noteService.$inject = ['$rootScope', '$http', '$q', '$timeout', '$location', 'growl', 'SessionPersistenceService', 'SettingsService'];
  function noteService($rootScope, $http, $q, $timeout, $location, growl, PersistenceService, SettingsService) {
    var notes = [];
    var selectedNote = null;

    var API = SettingsService.getApiUrl();
    var LIST_NOTES_URL = API.listNotesUrl;
    var CREATE_NOTE_URL =  API.createNoteUrl;
    var GET_NOTE_URL =  API.getNoteUrl;
    var EDIT_NOTE_URL =  API.editNoteUrl;
    var REMOVE_NOTE_URL =  API.removeNoteUrl;
    var LOGOUT_URL =  API.logoutUrl;
    var LOGIN_URL =  API.loginUrl;
    var REGISTER_URL = API.registerUrl;

    return {
      getSelectedNote: getSelectedNote,
      backToHome: backToHome,
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

    function backToHome() {
      redirectTo('/home');
    }

    function listNotes() {
      return $q(function(resolve, reject) {
        $http.post(LIST_NOTES_URL).then(function(response) {
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
          growl.success("Created successfully");

          redirectTo('/home');
        },
        function(error) {
          handleError(error);
        }
      );
    }

    function viewNote(id, subject) {
      var url = GET_NOTE_URL.replace('{id}', id).replace('{subject}', subject);

      $http.post(url).then(
        function(response) {
          console.log("Note retrieved successfully");
          selectedNote = response.data.data;

          redirectTo('/view-note');
        },
        function(error) {
          handleError(error);
        }
      );
    }

    function editNote(id, subject, content) {
      var data = {
        id: id,
        subject: subject,
        content: content
      };

      $http.put(EDIT_NOTE_URL, data).then(
        function(response) {
          console.log("Note edited successfully");
          growl.success("Edited successfully");

          redirectTo('/home');
        },
        function(error) {
          handleError(error);
        }
      );
    }

    function removeNote(id, subject) {
      return $q(function(resolve, reject) {
        var data = {
          id: id,
          subject: subject
        };

        $http.post(REMOVE_NOTE_URL, data).then(
          function(response) {
            console.log("Note removed successfully");
            growl.success("Removed successfully");
            resolve(response);
          },
          function(error) {
            reject(error);
            handleError(error);
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

          redirectTo('/home');
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

          redirectTo('/home');
        },
        function(error) {
          console.log(error);
          growl.error("Invalid Login, incorrect username or password");
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

          // login newly registered user
          login(username, password);
        },
        function(error) {
          console.log(error);
          growl.error("Invalid registration, please try another username");
        }
      );
    }

    function redirectTo(path) {
      $timeout(function () {
        $location.path(path);
      }, 0);
    }

    function handleError(error) {
      console.log(error);

      if(error.data) {
        growl.error(error.data.message);
      }
    }
  }

})(angular, document);
