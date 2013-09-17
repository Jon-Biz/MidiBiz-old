angular.module("MainEngine")
.service('mainEngine',function(engineFactory,Midiputs){
	var that = engineFactory.getEngine();
	var $$master = that.$$master = Midiputs;
	that.IO = that.$$master.IO;

	jsPlumb.ready(function(){

		jsPlumb.bind('connection', function(info) {

			var inputdevice = $$master.getInput(info.sourceId);
			var outputdevice = $$master.getOutput(info.targetId);

			console.log(info.sourceId, " to ", info.targetId);
			console.log(inputdevice.id, " to ", outputdevice.id);
			outputdevice.subscribe(inputdevice);

		});

		jsPlumb.bind('connectionDetached', function(info) {

			var inputdevice = $$master.getInput(info.sourceId);
			var outputdevice = $$master.getOutput(info.targetId);
			outputdevice.unsubscribe[inputdevice.id]();
		});

	});

	return that;
});

