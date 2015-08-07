angular.module('tweetsToSoftware')
  .factory('FilterService', function() {
    'use strict';

    return {
      postedAfter: moment().subtract(1, 'days').format(),
      bannedAuthors: {},
      bannedCommands: {},
      promotedAuthors: {},
      promotedCommands: {}
    };
  });