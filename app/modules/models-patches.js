App.module("Patches", function(Patches){

	Patches.Patch = Backbone.Model.extend({
	  defaults: {
			title: "Patch"
			,text: "nothing here yet"
			,value: "0"
			}
		,initialize: function(){

			this.input = new Bacon.Bus();

			this.output = 0;
			var that = this;
			this.input.subscribe(function(event){
				that.output = event.value;
			})

			//var input = Puts.MIDIAccess.getInput(Puts.MIDIAccess.enumerateInputs()[this.get('index')]);
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
			
			// this.stream = Bacon.fromEventTarget(this.get('value'),'midimessage');
			
			// this.stream.onValue(function(val){
			// 	console.log(val.toString());
			// })
			//_.bind(this.addConnection,this);
		}
		,urlRoot: 'urlroot'
		,idAttribute: "_id"
		,addConnection: function(model){
			this.set({connectedto:model});
			console.log('connected '+this.get('name')+' to '+model.get('name'));
		}
	});

	
	Patches.PatchCollection = Backbone.Collection.extend({
		model : Patches.Patch	
		,initialize : function(){
			this.on('add',function(){
				//console.log('item added');
			})
		}
	});

});


