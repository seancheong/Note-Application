describe( 'create-new', function() {
  beforeEach( module('note-application.create-new'));
  beforeEach( module('note-application-project'));

  var CreateNewController, scope, httpBackend, noteService;

  // API URLs
  var API_BASE = 'http://54.254.198.177:3000/api';
  var LIST_NOTES_URL = API_BASE + '/notes';
  var CREATE_NOTE_URL = API_BASE + '/note';

  beforeEach( inject( function( $controller, $timeout, $location, $rootScope, $httpBackend, _noteService_ ) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    noteService = _noteService_;
    CreateNewController = $controller( 'CreateNewController', { $scope: scope, noteService: noteService });
  }));

  it('should pass a dummy test', inject( function() {
    expect( CreateNewController ).toBeTruthy();
  }));
});
