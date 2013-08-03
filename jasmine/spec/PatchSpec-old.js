describe("A Patch",function(){
  
  beforeEach(function(){
    App.Patch.start();
    Patch = new App.Patch.Model({});
  });
  
  afterEach(function(){
    App.Patch.stop();
  });
  
  describe("When a 'input' connection model is added to it's connections",function(){
    var Input_connection;
    
    beforeEach(function(){
      var Input_connection = new App.Connection.Model({"type":"input"});    
    })
  
    it("it should be retreivable in an array from the models  'inputs function'",function(){
  
      Patch.get('connections').push(Input_connection);
      expect(Patch.inputs()[0]).toEqual(Input_connection);
  
    });    
  });

  describe("When a 'output' connection model is added to it's connections",function(){
    var Output_connection;
    
    beforeEach(function(){
      var Output_connection = new App.Connection.Model({"type":"output"});    
    })
  
    it("it should be retreivable in an array from the models  'outputs function'",function(){
  
      Patch.get('connections').push(Output_connection);
      expect(Patch.outputs()[0]).toEqual(Output_connection);
  
    });    
  });

});
