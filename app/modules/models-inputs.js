App.module("Midi", function(Midi){

	Midi.Input = Backbone.Model.extend({
	  defaults: {
			title: "Input"
			,text: "nothing here yet"
			}
		,initialize: function(){

			//var input = Midi.MIDIAccess.getInput(MIdi.MIDIAccess.enumerateInputs()[this.get('index')]);
			/*
			if(input){
				input.addEventListener("midimessage",function(e){
		    	console.log(e.toString());         
		    	});        
			}else{console.log("null!")};
			*/
			
//				this.get('device').addEventListener("midimessage",function(e){
//		    	console.log(e.toString());         
//		    	});        
			
			this.stream = Bacon.fromEventTarget(this.get('device'),'midimessage');
			
			this.stream.onValue(function(val){
				console.log(val.toString());
			})
			//_.bind(this.addConnection,this);
		}
		,urlRoot: 'urlroot'
		,idAttribute: "_id"
		,addConnection: function(model){
			console.log(this.get('id'));
			console.log(model.get('id'));
			midiBridge.addConnection(this.get('id'),model.get('id'));
			this.set({connectedto:model});
			console.log('connected '+this.get('name')+' to '+model.get('name'));
		}
	});

	
	Midi.InputCollection = Backbone.Collection.extend({
		model : Midi.Input	
		,initialize : function(){
			this.on('add',function(){
				//console.log('item added');
			})
		}
	});

});


