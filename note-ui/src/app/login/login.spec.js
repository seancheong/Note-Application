describe( 'login', function() {
  beforeEach( module('note-application.login'));
  beforeEach( module('note-application-project'));

  var LoginController, scope, httpBackend, noteService;

  beforeEach( inject( function( $controller, $timeout, $location, $rootScope, $httpBackend, _noteService_ ) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    noteService = _noteService_;
    LoginController = $controller( 'LoginController', { $scope: scope, noteService: noteService });
  }));

  it('should initialize the controller', inject( function() {
    expect( LoginController ).toBeTruthy();
  }));
});
