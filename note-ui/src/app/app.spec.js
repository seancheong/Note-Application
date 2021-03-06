describe( 'AppCtrl', function() {
  describe( 'isCurrentUrl', function() {
    var AppCtrl, $location, $scope;

    beforeEach( module( 'note-application' ) );

    beforeEach( inject( function( $controller, _$location_, $rootScope ) {
      $location = _$location_;
      $scope = $rootScope.$new();
      AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
    }));

    it( 'should initialize the controller', inject( function() {
      expect( AppCtrl ).toBeTruthy();
    }));

    it('should set $scope.isLoggedIn to the correct value when userSession is broadcasted', function() {
      $scope.$broadcast('userSession', true);
      expect($scope.isLoggedIn).toBe(true);

      $scope.$broadcast('userSession', false);
      expect($scope.isLoggedIn).toBe(false);
    });
  });
});

describe('test note-application-project service', function() {

  beforeEach( module('note-application-project'));

  var noteService, SettingsService, scope, httpBackend, timeout, location;

  var API_BASE, LIST_NOTES_URL, CREATE_NOTE_URL, GET_NOTE_URL, EDIT_NOTE_URL, REMOVE_NOTE_URL, LOGOUT_URL, LOGIN_URL, REGISTER_URL;

  var subject = "testSubject";
  var content = "testContent";
  var username = "testuser";
  var password = "1234";

  beforeEach( inject( function(_noteService_, _SettingsService_, $rootScope, $httpBackend, $timeout, $location) {
    noteService = _noteService_;
    SettingsService = _SettingsService_;
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    timeout = $timeout;
    location = $location;

    // API URLs
    var API = SettingsService.getApiUrl();
    var LIST_NOTES_URL = API.listNotesUrl;
    var CREATE_NOTE_URL =  API.createNoteUrl;
    var GET_NOTE_URL =  API.getNoteUrl;
    var EDIT_NOTE_URL =  API.editNoteUrl;
    var REMOVE_NOTE_URL =  API.removeNoteUrl;
    var LOGOUT_URL =  API.logoutUrl;
    var LOGIN_URL =  API.loginUrl;
    var REGISTER_URL = API.registerUrl;

    spyOn(location, 'path');
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should redirect user to home page when backToHome is called', function() {
    noteService.backToHome();
    timeout.flush();
    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should return all the correct notes when listNotes is called', function() {
    httpBackend.expectPOST(LIST_NOTES_URL).respond(
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
    httpBackend.expectPOST(LIST_NOTES_URL).respond(500, '');

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
    httpBackend.expectPOST(CREATE_NOTE_URL).respond(
      {
        "status": "success",
        "message": "Created one note"
      }
    );

    noteService.createNote(subject, content);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should not change location when createNote is returned failed', function() {
    httpBackend.expectPOST(CREATE_NOTE_URL).respond(500, '');

    noteService.createNote(subject, content);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/home');
  });

  it('should change location to view-note when viewNote is called successfully', function() {
    httpBackend.expectPOST(GET_NOTE_URL).respond(
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

    noteService.viewNote(subject);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/view-note');
    expect(noteService.getSelectedNote().subject).toBe("testSubject");
    expect(noteService.getSelectedNote().content).toBe("this is my first note");
    expect(noteService.getSelectedNote().version).toBe(1);
  });

  it('should not change location when viewNote is returned failed', function() {
    httpBackend.expectPOST(GET_NOTE_URL).respond(500, '');

    noteService.viewNote(subject);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/view-note');
  });

  it('should change location to home when editNote is called successfully', function() {
    httpBackend.expectPUT(EDIT_NOTE_URL).respond(
      {
        "status": "success",
        "message": "Updated note"
      }
    );

    noteService.editNote(subject, content);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should not change location when editNote is returned failed', function() {
    httpBackend.expectPUT(EDIT_NOTE_URL).respond(500, '');

    noteService.editNote(subject, content);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/home');
  });

  it('should return the correct response when removeNote is called successfully', function() {
    httpBackend.expectPOST(REMOVE_NOTE_URL).respond(
      {
        "status": "success",
        "message": "Removed note"
      }
    );

    noteService.removeNote().then(function(response) {
      expect(response.status).toBe(200);
      expect(response.data.status).toBe("success");
      expect(response.data.message).toBe("Removed note");
    });
    httpBackend.flush();
  });

  it('should return error status when an error happens in removeNote', function() {
    httpBackend.expectPOST(REMOVE_NOTE_URL).respond(500, '');

    noteService.removeNote().then(
      function(notes) {

      },
      function(error) {
        expect(error.status).toBe(500);
      }
    );
    httpBackend.flush();
  });

  it('should redirect to home page when login is successful', function() {
    httpBackend.expectPOST(LOGIN_URL).respond(
      {
        "status": "success",
        "message": "Login successfully"
      }
    );

    noteService.login(username, password);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should not redirect to home page when login is unsuccessful', function() {
    httpBackend.expectPOST(LOGIN_URL).respond(500, '');

    noteService.login(username, password);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/home');
  });

  it('should redirect to home page when logout is successful', function() {
    httpBackend.expectPOST(LOGOUT_URL).respond(
      {
        "status": "success",
        "message": "Logout successfully"
      }
    );

    noteService.logout(username, password);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should not redirect to home page when logout is unsuccessful', function() {
    httpBackend.expectPOST(LOGOUT_URL).respond(500, '');

    noteService.logout(username, password);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/home');
  });

  it('should redirect to home page when register is successful', function() {
    httpBackend.expectPOST(REGISTER_URL).respond(
      {
        "status": "success",
        "message": "Register successfully"
      }
    );

    httpBackend.expectPOST(LOGIN_URL).respond(
      {
        "status": "success",
        "message": "Login successfully"
      }
    );

    noteService.register(username, password);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).toHaveBeenCalledWith('/home');
  });

  it('should not redirect to home page when register is unsuccessful', function() {
    httpBackend.expectPOST(REGISTER_URL).respond(500, '');

    noteService.register(username, password);
    httpBackend.flush();
    timeout.flush();

    expect(location.path).not.toHaveBeenCalledWith('/home');
  });
});
