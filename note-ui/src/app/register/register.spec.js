describe( 'register', function() {
  beforeEach( module('note-application.register'));
  beforeEach( module('note-application-project'));

  var RegisterController, scope, httpBackend, noteService;

  beforeEach( inject( function( $controller, $timeout, $location, $rootScope, $httpBackend, _noteService_ ) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    noteService = _noteService_;
    RegisterController = $controller( 'RegisterController', { $scope: scope, noteService: noteService });
  }));

  it('should initialize the controller', inject( function() {
    expect( RegisterController ).toBeTruthy();
  }));
});
