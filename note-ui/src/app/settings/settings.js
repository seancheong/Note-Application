(function(angular, undefined) {
  'use strict';
  
  var _API_URL = {
    listNotesUrl: '/api/notes',
    createNoteUrl: '/api/note',
    getNoteUrl: '/api/view-note/{subject}',
    editNoteUrl: '/api/note',
    removeNoteUrl: '/api/delete-note',
    logoutUrl: '/users/logout',
    loginUrl: '/users/login',
    registerUrl: '/users/register'
  };

  var _DEPENDENCIES = [

  ];

  angular.module('note-application.settings', _DEPENDENCIES)
         .factory('SettingsService', SettingsService);

  function SettingsService() {
    return {
      getApiUrl: getApiUrl
    };

    function getApiUrl() {
      return _API_URL;
    }
  }

})(angular);
