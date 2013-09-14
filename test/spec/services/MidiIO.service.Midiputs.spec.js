xdescribe("MidiIO config", function() {
  var Midiputs;
  var MidiService;
  var $timeout_;

  beforeEach(function($provider) {

  	module('Puts');
	module('MidiIO');
	inject(function($injector,$timeout,Puts){
		Midiputs = $injector.get('Midiputs',$timeout,Puts);

		$timeout_ =$injector.get('$timeout');

	});
  });

	describe("Midiputs", function() {

		it("should be an object containing an 'input' array and an 'output' array", function() {

		    expect(Midiputs instanceof Object).toBeTruthy();
		    expect(Midiputs.inputs instanceof Array).toBeTruthy();
		    expect(Midiputs.outputs instanceof Array).toBeTruthy();

		   });

		describe("addInput()", function() {
		  it("should add an input to the input array after the timeout is flushed", function() {
		    
		    Midiputs.addInput({'testinput':'test'});
		    expect(Midiputs.inputs.length).toEqual(0);
		    $timeout_.flush();
		    expect(Midiputs.inputs.length).toEqual(1);
		  });

		  it("should add an output to the output array after the timeout is flushed", function() {
		    
		    Midiputs.addOutput({'testoutput':'test'});
		    expect(Midiputs.outputs.length).toEqual(0);
		    $timeout_.flush();
		    expect(Midiputs.outputs.length).toEqual(1);
		  });
		});

	});
});