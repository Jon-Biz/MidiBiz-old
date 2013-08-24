App.module("MidiIO", function(MidiIO) {
  
  MidiIO.create_input = function(device,index){
    var Input = new App.Midi.Input({
        id      : device.Id
        ,index  : index
        ,type   : device.deviceType
        ,name   : device.deviceName
    });
    var Input_connection = new App.Connection.Model({ 
        type: "output"
        ,stream: Bacon.fromEventTarget(App.Midi.MIDIAccess.getInput(device),'midimessage')
        ,options:{
            isSource : true,
            anchor : "Bottom"
          }
    });
    
    Input.get('connections').push(Input_connection);

    return Input;
  }

  MidiIO.create_output = function(device,index){
    var Output = new App.Patch.Model({
        id      : device.Id
        ,index  : index
        ,type   : device.deviceType
        ,name   : device.deviceName
    });
    
    var Output_connection = new App.Connection.Model({ 
      type: "input"
      ,'index':index
      ,onconnect : function(stream){
        stream.onValue(function(val){
          device = Midi.MIDIAccess.getOutput(Midi.MIDIAccess.enumerateOutputs()[this.get('index')]);
          device.sendMIDIMessage(val)});
      }
      ,options:{
        isTarget : true,
        anchor : "Bottom"
        }
      });
    
    Output.get('connections').push(Output_connection);

    return Output;
    }
    
    /*model.stream.onValue(function(val){
          console.log(val.toString());
    });*/

});
      
