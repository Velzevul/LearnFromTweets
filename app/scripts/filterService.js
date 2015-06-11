angular.module('tweetsToSoftware')
    .factory('FilterService', function() {
        'use strict';

        var filters = {
                time: null,
                highlightRelevant: false,
                highlightUnfamiliar: false
            };

        return {
            filters: filters,
            matchTweet: function(tweet) {
                if (filters.time) {
                    if ((tweet.published.toDate() <= filters.time.lower) ||
                        (tweet.published.toDate() >= filters.time.upper)) {
                        return false;
                    }
                }

                if (filters.highlightRelevant &&
                    !tweet.hasRelevant) {
                    return false;
                }

                if (filters.highlightUnfamiliar &&
                    !tweet.hasUnfamiliar) {
                    return false;
                }

                return true;
            }
        };
    });