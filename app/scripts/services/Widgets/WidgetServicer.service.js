
'use strict';

/* global Bacon,_ */

/**
* WidgetServicer
*
* Delivers widgets
*/
angular.module('WidgetServicer', ['Puts'])
	.service('widgets',function () {

		var inputs = [];
		var outputs = [];
		var Widgetmaker = function(id, transpose){
			var streamin = this.streamin = new Bacon.Bus();

			this.streamout = new Bacon.EventStream(function(subscriber){
					streamin.onValue(function(val){
						val.NOTE = val.NOTE + transpose;
						subscriber(new Bacon.Next(val));
					});
					return function(){};
				});

			this.id= 'widget'+id;
			this.transpose= transpose;
			this.name='transpose:'+id;
			this.unsubscribe={};

			return this;

		};

		var widgets = {widgets:[]};

		for (var i = 1; i < 13; i++) {
			widgets.widgets.push(new Widgetmaker(i,i));
		}

		_.each(widgets.widgets,function(widget){

				inputs.push(widget);
				outputs.push(widget);

			});

		return widgets;
	})
	.service('engineFactory',function(PutService){

		function machine (PutSvce) {
			this.IO = PutSvce.getNewPutsCollection();
			return this;
		}

		function engine(){
			var that = new machine;

			var Puts = PutService.getPutService();

			var that = new machine(Puts);

			that.$$master = Puts;


			that.$$toJson = function(){
				return angular.toJson(this);
			}

			that.fromJson = function (JSON) {
				var widgets = angular.fromJson(JSON);

				angular.forEach(widgets, function (widget) {
		
					angular.forEach(widget.Inputs, function(Input, key){
						this.IO.addInput(Input.name,Input.id)
					},that);

					angular.forEach(widget.Outputs, function(Output, key){
						var Output = this.IO.addOutput(Output.name,Output.connection,Output.id)
					
						var Input = this.$$master.getInput(Output.connection);
						if(Input){Output.subscribe(Input)};

					},that);

					angular.forEach(widget.Machines,function (Machine,key) {
						// body...
					})
				})
			}

			return that;
		}

		return new engine;
	});