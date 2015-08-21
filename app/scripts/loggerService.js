function Log(data) {
  this.message = data.msg;
  this.participant_id = data.participantId;
  this.created_at = moment().format();
}

angular.module('tweetsToSoftware')
  .factory('LoggerService', function(currentParticipant, switterServer,
                                     $http) {
    'use strict';

    return {
      log: function(msg) {
        var log = new Log({
          msg: msg,
          participantId: currentParticipant
        });

        $http.post(switterServer + '/logger/logs', log);
      }
    }
  });