App.module("Patches", function(Patches){

	Patches.Patch = Backbone.Model.extend({
	  defaults: {
			title: "Patch"
			,text: "nothing here yet"
			,value: "0"
			,func: "this.output = event.value"
			}
		,initialize: function(){
			_.bind(this.defaultfunc,this);

			this.input = new Bacon.Bus();
			this.output = 0;
			this.setOutput();

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
		,setOutput :function(){
			var that = this;
			this.input.subscribe(function(event){
				that.defaultfunc(event);
				});
			
			}
		,defaultfunc:function(event){
				eval(this.get('func'));
			}	
		,urlRoot: 'urlroot'
		,idAttribute: "_id"
		,setInput : function(input){
			this.unplug =	this.input.plug(input);
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


