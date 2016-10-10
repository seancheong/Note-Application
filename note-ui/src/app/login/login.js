(function(angular, document) {
  'use strict';

  var _DEPENDENCIES = [
    'ui.router'
  ];

  angular.module('note-application.login', _DEPENDENCIES)
         .config(configure)
         .controller('LoginController', LoginController);

  configure.$inject = ['$stateProvider'];
  function configure($stateProvider) {
    $stateProvider.state( 'login', {
      url: '/login',
      views: {
        "main": {
          controller: 'LoginController',
          controllerAs: 'vm',
          templateUrl: 'login/login.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    });
  }

  LoginController.$inject = ['$scope', 'noteService'];
  function LoginController($scope, noteService) {
    var vm = this;
    vm.username = "";
    vm.password = "";

    vm.login = login;

    function login() {
      noteService.login(vm.username, vm.password);
    }
  }

})(angular, document);
