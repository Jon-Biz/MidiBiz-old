describe("Engine factory", function() {

	var engineFactory;
	var engine;
 	beforeEach(function() {

		module('Puts');
		module('WidgetServicer');
		inject(function($injector){
			var PutModule = $injector.get("PutService");
			var PutService = PutModule.getPutService();

			engineFactory = $injector.get('engineFactory');
			engine = engineFactory.getEngine();
		});
	});

	afterEach(function() {
	});

	describe("engineFactory.getEngine()", function() {
		
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
				  engine.IO.getNewInput("testinput");
				  engine.IO.getNewOutput("test");
				  
				});

				describe("engine.toJSON()", function() {

					var notEmptyEngine = {
						'IO':{
							'Inputs':[{"name":"testinput",
										"id":"Input-0",
									}],
							'Outputs':[{"name":"test",
										"id":"Output-0",
										"connection":"",
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

		});

		describe("when engine.fromJSON() is called", function() {

			var BusSpy;
			var AngularSpy;
			var InputSpy;
			var OutputSpy;
			var MachineSpy;
			var engineJSON = angular.toJson({
			'machine':{
						'IO':{
							'Inputs':[{
								"id":"Input-0",
								"name":"test_input"
							}],
							'Outputs':[{
								"id":"Output-0",
								"name": "test_output",
								"connection":"Input-0",
								"unsubscribe":{}
							}]
						},
						'Machines':[{
							"machine":{
								'Name':"Engine-1",
								'IO':{
									'Inputs':[{
										"id":"Input-1",
										"name":"test_input"
									}],
									'Outputs':[{
										"id":"Output-1",
										"name": "test_output",
										"unsubscribe":{}
									}]
								},
								'Machines':{}
							}
						}]
					}
				});

			beforeEach(function() {
				BusSpy = sinon.spy(Bacon,"Bus");
				InputSpy = sinon.spy(engine.IO,"addInput");
				OutputSpy = sinon.spy(engine.IO,"addOutput");

				engine.fromJson(engineJSON);

			
			});

			afterEach(function() {
			  BusSpy.restore();
			  InputSpy.restore();
			  OutputSpy.restore();
			});

			it("should call add engine.IO.addInputs once", function() {
			  expect(InputSpy).toHaveBeenCalledOnce();
			});

			it("should call add engine.IO.addOutputs once", function() {
			  expect(OutputSpy).toHaveBeenCalledOnce();
			});

			it("should add 1 to the length of IO.Inputs", function() {
				expect(engine.IO.Inputs.length).toEqual(1);
			});		   
			it("should add an input named 'test_input' to the IO.Inputs", function() {
				expect(engine.IO.Inputs[0].name).toEqual('test_input');
				});

			it("should add an output named 'test_Output' to the IO.Outputs", function() {
				expect(engine.IO.Outputs[0].name).toEqual('test_output');
				});

			it("should call a new Bacon.Bus for each input & output(four times)", function() {
			  expect(BusSpy).toHaveBeenCalled(4);
			});			

			it("should have added an unsubscribe function call 'Input-1' to the Outputs unsubscribe literal", function() {
			  expect(engine.IO.Outputs[0].unsubscribe['Input-0']).toBeDefined();
			});

			it("should have increased the length of machines by 1", function() {
			  	expect(engine.machines.length).toEqual(1);
			});

		});

		describe("when called again", function() {
		  
		  var engine2;

		  beforeEach(function() {
		    engine2 = engineFactory.getEngine();
		  });

		  it("should not share the same PutService", function() {

		    var input = engine2.IO.getNewInput('test');

		    expect(engine2.$$master.Inputs.length).toEqual(1);
		    expect(engine.$$master.Inputs.length).toEqual(0);

		  });
		});

	});




	
});