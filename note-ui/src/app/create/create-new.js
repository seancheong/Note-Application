(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'ui.router'
  ];

  angular.module('note-application.create-new', _DEPENDENCIES)
         .config(configure)
         .controller('CreateNewController', CreateNewController);

  configure.$inject = ['$stateProvider'];
  function configure($stateProvider) {
    $stateProvider.state( 'create', {
      url: '/create-new',
      views: {
        "main": {
          controller: 'CreateNewController',
          controllerAs: 'vm',
          templateUrl: 'create/create-new.tpl.html'
        }
      },
      data:{ pageTitle: 'New' }
    });
  }

  CreateNewController.$inject = ['$scope', 'noteService'];
  function CreateNewController($scope, noteService) {
    var vm = this;
    vm.newSubject = "";
    vm.newContent = "";

    vm.createNote = createNote;

    function createNote() {
      noteService.createNote(vm.newSubject, vm.newContent);
    }
  }

})(angular, document);
