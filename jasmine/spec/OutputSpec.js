describe("the create output factory",function(){
  
  var OutputDevice, device, new_output;
  
  device = {
    id : "test"
  }
  
  beforeEach(function(){
    App.MidiIO.start();    
    App.Patch.start();

    new_output = App.MidiIO.create_output(device,1);   
  });
  
  afterEach(function(){
    App.MidiIO.stop();
    App.Patch.stop();
  
  });
  
  it("should return a patch model",function(){
    expect(new_output.get('title')).toBeDefined();
  });

  it('should return a patch model containing an connection_model collection',function(){
    expect(new_output.get('connections').model).toEqual(App.Connection.Model);    
  });

  it("- the model collection should contain a single model",function(){
    expect(new_output.get('connections').length).toEqual(1);
  });

  it("- the single model should be an 'input'",function(){
    expect(new_output.get('connections').at(0).get('type')).toEqual('input');
  });
  describe("the input",function(){
    var stream, connection;
    beforeEach(function(){
      stream = Bacon.once("10");
      connection = new_output.get('connections').at(0);
      connection.get("onconnect")(stream);
      
    });
    it("should accept an event stream",function(){
      
    })
  })
});