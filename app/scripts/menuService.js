angular.module('tweetsToSoftware')
    .factory('MenuService', function($timeout, $http, $q) {
       'use strict';

        var menu = {
                all: [],
                byId: {}
            },
            toolbar = {
                all: [],
                byId: {}
            },
            panelbar = {
                all: [],
                byId: {}
            },
            promise,
            showTweetsDelay = 400,
            hideTweetsDelay = 20;

        promise = $q.all([
            $http.get('/data/menu.json'),
            $http.get('/data/tools.json'),
            $http.get('/data/panels.json')
        ])
            .then(function(response) {
                menu.all = response[0].data;
                toolbar.all = response[1].data;
                panelbar.all = response[2].data;

                populateIdMap(menu.all, menu.byId, []);
                populateIdMap(toolbar.all, toolbar.byId, []);
                populateIdMap(panelbar.all, panelbar.byId, []);
            });

        function populateIdMap(all, byId, parents) {
            angular.forEach(all, function(one) {
                if (!one.divider) {
                    one.parents = parents;

                    if (byId[one.id]) {
                        console.error('entry already exists:', byId[one.id], one);
                    } else {
                        byId[one.id] = one;
                    }

                    if (one.children) {
                        var childParents = [];
                        angular.forEach(parents, function(parent) {
                            childParents.push(parent);
                        });
                        childParents.push(one);

                        populateIdMap(one.children, byId, childParents);
                    }
                }
            });
        }

        function reset(menu) {
            angular.forEach(menu.byId, function(item) {
                item.isOpen = false;
                item.tweetsShown = false;
            });
        }

        return {
            loaded: promise,
            menu: menu,
            toolbar: toolbar,
            panelbar: panelbar,
            reset: reset,
            resetAll: function() {
                reset(menu);
                reset(toolbar);
                reset(panelbar);
            },
            open: function(item, menu) {
                reset(menu);

                angular.forEach(item.parents, function(parent) {
                    parent.isOpen = true;
                });

                item.isOpen = true;
            },
            showTweets: function(item, showDelay) {
                if (showDelay === undefined) {
                    showDelay = showTweetsDelay;
                }

                clearTimeout(item.showTweetsTimeoutId);
                clearTimeout(item.hideTweetsTimeoutId);

                item.showTweetsTimeoutId = $timeout(function() {
                    item.tweetsShown = true;
                }, showDelay).$$timeoutId;
            },
            hideTweets: function(item) {
                clearTimeout(item.showTweetsTimeoutId);
                clearTimeout(item.hideTweetsTimeoutId);

                item.hideTweetsTimeoutId = $timeout(function () {
                    item.tweetsShown = false;
                }, hideTweetsDelay).$$timeoutId;
            },
            registerTweet: function(tweet, menuItemId, menu) {
                var menuItem = menu.byId[menuItemId];

                menuItem.tweets.push(tweet);

                angular.forEach(menuItem.parents, function(parent) {
                    parent.tweets.push(tweet);
                });
            },
            resetTweets: function() {
                angular.forEach(menu.byId, function(menuItem) {
                     menuItem.tweets = [];
                });

                angular.forEach(toolbar.byId, function(tool) {
                    tool.tweets = [];
                });

                angular.forEach(panelbar.byId, function(panel) {
                    panel.tweets = [];
                });
            }
        };
    });