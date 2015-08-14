angular.module('tweetsToSoftware')
  .factory('FilterService', function() {
    'use strict';

    return {
      activeCommand: null,
      activeCommandLocation: null,
      bannedAuthors: {},
      bannedCommands: {},
      promotedAuthors: {},
      promotedCommands: {}
    };
  });