'use strict';

angular.module('angularApp', ['MidiIO','midiInput','Widgets','WidgetServicer','Puts','MainEngine'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
