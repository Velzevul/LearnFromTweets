angular.module('tweetsToSoftware')
    .factory('MenuService', function($http, $q) {
       'use strict';

        var menu = [],
            menuFlat = {},
            loaded = false,
            promise = null;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $q.all([
                        $http.get('/data/menu.json'),
                        $http.get('/data/commandRelevancy.json'),
                        $http.get('/data/commandVocabulary.json')
                    ])
                        .then(function(response) {
                            var relevancy   = response[1].data,
                                familiarity = response[2].data;

                            menu = response[0].data;

                            function updateMap(item, index, parents) {
                                if (parents.length == 0) {
                                    item.root = true;
                                }

                                var label = parents.length ? [parents[parents.length - 1], item['label']].join('/') : item['label'];

                                item.id          = label;
                                item.relevancy   = relevancy[label];
                                item.familiarity = familiarity[label];

                                menuFlat[label] = {
                                    index: index,
                                    parents: parents,
                                    object: item
                                };

                                if (item['children'] && item['children'].length > 0) {
                                    angular.forEach(item['children'], function(child, childIndex) {
                                        var childPath = angular.copy(parents);

                                        childPath.push(label);
                                        updateMap(child, childIndex, childPath);
                                    });
                                }
                            }

                            angular.forEach(menu, function(item, index) {
                                updateMap(item, index, []);
                            });

                            loaded = true;
                        });
                }

                res = promise;
            }

            return res;
        }

        function getItemTree(itemId) {
            var result = [];

            if (menuFlat[itemId]) {
                angular.forEach(menuFlat[itemId].parents, function(parent) {
                    result.push(menuFlat[parent].object);
                });

                result.push(menuFlat[itemId].object);
            }

            return result;
        }

        function deactivateAll() {
            angular.forEach(menuFlat, function(item) {
                item.object.isOpen = false;
                item.object.isHighlighted = false;
            });
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return menu;
                    });
            },
            getFlat: function() {
                return load()
                    .then(function() {
                       return menuFlat;
                    });
            },
            open: function(itemId) {
                var itemTree = getItemTree(itemId),
                    result = false;

                if (itemTree.length) {
                    deactivateAll();

                    angular.forEach(itemTree, function(item) {
                        item.isOpen = true;
                    });

                    result = true;
                }

                return result;
            },
            highlight: function(itemId) {
                var itemTree = getItemTree(itemId),
                    result = false;

                if (itemTree.length) {
                    angular.forEach(itemTree, function(item) {
                        item.isHighlighted = true;
                    });

                    result = true;
                }

                return result;
            },
            hideAll: function() {
                deactivateAll();
            }
        };
    });