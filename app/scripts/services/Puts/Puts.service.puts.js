
'use strict';

angular.module('Puts')
	.service('PutService',function(){

	var masterInputs = this.Inputs = [];
	var masterOutputs = this.Outputs = [];			

	this.getInput = function(sourceId){
		var input = _.find(this.Inputs,function(input){
			return (input.id === sourceId);
		});
		return input;
	}

	this.getOutput = function(sourceId){
		var output = _.find(this.Outputs,function(output){
			return (output.id === sourceId);
		});
		return output;
	}
	var getNewInput = this.getNewInput = function(name,streamout){

		var Input = {
			'name':name,
			'id': 'input-'+masterInputs.length,
			'streamout':streamout
		} 

		masterInputs.push(Input);
		return Input;
	}

	var getNewOutput = this.getNewOutput = function(name,output){

				var streamin = new Bacon.Bus()
				streamin.onValue(function(val){
						output(val);
					});
				
				var unsubscribe  = {};

				var subscribe = function(inputdevice){
					unsubscribe[inputdevice.id] = streamin.plug(inputdevice.streamout);
				};

				var Output = {
					'name':name,
					'id': 'Output-'+masterOutputs.length,
					'streamin':streamin,
					'subscribe': subscribe,
					'unsubscribe':unsubscribe
				} 

				masterOutputs.push(Output);

				return Output;
			};

	function PutsCollection (){
		var Inputs = this.Inputs =[];
		var Outputs = this.Outputs =[];

		this.getNewInput = function(name,streamout){
			var input = getNewInput(name,streamout);
			Inputs.push(input);
			return input;
		}
		
		this.getInput = function(sourceId){
			var input = _.find(this.Inputs,function(input){
				return (input.id === sourceId);
			});
			return input;
		},

		this.getNewOutput = function(name,output){
			var output = getNewOutput(name,output);
			Outputs.push(output);
			return output;
		}
		
		this.getOutput = function(sourceId){
			var output = _.find(this.Outputs,function(output){
				return (output.id === sourceId);
			});
			return output;
		}
	}

	this.getNewPutsCollection = function(){
		return new PutsCollection;
	};

	return this;

})