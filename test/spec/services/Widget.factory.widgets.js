describe("Engine factory", function() {

	var engine;
 	beforeEach(function() {

		module('Puts');
		module('WidgetServicer');
		inject(function($injector){
			var PutService = $injector.get('PutService');
			engine = $injector.get('engineFactory');
		});
	});

	afterEach(function() {
	});

	describe("engineFactory", function() {
		
		it("should return an engine", function() {
		  expect(engine).not.toBeNull();
		});

		it("should contain a Puts service", function() {
			var Puts = engine.$$master;
			expect(Puts).not.toBeNull();			
			expect(Puts.Inputs instanceof Array).toBeTruthy();
			expect(Puts.Outputs instanceof Array).toBeTruthy();
		});
		it("should contain an IO Putcollection", function() {
			expect(engine.IO.Inputs instanceof Array).toBeTruthy();
			expect(engine.IO.Outputs instanceof Array).toBeTruthy();
		});

		describe("when an input is added to the IO Inputs", function() {

			beforeEach(function() {
			  engine.IO.getNewInput();
			  
			});

		  it("the IO.Inputs and Puts.master.Inputs length should both be 1", function() {
		    expect(engine.IO.Inputs.length).toEqual(1);
		    expect(engine.$$master.Inputs.length).toEqual(1);
		  });
		});

		it("should contain a PutCollection called IO", function() {
		  expect(engine.IO).toBeDefined();
		  expect(engine.IO.Inputs instanceof Array).toBeTruthy();
		  expect(engine.IO.Outputs instanceof Array).toBeTruthy();
		});

		
		it("should contain a machines Array", function() {
		  expect(engine.machines).toBeDefined();
		  expect(engine.machines instanceof Array).toBeTruthy();
		});

		describe("engine.toJSON()", function() {

			var emptyEngine = {
				'IO':{
					'Inputs':[],
					'Outputs':[]
				},
				'machines':[]

			};

			var emptyEngineJson = angular.toJson(emptyEngine);

		  it("should return an Json string representing the IO and machines arrays", function() {

			expect(engine.$$toJson()).toEqual(emptyEngineJson);

		  });

		describe("when an input and output is added", function() {

			beforeEach(function() {
			  engine.IO.getNewInput();
			  engine.IO.getNewOutput();
			  
			});

			describe("engine.toJSON()", function() {

				var notEmptyEngine = {
					'IO':{
						'Inputs':[{"id":"Input-0"}],
						'Outputs':[{"id":"Output-0",
									"streamin":{},
									"unsubscribe":{}
								}]
					},
					'machines':[]
				};

				var notEmptyEngineJson = angular.toJson(notEmptyEngine);

			  it("should return an Json string representing the IO and machines arrays", function() {

				expect(engine.$$toJson()).toEqual(notEmptyEngineJson);

			  });

			});
		});

		xdescribe("when engine.fromJSON() is called", function() {

			var engineJSON = angular.toJson({
				'IO':{
						'Inputs':[{"id":"Input-0"}],
						'Outputs':[{"id":"Output-0",
									"streamin":{},
									"unsubscribe":{}
								}]
					},
					'machines':[]
				});

			it("should add 1 to the length of IO.Inputs", function() {
				expect(engine.IO.Inputs.length).toEqual(0);
				engine.fromJSON(engineJSON)
				expect(engine.IO.Inputs.length).toEqual(1);
					     
			});		   
		 });
	});


	});




	
});