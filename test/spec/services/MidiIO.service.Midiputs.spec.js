describe("MidiIO config", function() {
  var Midiputs;
  var MidiService;

  beforeEach(function() {
	module('MidiIO');
	inject(function($injector){
		Midiputs = $injector.get('Midiputs');
	});
  });

	describe("Midiputs", function() {
		it("should be an object",function() {
		  expect(Midiputs instanceof Object).toBeTruthy();
		});

		it("should be a singleton", function() {
		  Midiputs.inputs.push('test');
		  var Midival2
		  inject(function ($injector) {
			  Midival2 = $injector.get('Midiputs');
		  });
		  expect(Midival2).toEqual(Midiputs);
		});

		describe("Midiputs.inputs", function() {

			it("should be an array", function() {
			  expect(Midiputs.inputs instanceof Array).toBeTruthy();
			});

		});

		describe("Midiputs.addinput()", function() {
		  beforeEach(function() {
		    jasmine.Clock.useMock();
		  });

		  //delayed until mock clock works in karma
		  xit("should add an input after 100ms", function() {
		    Midiputs.add_input("1");

		    expect(Midiputs.inputs.length).toEqual(0);
		    jasmine.Clock.tick(201);
		    expect(Midiputs.inputs.length).toEqual(1);
		  });
		});
	});
});