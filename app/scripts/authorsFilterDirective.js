angular.module('tweetsToSoftware')
    .directive('authorsFilter', function() {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/authorsFilter.html',
            scope: {},
            controller: function($scope) {
                $scope.authors = [
                    {
                        "name": "volod",
                        "avatar": "https://pbs.twimg.com/profile_images/481030178227752960/DtpVP2_4_bigger.png",
                        "tweetsCount": 12,
                        "isFollowed": true
                    },
                    {
                        "name": "yassinebentaieb",
                        "avatar": "https://pbs.twimg.com/profile_images/1617898274/yassinebentaieb_bigger.png",
                        "tweetsCount": 9,
                        "isFollowed": false
                    },
                    {
                        "name": "chriscoyer",
                        "avatar": "https://pbs.twimg.com/profile_images/550841435831173120/fSk-hlgT_bigger.jpeg",
                        "tweetsCount": 4,
                        "isFollowed": true
                    },
                    {
                        "name": "volod",
                        "avatar": "https://pbs.twimg.com/profile_images/481030178227752960/DtpVP2_4_bigger.png",
                        "tweetsCount": 3,
                        "isFollowed": true
                    },
                    {
                        "name": "yassinebentaieb",
                        "avatar": "https://pbs.twimg.com/profile_images/1617898274/yassinebentaieb_bigger.png",
                        "tweetsCount": 1,
                        "isFollowed": false
                    },
                    {
                        "name": "chriscoyer",
                        "avatar": "https://pbs.twimg.com/profile_images/550841435831173120/fSk-hlgT_bigger.jpeg",
                        "tweetsCount": 1,
                        "isFollowed": true
                    }
                ];

                $scope.selectAuthor = function(author) {
                    if ($scope.selectedAuthor == author) {
                        $scope.selectedAuthor = null;
                    } else {
                        $scope.selectedAuthor = author;
                    }
                };

                $scope.toggleFollow = function(e, author) {
                    e.stopPropagation();
                    author.isFollowed = !author.isFollowed;
                };
            }
        }
    });