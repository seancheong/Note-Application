(function(angular) {
  'use strict';

  var _DEPENDENCIES = [
    'ui.bootstrap'
  ];

  angular.module('note-application.logout-confirm', _DEPENDENCIES)
         .controller('LogoutConfirmationController', LogoutConfirmationController);

  LogoutConfirmationController.$inject = ['$scope', '$uibModalInstance'];
  function LogoutConfirmationController($scope, $uibModalInstance) {
    $scope.logout = logout;
    $scope.cancel = cancel;

    function logout() {
      $uibModalInstance.close('logout');
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})(angular);
