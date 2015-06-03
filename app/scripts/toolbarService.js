angular.module('tweetsToSoftware')
    .factory('ToolbarService', function($q, $http) {
        'use strict';

        var toolbars = {},
            promise;

        promise = $q.all([
            $http.get('/data/tools-toolbar.json')
        ])
            .then(function(response) {
                toolbars.tools = response[0].data;
            });

        return {
            loaded: promise,
            toolbars: toolbars
        };
    });