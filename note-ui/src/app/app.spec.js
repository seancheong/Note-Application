describe( 'AppCtrl', function() {
  describe( 'isCurrentUrl', function() {
    var AppCtrl, $location, $scope;

    beforeEach( module( 'note-application' ) );

    beforeEach( inject( function( $controller, _$location_, $rootScope ) {
      $location = _$location_;
      $scope = $rootScope.$new();
      AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
    }));

    it( 'should pass a dummy test', inject( function() {
      expect( AppCtrl ).toBeTruthy();
    }));
  });
});

describe('test note-application-project service', function() {

  beforeEach( module('note-application-project'));

  var noteService, scope, httpBackend, timeout, location;

  // API URLs
  var API_BASE = 'http://54.254.198.177:3000/api';
  var LIST_NOTES_URL = API_BASE + '/notes';
  var CREATE_NOTE_URL = API_BASE + '/note';
  var GET_NOTE_URL = API_BASE + '/note/testSubject';

  beforeEach( inject( function(_noteService_, $rootScope, $httpBackend, $timeout, $location) {
    noteService = _noteService_;
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    timeout = $timeout;
    location = $location;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should return all the correct notes when listNotes is called', function() {
    httpBackend.expectGET(LIST_NOTES_URL).respond(
      {
        "status": "success",
        "data": [
          {
            "subject": "first note",
            "content": "this is my first note",
            "version": 1
          },
          {
            "subject": "second note",
            "content": "this is my second note!",
            "version": 1
          },
          {
            "subject": "third note",
            "content": "this is my third note",
            "version": 1
          }
        ],
        "message": "Listed all notes"
      }
    );

    noteService.listNotes().then(function(notes) {
      expect(notes.length).toBe(3);

      expect(notes[0].subject).toBe("first note");
      expect(notes[0].content).toBe("this is my first note");

      expect(notes[1].subject).toBe("second note");
      expect(notes[1].content).toBe("this is my second note!");

      expect(notes[2].subject).toBe("third note");
      expect(notes[2].content).toBe("this is my third note");
    });
    httpBackend.flush();
  });

  it('should return error status when an error happens in listNotes', function() {
    httpBackend.expectGET(LIST_NOTES_URL).respond(500, '');

    noteService.listNotes().then(
      function(notes) {

      },
      function(error) {
        expect(error.status).toBe(500);
      }
    );
    httpBackend.flush();
  });

  it('should change location to home when createNote is called successfully', function() {
    var subject = "testSubject";
    var content = "testContent";

    httpBackend.expectPOST(CREATE_NOTE_URL).respond(
      {
        "status": "success",
        "message": "Created one note"
      }
    );

    spyOn(location, 'path');
    noteService.createNote(subject, content);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should not change location when createNote is returned failed', function() {
    var subject = "testSubject";
    var content = "testContent";

    httpBackend.expectPOST(CREATE_NOTE_URL).respond(500, '');

    spyOn(location, 'path');
    noteService.createNote(subject, content);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/home');
  });

  it('should change location to view-note when viewNote is called successfully', function() {
    var subject = "testSubject";

    httpBackend.expectGET(GET_NOTE_URL).respond(
      {
        "status": "success",
        "data": {
          "subject": "testSubject",
          "content": "this is my first note",
          "version": 1
        },
        "message": "Retrieved one note"
      }
    );

    spyOn(location, 'path');
    noteService.viewNote(subject);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/view-note');
    expect(noteService.getSelectedNote().subject).toBe("testSubject");
    expect(noteService.getSelectedNote().content).toBe("this is my first note");
    expect(noteService.getSelectedNote().version).toBe(1);
  });

  it('should not change location when viewNote is returned failed', function() {
    var subject = "testSubject";

    httpBackend.expectGET(GET_NOTE_URL).respond(500, '');

    spyOn(location, 'path');
    noteService.viewNote(subject);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/view-note');
  });
});
