angular.module('tweetsToSoftware')
  .factory('LockService', function(currentParticipant, switterServer, $http) {
    'use strict';

    return {
      checkIfLocked: function(tweetId) {
        return $http.get(switterServer + '/api/locks/' + tweetId);
      },
      lock: function(tweetId) {
        var lock = {
            id: tweetId,
            user_id: currentParticipant
          };

        return $http.post(switterServer + '/api/locks', lock);
      }
    }
  });