(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'ui.router'
  ];

  angular.module('note-application.home', _DEPENDENCIES)
         .config(configure)
         .controller('HomeController', HomeController);

  /**
   * Each section or module of the site can also have its own routes. AngularJS
   * will handle ensuring they are all available at run-time, but splitting it
   * this way makes each module more "self-contained".
   */
  configure.$inject = ['$stateProvider'];
  function configure($stateProvider) {
    $stateProvider.state( 'home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeController',
          controllerAs: 'vm',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data:{ pageTitle: 'Home' }
    });
  }

  HomeController.$inject = ['$scope', '$timeout', '$location', 'noteService'];
  function HomeController($scope, $timeout, $location, noteService) {
    var vm = this;
    vm.notes = [];
    vm.goToCreateNew = goToCreateNew;
    vm.viewNote = viewNote;
    vm.removeNote = removeNote;

    listNotes();

    $scope.$on('userSession', function(event, result) {
      if(!result) {
        vm.notes = [];
      }
    });

    function listNotes() {
      noteService.listNotes().then(function(notes) {
        vm.notes = notes;
      });
    }

    function goToCreateNew() {
      $timeout(function () {
        $location.path("/create-new");
      }, 0);
    }

    function viewNote(subject) {
      noteService.viewNote(subject);
    }

    function removeNote(subject) {
      noteService.removeNote(subject).then(
        function(response) {
          listNotes();
        },
        function(error) {
          console.log(error);
        }
      );
    }
  }

})(angular, document);
