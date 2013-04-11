/*! PROJECT_NAME - v0.1.0 - 2013-04-11
* http://PROJECT_WEBSITE/
* Copyright (c) 2013 YOUR_NAME; Licensed MIT */

var App= new Backbone.Marionette.Application();

AppController = {
	index: function(hash) {
			console.log('index triggered');
			App.Midi.ready.add(function(options){
				console.log('index resolving');
				App.Puts.Main();			
			});
  }
	,other: function(hash){
		console.log('other triggered');
	    }
			  
};

Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    "": "index",
    "other":"other"
  },
  controller: AppController
});


// Trigger the initial route and enable HTML5 History API support

App.bind("initialize:after", function(options){
  new Router();
 
  if (Backbone.history&&!this.debug){
 //   Backbone.history.start();
  }
});  


var App= new Backbone.Marionette.Application();


App.module("Puts", function(Puts){
  App.addInitializer(function(options){

  	
  });
  
	App.vent.bindTo("",function(){

	});
	
//	console.log(Tids);

	App.Puts.Main = function(){
		App.Midi.ready.add(function(){

			InputsView = new Puts.InputsView({collection: App.Midi.Inputs});			
			OutputsView = new Puts.InputsView({collection: App.Midi.Outputs});			
		
			App.addRegions({
				SideBarRegion: "#sidebar"
				,MainRegion: "#main"
			});
								
			App.MainRegion.show(OutputsView);
			App.SideBarRegion.show(InputsView);
			
			var Type2A = App.Midi.Inputs.where({name: "AXIS-49 2A",type:"input"});
			var USB = App.Midi.Inputs.where({name: "AXIS-49 USB Keyboard",type:"input"});

			var QUNEO = App.Midi.Inputs.where({name:"QUNEO",type:'input'});



			console.log('USB',USB.length);	

			
			var Axis = Type2A.concat(USB);

			console.log('axis length',Axis.length);	

			Loopmidi = App.Midi.Outputs.where({name: "loopMIDI Port"})[0];
			Loopmidi1 = App.Midi.Outputs.where({name: "loopMIDI Port 1"})[0];
			Loopmidi2 = App.Midi.Outputs.where({name: "loopMIDI Port 2"})[0];
			Loopmidi3 = App.Midi.Outputs.where({name: "loopMIDI Port 3"})[0];
		 
			Loopmidi.addInput(Axis[0]);	
			Loopmidi1.addInput(Axis[1]);
			Loopmidi2.addInput(Axis[2]);
			Loopmidi3.addInput(QUNEO[0]);
			
			
	});			
};
});

App.start();
/*
	 window.addEventListener('load', function () {
    

		    midiBridge.init({ 
		        
		        connectAllInputsToFirstOutput: false,
		        
		        ready: function(msg){
						    console.log('init ready');
		
								var contentDiv = $('#sidebar');
		
						 		Puts.InputDevices = new Puts.InputCollection();
		            contentDiv.innerHTML += "here it is" + msg + "<br/>";
		
		            var devices = midiBridge.getDevices();
		            for(var i = 0, max = devices.length; i < max; i++) {

										var device	= devices[i];
		            		console.log('type')
		            		console.log(device.output);
		            		if(device.type=="output"){
		            			console.log('triggering out note');
		            			//device.sendMIDIMessage(midiAccess.createMIDIMessage(midiBridge.NOTE_ON, 1, 48, 100));
		            		}
		                InputDevice = new Puts.Input({
		                	id			: device.id
		                	,type		: device.type
		                	,name		: device.name
		                	,descr		: device.descr
		                	,available : device.available
		                });
		                
		                Puts.InputDevices.add(InputDevice);
		                

		            }
		            
		            Axis = Puts.InputDevices.where({name: "AXIS-49 2A",type:"input"});
		           	Loopmidi = Puts.InputDevices.where({name: "loopMIDI Port",type:"output"})[0];
		           	Loopmidi1 = Puts.InputDevices.where({name: "loopMIDI Port 1",type:"output"})[0];
		           	Loopmidi2 = Puts.InputDevices.where({name: "loopMIDI Port 2",type:"output"})[0];


								Axis[0].addConnection(Loopmidi);
								Axis[1].addConnection(Loopmidi1);
								Axis[2].addConnection(Loopmidi2);

								InputsView = new Puts.InputsView({collection: Puts.InputDevices});			

								App.addRegions({
										MainRegion: "#main"
									});
												
								//App.SideBarRegion.show(View);
								App.MainRegion.show(InputsView);
						        
			            
		        },
		        error: function(msg) {
		            console.log(msg + "<br/>");
		        },
		        data: function(midiEvent) {
								console.log('data');
			          //console.log(midiEvent + "<br/>");
			          //Loopmidi.sendMIDIMessage(midiAccess.createMIDIMessage(midiBridge.NOTE_ON, 1, noteNumbers[e.which], 100));
			         // midiBridge.sendMidiEvent(midiBridge.NOTE_ON,1,84,100);
		        }        
		    });
		    		  },false);
 */

App.module("JsPlumb", function(JsPlumb){

	App.addInitializer(function(options){

  	
  });
  
	App.vent.bindTo("",function(){

	});
	
});

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



App.module("Midi", function(Midi){

	Midi.Output = Backbone.Model.extend({
	  defaults: {
			title: "Output"
			,text: "nothing here yet"
			}
		,initialize: function(){
			_.bind(this.addInput,this);
			_.bind(this.sendMIDIMessage,this);
			
		}
		,urlRoot: 'urlroot'
		,idAttribute: "_id"
		,addInput: function(model){
			
			console.log('adding connection...');
			console.log(this.get('id'));
			console.log(model.get('id'));
			
			this.set({input:model});
			
/*				model.stream.onValue(function(midiMessage){
					this.get('device').sendMIDIMessage(midiMessage);
				})
*/
			var that = this;
			model.stream.onValue(function(midiMessage){
				that.sendMIDIMessage(midiMessage);	
				console.log('out :',midiMessage.toString());
			});
		}
		,sendMIDIMessage: function(midiMessage){
			device = Midi.MIDIAccess.getOutput(Midi.MIDIAccess.enumerateOutputs()[this.get('index')]);
			device.sendMIDIMessage(midiMessage);
		}
	});

	Midi.OutputCollection = Backbone.Collection.extend({
		model : Midi.Output	
		,initialize : function(){
			this.on('add',function(){
				//console.log('item added');
			})
		}
	});

});



App.module("Puts", function(Puts){

	Puts.Input = Backbone.Model.extend({
	  defaults: {
			title: "Input"
			,text: "nothing here yet"
			}
		,initialize: function(){

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
			
			this.stream = Bacon.fromEventTarget(this.get('device'),'midimessage');
			
			stream.onValue(function(val){
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

	
	Puts.InputCollection = Backbone.Collection.extend({
		model : Puts.Input	
		,initialize : function(){
			this.on('add',function(){
				//console.log('item added');
			})
		}
	});

});



App.module("Puts", function(Puts){
	
	Puts.InputView = Backbone.Marionette.ItemView.extend({
		tagName:"div"
		,className:"view"
		,initialize:function(){		
				this.model.bind('change', this.render, this);
		}
		,template: "#view"
		,events: {
		}
		,onRender: function(){				
		}

	});
	
	Puts.InputsView = Backbone.Marionette.CollectionView.extend({
		itemView:Puts.InputView
		
	});
});