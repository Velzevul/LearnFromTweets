function Entry() {
  this.interestingTweetsFound = '';
  this.interestingTweetsDescription = '';
  this.newThingsLearnt = '';
  this.newThingsDescription = '';
  this.freeFormFeedback = '';

  this.errors = {};
}

Entry.prototype.isValid = function() {
  this.errors = {};

  if (this.interestingTweetsFound === '') {
    this.errors.interestingTweetsFound = 'have to choose one';
  }
  if (this.interestingTweetsDescription === '') {
    this.errors.interestingTweetsDescription = 'cannot be blank';
  }
  if (this.newThingsLearnt === '') {
    this.errors.newThingsLearnt = 'have to choose one';
  }
  if (this.newThingsDescription === '') {
    this.errors.newThingsDescription = 'cannot be blank';
  }

  console.log(this);

  return angular.equals(this.errors, {});
};

Entry.prototype.toJson = function() {
  return {
    interesting_tweets_found: this.interestingTweetsFound,
    interesting_tweets_description: this.interestingTweetsDescription,
    new_things_learnt: this.newThingsLearnt,
    new_things_description: this.newThingsDescription,
    free_form_feedback: this.freeFormFeedback
  }
};

angular.module('tweetsToSoftware')
  .controller('journalController', function(switterServer, currentParticipant, LoggerService,
                                            $scope, $http, $location) {
    'use strict';

    LoggerService.log('Enter journal page');

    $scope.entry = new Entry();
    $scope.participantId = currentParticipant;

    $scope.submit = function() {
      if ($scope.entry.isValid()) {
        var data = $scope.entry.toJson();

        data.participant_id = currentParticipant;
        data.created_at = moment().format();

        $http.post(switterServer + '/logger/journals', data)
          .then(function() {
            alert('thank you for you feedback!');
            $location.path('/');
          });
      }
    }
  });