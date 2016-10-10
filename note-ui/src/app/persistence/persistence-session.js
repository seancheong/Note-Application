(function(angular, storage, undefined) {
  'use strict';

  var _PROJ_KEY = 'NoteApp';

  var _DEPENDENCIES = [
    'ui.router'
  ];

  angular.module('note-application.persistence', _DEPENDENCIES)
         .factory('SessionPersistenceService', PersistenceServiceFactory);

  function PersistenceServiceFactory() {
    return {
      save: save,
      remove: remove,
      getUserSession: getUserSession
    };

    function save(username) {
      storage.setItem(_PROJ_KEY, username);
    }

    function remove() {
      storage.removeItem(_PROJ_KEY);
    }

    function getUserSession() {
      return storage.getItem(_PROJ_KEY);
    }
  }

})(angular, window.sessionStorage);
