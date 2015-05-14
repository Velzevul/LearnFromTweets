angular.module('tweetsToSoftware')
    .factory('FilterService', function($rootScope) {
        'use strict';

        var filters = {
                active: false,
                time: null,
                author: null,
                highlightRelevant: false,
                highlightUnfamiliar: false
            },
            relevancyThreshold = 85,
            familiarityThreshold = 20;

        return {
            matchTweet: function(tweet) {
                if (filters.time) {
                    if ((moment(tweet.published).minutes(0).toDate() <= filters.time.lower) ||
                        (moment(tweet.published).minutes(0).toDate() >= filters.time.upper)) {
                        return false;
                    }
                }

                if (filters.author) {
                    if (tweet.author.name != filters.author.name) {
                        return false;
                    }
                }

                if (filters.highlightRelevant) {
                    if (tweet.command.relevancy < relevancyThreshold) {
                        return false;
                    }
                }

                if (filters.highlightUnfamiliar) {
                    if (tweet.command.familiarity > familiarityThreshold) {
                        return false;
                    }
                }

                return true;
            },
            get: function() {
                return filters;
            }
        }
    });