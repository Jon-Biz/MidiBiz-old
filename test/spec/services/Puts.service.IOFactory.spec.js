describe("the IOFactory", function() {
	var IOFactory;
	var $timeout;

	beforeEach(function() {
		module('Puts');
		inject(function($injector){
			IOFactory = $injector.get("IOFactory");
			$timeout= $injector.get('$timeout');
		});
	});

	describe("A new IOFactory() object", function() {

		var TestPuts;

		beforeEach(function() {
	  	  	TestPuts = new IOFactory.getPuts();

		});

		it("should be an object containing an 'input' array and an 'output' array", function() {

		    expect(TestPuts instanceof Object).toBeTruthy();
		    expect(TestPuts.inputs instanceof Array).toBeTruthy();
		    expect(TestPuts.outputs instanceof Array).toBeTruthy();
		});

	});
	  
});


