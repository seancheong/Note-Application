describe( 'register', function() {
  beforeEach( module('note-application.register'));
  beforeEach( module('note-application-project'));

  var RegisterController, scope, httpBackend, noteService;

  beforeEach( inject( function( $controller, $timeout, $location, $rootScope, $httpBackend ) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    noteService = jasmine.createSpyObj('noteService', ['register']);
    RegisterController = $controller( 'RegisterController', { $scope: scope, noteService: noteService });
  }));

  it('should initialize the controller', inject( function() {
    expect( RegisterController ).toBeTruthy();
  }));

  it('should call the register method of noteService if password is matched with passConfirm', function() {
    var password = 'testPassword';
    RegisterController.password = password;
    RegisterController.passwordConfirm = password;
    RegisterController.register();

    expect(noteService.register).toHaveBeenCalled();
  });

  it('should not call the register method of noteService if password is not matched with passConfirm', function() {
    RegisterController.password = 'testPassword';
    RegisterController.passwordConfirm = 'testPasswordConfirm';
    RegisterController.register();

    expect(noteService.register).not.toHaveBeenCalled();
  });
});
