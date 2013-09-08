angular.module('Puts')
	.service('Inputs',function(){

		var	Inputs = [];

		return {
			getNewInput:function(name,streamout){

				var Input = {
					'name':name,
					'id': 'input-'+Inputs.length,
					'streamout':streamout
				} 

				Inputs.push(Input);

				return Input;
			},
			getInputs:function(){
				return Inputs;
			},
			getInput:function(sourceId){
				var input = _.find(Inputs,function(input){
					return (input.id === sourceId);
				});
				return input;
			}

		};
	}).service('Outputs',function(){

		var	Outputs = [];

		return {
			getNewOutput:function(name,output){

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
					'id': 'Output-'+Outputs.length,
					'streamin':streamin,
					'subscribe': subscribe,
					'unsubscribe':unsubscribe
				} 

				Outputs.push(Output);

				return Output;
			},
			getOutputs:function(){
				return Outputs;
			},
			getOutput:function(targetId){

				var Output = _.find(Outputs,function(output){
					return (output.id === targetId);
				});

				return Output;
			}
		};
	})