(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'ui.router'
  ];

  angular.module('note-application.view-note', _DEPENDENCIES)
         .config(configure)
         .controller('ViewNoteController', ViewNoteController);

  configure.$inject = ['$stateProvider'];
  function configure($stateProvider) {
    $stateProvider.state( 'view', {
      url: '/view-note',
      views: {
        "main": {
          controller: 'ViewNoteController',
          controllerAs: 'vm',
          templateUrl: 'view/view-note.tpl.html'
        }
      },
      data:{ pageTitle: 'View' }
    });
  }

  ViewNoteController.$inject = ['$scope', '$timeout', '$location', 'noteService'];
  function ViewNoteController($scope, $timeout, $location, noteService) {
    var vm = this;
    var selectedNote = null;

    vm.subject = "";
    vm.editedContent = "";

    vm.editNote = editNote;

    listSelectedNote();

    function listSelectedNote() {
      selectedNote = noteService.getSelectedNote();
      
      if(selectedNote) {
        vm.subject = selectedNote.subject;
        vm.editedContent = selectedNote.content;
      }
    }

    function editNote() {

    }
  }

})(angular, document);