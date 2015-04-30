angular.module('tweetsToSoftware')
    .value('TweetsFilter', {
        lowerTimeBound: null,
        upperTimeBound: null,
        authors: [],
        active: true
    });