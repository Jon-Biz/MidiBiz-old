
'use strict';

var MidiIO = angular.module('MidiIO',['Puts']);

angular.module('Puts',[]);
angular.module('WidgetServicer',[]);
angular.module('MainEngine',['MidiIO','WidgetServicer']);
