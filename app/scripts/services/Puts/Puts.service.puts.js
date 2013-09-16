
'use strict';

angular.module('Puts')
	.factory('PutService',function(){

		function Input (name,id) {
			this.name = name;
			this.id = id;
			this.$$streamout = new Bacon.Bus();

			return this;
		}

		function Output (name,connection,id) {
			this.name = name;
			this.id = id;
			this.connection = connection;
			var streamin = this.$$streamin = new Bacon.Bus();
						
			var unsubscribe = this.unsubscribe  = {};

			this.subscribe = function(inputdevice){
				unsubscribe[inputdevice.id] = streamin.plug(inputdevice.streamout);
			};

			return this;
		}

		function PutsCollection (masterPuts) {
			var Inputs = this.Inputs =[];
			var Outputs = this.Outputs =[];

			this.addInput = function (name,id) {
				var input = masterPuts.addInput(name,id);
				Inputs.push(input);
				return input;

			}

			this.getNewInput = function(name){
				var input = masterPuts.getNewInput(name);
				Inputs.push(input);
				return input;

			}
			
			this.getInput = function(sourceId){
				var input = _.find(this.Inputs,function(input){
					return (input.id === sourceId);
				});
				return input;
			}

			this.addOutput = function(name,output,id){
				var output = masterPuts.addOutput(name,output,id);
				Outputs.push(output);
				return output;
			}

			this.getNewOutput = function(name,output){
				var output = masterPuts.getNewOutput(name,output);
				Outputs.push(output);
				return output;
			}
			
			this.getOutput = function(sourceId){
				var output = _.find(this.Outputs,function(output){
					return (output.id === sourceId);
				});
				return output;
			}
			return this;

		}

		function PutSvce () {

			var masterInputs = this.Inputs = [];
			var masterOutputs = this.Outputs = [];			

			this.getNewInput = function(name){
				var newInput = this.addInput(name,'Input-'+masterInputs.length);
				return newInput;
			}

			this.addInput = function (name, id) {
				var newInput = new Input(name,id);
				masterInputs.push(newInput);
				return newInput;
			}

			this.getNewOutput = function(name,output){
				var newOutput = new this.addOutput(name,'','Output-'+masterOutputs.length);
				return newOutput;
			};

			this.addOutput = function (name,output, id) {
				var newOutput = new Output(name,output,id);
				masterOutputs.push(newOutput);
				return newOutput;
			}

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

			this.getNewPutsCollection = function(){
				return new PutsCollection(this);
			};

			this.$$toJSON = function () {

				return angular.toJson(this);

			}
		}


		return new PutSvce; 


	})