angular.module('tweetsToSoftware')
    .factory('MenuService', function($http) {
       'use strict';

        var data = {
            menu: {}
        };

        $http.get('/data/menu.json')
            .success(function(response) {
                data.menu = response;
            });

        function findTarget(item) {
            var path = item.split('/'),
                target = null;

            if (Object.keys(data.menu)) {
                target = data.menu;

                angular.forEach(path, function(pathItem){
                    if (target[pathItem]) {
                        target = target[pathItem];
                    }
                });
            }

            return target;
        }

        function deactivateAll() {
            function deactivate(obj) {
                obj['_'].isActive = false;

                for (key in obj) {
                    if ((key != '_') && (obj.hasOwnProperty(key))) {
                        deactivate(obj[key]);
                    }
                }
            }
        }

        return {
            get: function() {
                return data.menu;
            },
            activate: function(item) {
                var target = findTarget(item),
                    result;

                if (target) {
                    deactivateAll();
                    target['_'].isActive = true;
                    result = true;
                } else {
                    result = false;
                }

                return result;
            }
        };
    });