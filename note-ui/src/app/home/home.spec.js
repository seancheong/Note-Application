/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'home', function() {
  beforeEach( module('note-application.home'));
  beforeEach( module('note-application-project'));

  var HomeController, timeout, location, scope, httpBackend, noteService, SettingsService;

  var API_BASE, LIST_NOTES_URL;

  var testNotes = ['testNote1', 'testNote2'];

  beforeEach( inject( function( $controller, $timeout, $location, $rootScope, $httpBackend, _noteService_, _SettingsService_ ) {
    timeout = $timeout;
    location = $location;
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    noteService = _noteService_;
    SettingsService = _SettingsService_;
    HomeController = $controller( 'HomeController', { $timeout: timeout, $location: location, $scope: scope, noteService: noteService });

    // API URLs
    LIST_NOTES_URL = SettingsService.getApiUrl().listNotesUrl;
  }));

  it('should initialize the controller', inject( function() {
    expect( HomeController ).toBeTruthy();
  }));

  it('should go to create-new page when goToCreateNew is called', function() {
    httpBackend.expectPOST(LIST_NOTES_URL).respond(500, '');

    spyOn(location, 'path');
    HomeController.goToCreateNew();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/create-new');
  });

  it('should empty the notes when userSession is broadcasted with false', function() {
    HomeController.notes = testNotes;

    scope.$broadcast('userSession', false);
    expect(HomeController.notes.length).toBe(0);
  });

  it('should not empty the notes when userSession is broadcasted with true', function() {
    HomeController.notes = testNotes;

    scope.$broadcast('userSession', true);
    expect(HomeController.notes.length).toBe(2);
    expect(HomeController.notes[0]).toBe('testNote1');
    expect(HomeController.notes[1]).toBe('testNote2');
  });
});
