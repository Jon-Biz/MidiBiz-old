App.module("Midi", function(Midi){

	App.Midi.ready = new Backbone.Marionette.Callbacks();
	
	Midi.Inputs = new Midi.InputCollection();		    	
	Midi.Outputs = new Midi.OutputCollection();

	App.addInitializer(function(options){

		window.addEventListener('load', function() {
		    
	    var devices = document.getElementById("devices"),
	    messages = document.getElementById("messages");  
	    
	    midiBridge.init(function(MIDIAccess){

	    	Midi.MIDIAccess = MIDIAccess;				    	
	
	      devices.innerHTML += "<div>Input length is "+MIDIAccess.enumerateInputs().length+"</div>";
	      devices.innerHTML += "<div>Output length is "+MIDIAccess.enumerateOutputs().length+"</div>";
	
				_.each(MIDIAccess.enumerateInputs(),function(device,index){

			  	var namesplit = device.deviceName.split("");
					var name = "";
			  	for(var i=0;i<8;i++){
			  		name = name + namesplit[i];
			  	}
			  			  	
			  	if(name != 'loopMIDI'){
			  	console.log('here');
				  	InputDevice = new Midi.Input({
				        	id			: device.Id
				        	,index	: index
				        	,type		: device.deviceType
				        	,name		: device.deviceName
				        	,device : MIDIAccess.getInput(device)
				        });
				        
				    Midi.Inputs.add(InputDevice);
			  		
			  	};
			
			  });
	
		
			  _.each(MIDIAccess.enumerateOutputs(),function(device,index){
			  	console.log('thenthis');
			
					if(device.deviceName != "Microsoft GS Wavetable Synth"){
							
			    	OutputDevice = new Midi.Output({
			        	id			: device.Id
			        	,index	: index
			        	,type		: device.deviceType
			        	,name		: device.deviceName
			        	,descr		: device.deviceDescr
			        	,available : device.deviceAvailable
			          });
							          
			      Midi.Outputs.add(OutputDevice);
			      midiMessage = MIDIAccess.createMIDIMessage(midiBridge.NOTE_ON, 1, 48, 100);
						OutputDevice.sendMIDIMessage(midiMessage);
	
					}
			  });  
			  
  			console.log("midi ready");
		
				App.Midi.ready.run();

			});           
		});	
	});
});