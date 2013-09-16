
'use strict';

angular.module('Puts')
	.value('Input',function(name,streamout,id){
		this.name = name;
		this.id = 'Input-'+id;
		this.streamout = streamout;

		return this;

	})
	.value('Output',function(name,output,id){

		this.name = name;
		this.id = 'Output-'+id;

		this.streamin = new Bacon.Bus();

		this.streamin.onValue(function(val){
				output(val);
			});
		
		this.unsubscribe  = {};

		this.subscribe = function(inputdevice){
			unsubscribe[inputdevice.id] = streamin.plug(inputdevice.streamout);
		};

		return this;

	})
	.value('PutsCollection',function(masterPuts){
		var Inputs = this.Inputs =[];
		var Outputs = this.Outputs =[];

		this.addInput = function (name, streamout, id) {
			var input = masterPuts.addInput(name,streamout,id);
			Inputs.push(input);
			return input;

		}

		this.getNewInput = function(name,streamout){
			var input = masterPuts.getNewInput(name,streamout);
			Inputs.push(input);
			return input;

		}
		
		this.getInput = function(sourceId){
			var input = _.find(this.Inputs,function(input){
				return (input.id === sourceId);
			});
			return input;
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

	})
	.factory('PutService',function(Input,Output,PutsCollection){

		var masterInputs = this.Inputs = [];
		var masterOutputs = this.Outputs = [];			

		this.getNewInput = function(name,streamout){
			var newInput = this.addInput(name,streamout,masterInputs.length);
			return newInput;
		}

		this.addInput = function (name, streamout, id) {
			var newInput = new Input(name,streamout,id);
			masterInputs.push(newInput);
			return newInput;
		}

		this.getNewOutput = function(name,output){
			var newOutput = new this.addOutput(name,output,masterOutputs.length);
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

		this.fromJSON = function(JSON){
			var lit = angular.fromJson(JSON);

			_.each(lit.Inputs,function(Input){
				this.IO.getNewInput(Input.id)
			})

		}
		return this;


	})