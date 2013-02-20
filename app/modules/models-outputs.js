App.module("Midi", function(Midi){

	Midi.Output = Backbone.RelationalModel.extend({
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


