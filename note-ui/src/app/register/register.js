(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'ui.router'
  ];

  angular.module('note-application.register', _DEPENDENCIES)
         .config(configure)
         .controller('RegisterController', RegisterController);

  configure.$inject = ['$stateProvider'];
  function configure($stateProvider) {
    $stateProvider.state( 'register', {
      url: '/register',
      views: {
        "main": {
          controller: 'RegisterController',
          controllerAs: 'vm',
          templateUrl: 'register/register.tpl.html'
        }
      },
      data:{ pageTitle: 'Register' }
    });
  }

  RegisterController.$inject = ['$scope', 'noteService'];
  function RegisterController($scope, noteService) {
    var vm = this;
    vm.username = "";
    vm.password = "";
    vm.passwordConfirm = "";

    vm.register = register;
    vm.backToHome = backToHome;

    function register() {
      if(isPasswordMatch()) {
        noteService.register(vm.username, vm.password);
      }
    }

    function backToHome() {
      noteService.backToHome();
    }

    function isPasswordMatch() {
      return vm.password === vm.passwordConfirm;
    }
  }

})(angular, document);
