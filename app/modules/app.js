App.module("Puts", function(Puts){
  App.addInitializer(function(options){

  	
  });
  
	App.vent.bindTo("",function(){

	})
	
//	console.log(Tids);

	App.Puts.Main = function(){
			    
	  InputsView = new Puts.InputsView({collection: App.Midi.Inputs});			
		OutputsView = new Puts.InputsView({collection: App.Midi.Outputs});			
	
		App.addRegions({
				SideBarRegion: "#sidebar"
				,MainRegion: "#main"
			});
							
			//App.SideBarRegion.show(View);
		App.MainRegion.show(OutputsView);
		App.SideBarRegion.show(InputsView);
	     
					  
		Axis = App.Midi.Inputs.where({name: "AXIS-49 2A",type:"input"});

		console.log('shit');
		
		App.Midi.Outputs.each(function(output){
			console.log('here it is');		
			console.log('output: ',output.get('name'));
		});	   		   	

    Loopmidi = App.Midi.Outputs.where({name: "loopMIDI Port"})[0];
    Loopmidi1 = App.Midi.Outputs.where({name: "loopMIDI Port 1"})[0];
    Loopmidi2 = App.Midi.Outputs.where({name: "loopMIDI Port 2"})[0];

    console.log(Loopmidi);
//   	Loopmidi2 = Puts.Outputs.where({name: "loopMIDI Port 1",type:"output"})[0];
//   	Loopmidi3 = Puts.Outputs.where({name: "loopMIDI Port 2",type:"output"})[0];

			Loopmidi.addInput(Axis[0]);
			Loopmidi1.addInput(Axis[1]);
			Loopmidi2.addInput(Axis[2]);
	
//			Loopmidi2.addInput(Axis[1]);
//			Loopmidi3.addInput(Axis[2]);
						       	
	}			

	
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