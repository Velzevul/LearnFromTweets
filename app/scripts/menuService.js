angular.module('tweetsToSoftware')
    .factory('MenuService', function($http, $q) {
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
            promise;

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

        function deactivateAll(menu) {
            angular.forEach(menu.byId, function(item) {
                item.isOpen = false;
            });
        }

        return {
            loaded: promise,
            menu: menu,
            toolbar: toolbar,
            panelbar: panelbar,
            deactivate: deactivateAll,
            open: function(item, menu) {
                deactivateAll(menu);

                angular.forEach(item.parents, function(parent) {
                    parent.isOpen = true;
                });

                item.isOpen = true;
            }
        };
    });