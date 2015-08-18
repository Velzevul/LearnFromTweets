angular.module('tweetsToSoftware')
  .factory('FilterService', function() {
    'use strict';

    return {
      activeTweetId: null,
      selectedCommand: null,
      selectedMenu: null,
      renderUntil: moment(NOW).subtract(3, 'hours'),
      bannedAuthors: {},
      bannedCommands: {},
      promotedAuthors: {},
      promotedCommands: {}
    };
  });