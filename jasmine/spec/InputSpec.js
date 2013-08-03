

describe("the create input factory",function(){
  
  var InputDevice, stub, device
  
  device = {
    id : "test"
  }
  beforeEach(function(){
    App.MidiIO.start();    
    App.Midi.start();
    App.Midi.MIDIAccess = {'getInput':function(){}}
    sinon.stub(App.Midi.MIDIAccess,"getInput",function(device){return device;});
  });
  
  afterEach(function(){
    App.MidiIO.stop();
    //App.Patch.stop();
  
  });
  
  it("should return a patch model",function(){
    var new_input = App.MidiIO.create_input(device,1);   
    expect(new_input.get('title')).toBeDefined();
  });

  it('should return a patch model containing an connection_model collection',function(){
   var new_input = App.MidiIO.create_input(device,1);   
    expect(new_input.get('connections').model).toEqual(App.Connection.Model);    
  })  
  
  it("- the model collection should contain a single model",function(){
   var new_input = App.MidiIO.create_input(device,1);   
    expect(new_input.get('connections').length).toEqual(1);
  });

  it("-- the single model should be an 'output'",function(){
   var new_input = App.MidiIO.create_input(device,1);   
    expect(new_input.get('connections').at(0).get('type')).toEqual('output');
  });
  
  it("-- the single model should contain a stream",function(){
    var new_input = App.MidiIO.create_input(device,1);   
    expect(new_input.get('connections').at(0).get('stream')).toBeDefined();
  });

});