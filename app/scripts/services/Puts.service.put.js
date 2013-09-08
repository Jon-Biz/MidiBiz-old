angular.module('Puts')
	.service('Inputs',function(){

		var	Inputs = [];

		return {
			getInputs:function(){
				return Inputs;
			},
			getNewInput:function(name,streamout){

				var Input = {
					'name':name,
					'id': 'input-'+Inputs.length,
					'streamout':streamout
				} 

				Inputs.push(Input);

				return Input;
			}
		};
	}).service('Outputs',function(){

		var	Outputs = [];

		return {
			getOutputs:function(){
				return Outputs;
			},
			getNewOutput:function(name,output){

				var streamin = new Bacon.Bus();

				streamin.onValue(function(val){
					output(val);
				});

				var Output = {
					'name':name,
					'id': 'Output-'+Outputs.length,
					'streamin':streamin,
					'unsubscribe':{}
				} 

				Outputs.push(Output);

				return Output;
			}
		};
	})