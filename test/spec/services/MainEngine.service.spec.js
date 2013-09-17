describe("mainEngine", function() {
	var mainEngine;
	var factorySpy;
	var midiputsSpy;
  	beforeEach(function() {
    	module('Widgets');
	    module("MainEngine");

	    inject(function($injector){
	    	var engineFactory = $injector.get('engineFactory');
	    	factorySpy = sinon.spy(engineFactory,'getEngine')

	    	var midiputs = $injector.get("Midiputs");
	    	midiputsSpy = sinon.spy(midiputs,"getNewPutsCollection");

	    	mainEngine = $injector.get("mainEngine");
	    })

	});

	it("should be defined", function() {
    	expect(mainEngine).toBeDefined();
    });

    it("call engineFactory.getEngine", function() {
    	expect(factorySpy).toHaveBeenCalled();
    });

    it("call Midiputs.getNewPutsCollection()",function () {
    	expect(midiputsSpy).toHaveBeenCalled();
    })

    it("be an engine", function() {
      expect(mainEngine.$$master).toBeDefined();
      expect(mainEngine.IO).toBeDefined();
    });


});