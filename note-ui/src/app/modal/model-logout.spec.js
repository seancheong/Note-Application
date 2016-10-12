describe( 'logout modal', function() {
  beforeEach( module('note-application.logout-confirm'));

  var LogoutConfirmationController, scope, uibModalInstance;

  beforeEach( inject( function( $controller, $rootScope ) {
    scope = $rootScope.$new();
    uibModalInstance = jasmine.createSpyObj('uibModalInstance', ['close', 'dismiss']);
    LogoutConfirmationController = $controller( 'LogoutConfirmationController', { $scope: scope, $uibModalInstance: uibModalInstance });
  }));

  it('should initialize the controller', inject( function() {
    expect( LogoutConfirmationController ).toBeTruthy();
  }));

  it('should return the correct modal instance methods', function() {
    scope.logout();
    expect(uibModalInstance.close).toHaveBeenCalledWith('logout');

    scope.cancel();
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });
});
