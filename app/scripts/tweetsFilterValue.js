// TODO: change to service and push all the common filtering here
//       alternative: push users to UserService
//       another alternative: place user restrictions here...
angular.module('tweetsToSoftware')
    .value('TweetsFilter', {
        lowerTimeBound: null,
        upperTimeBound: null,
        author: null,
        active: true
    });