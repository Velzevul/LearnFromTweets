angular.module('tweetsToSoftware')
    .factory('MenuService', function($http, $interval) {
       'use strict';

        var data = {
                menu: []
            },
            menuFlat = {};

        $http.get('/data/menu.json')
            .then(function(response) {
                data.menu = response.data;

                function updateMap(item, index, parents) {
                    var label = parents.length ? [parents[parents.length - 1], item['label']].join('/') : item['label'];

                    item.id = label;

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

                angular.forEach(data.menu, function(item, index) {
                    updateMap(item, index, []);
                });
            });

        function getItemTree(itemPath) {
            var result = [];

            if (menuFlat[itemPath]) {
                angular.forEach(menuFlat[itemPath].parents, function(parent) {
                    result.push(menuFlat[parent].object);
                });

                result.push(menuFlat[itemPath].object);
            }

            return result;
        }

        function deactivateAll() {
            angular.forEach(menuFlat, function(item) {
                item.object.isOpen = false;
            });
        }

        return {
            get: function() {
                return data;
            },
            open: function(itemPath) {
                var itemTree = getItemTree(itemPath),
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
            highlight: function(itemPath) {
                var itemTree = getItemTree(itemPath);

                angular.forEach(itemTree, function(item) {
                    item.isHighlighted = true;
                });
            },
            deactivate: function() {
                deactivateAll();
            }
        };
    });