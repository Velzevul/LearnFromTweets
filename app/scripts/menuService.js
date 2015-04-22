angular.module('tweetsToSoftware')
    .factory('MenuService', function($http) {
       'use strict';

        var data = {
                menu: []
            },
            dataMap = {};

        $http.get('/data/menu.json')
            .success(function(response) {
                data.menu = response;

                function updateIndex(item, index, path) {
                    dataMap[item['label']] = {
                        index: index,
                        path: path,
                        object: item
                    };

                    if (item['children'] && item['children'].length > 0) {
                        angular.forEach(item['children'], function(child, childIndex) {
                            var childPath = angular.copy(path);

                            childPath.push(item['label']);
                            updateIndex(child, childIndex, childPath);
                        });
                    }
                }

                angular.forEach(data.menu, function(item, index) {
                    updateIndex(item, index, []);
                });
            });

        function getItemTree(itemLabel) {
            var result = [];

            if (dataMap[itemLabel]) {
                angular.forEach(dataMap[itemLabel].path, function(pathItem) {
                    result.push(dataMap[pathItem].object);
                });

                result.push(dataMap[itemLabel].object);
            }

            return result;
        }

        function deactivateAll() {
            angular.forEach(dataMap, function(item) {
                item.object.isActive = false;
            });
        }

        return {
            get: function() {
                return data.menu;
            },
            activate: function(itemLabel) {
                var itemTree = getItemTree(itemLabel),
                    result = false;

                deactivateAll();
                if (itemTree.length) {
                    angular.forEach(itemTree, function(item) {
                        item.isActive = true;
                    });

                    result = true;
                }

                return result;
            }
        };
    });