angular.module('tweetsToSoftware')
  .factory('FilterService', function() {
    'use strict';

    var filteredTweets = [];

    return {
      filteredTweets: filteredTweets,
      activeCommand: null,
      activeCommandLocation: null,
      bannedAuthors: {},
      bannedCommands: {},
      promotedAuthors: {},
      promotedCommands: {}
    };
  });