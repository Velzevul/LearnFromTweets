angular.module('tweetsToSoftware')
    .factory('LoggerService', function(switterServer, $http) {
        'use strict';

        return{
            log: function(msg){
                console.log(msg)
            }
        }
    });