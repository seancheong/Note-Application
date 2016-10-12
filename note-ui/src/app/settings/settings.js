(function(angular, undefined) {
  'use strict';

  var _API_BASE = 'http://54.254.198.177:3000';

  var _DEPENDENCIES = [

  ];

  angular.module('note-application.settings', _DEPENDENCIES)
         .factory('SettingsService', SettingsService);

  function SettingsService() {
    return {
      getApiBase: getApiBase
    };

    function getApiBase() {
      return _API_BASE;
    }
  }

})(angular);
