
'use strict';

/* global Bacon,_ */

/**
* WidgetServicer
*
* Delivers widgets
*/
angular.module('WidgetServicer', [])
	.service('widgets',function (Puts) {

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
	.factory('widget',function(){

		this.inputs = [];
		this.outputs = [];
		this.internal = {
			inputs:[],
			outputs:[],
			widgets:[]
		}
		return this;

	});;