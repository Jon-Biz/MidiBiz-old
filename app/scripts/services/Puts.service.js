
'use strict';
/*global midiBridge*/

var Puts = angular.module('Puts',[])
	.service('Puts',function () {
		var puts = {
			inputs : [],
			outputs : []
		}
		return puts;
	});