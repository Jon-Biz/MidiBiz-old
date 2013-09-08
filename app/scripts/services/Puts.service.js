
'use strict';

angular.module('Puts',[])
	.service('Puts',function () {
		var puts = {
			inputs : [],
			outputs : []
		};
		return puts;
	})
	.service('IOFactory',function($timeout){
		return{
			getPuts:function(){
				this.inputs = [];
				this.outputs = [];

				this.addInput = function (input) {
					var inputs = this.inputs;
					$timeout(function () {
						inputs.push(input);
					},100);
				};

				this.addOutput = function(output) {
					var outputs = this.outputs;
					$timeout(function () {
						outputs.push(output);
					},100);
				};

			}
		};
	});