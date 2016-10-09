describe( 'view-note', function() {
  beforeEach( module('note-application.view-note'));
  beforeEach( module('note-application-project'));

  var ViewNoteController, scope, httpBackend, noteService;

  // API URLs
  var API_BASE = 'http://54.254.198.177:3000/api';
  var LIST_NOTES_URL = API_BASE + '/notes';
  var CREATE_NOTE_URL = API_BASE + '/note';

  beforeEach( inject( function( $controller, $timeout, $location, $rootScope, $httpBackend, _noteService_ ) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    noteService = _noteService_;
    ViewNoteController = $controller( 'ViewNoteController', { $scope: scope, noteService: noteService });
  }));

  it('should pass a dummy test', inject( function() {
    expect( ViewNoteController ).toBeTruthy();
  }));
});
