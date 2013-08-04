describe("a model", function() {

			var model;

			beforeEach(function() {
				App.Patches.start();
				model = new App.Patches.Patch({});
				});

	describe("should create a subscribable stream output", function() {

		});

	describe("should accept input streams", function() {

			var incoming;
			beforeEach(function() {
				incoming = new Bacon.Bus();
				model.setInput(incoming);
				});

		describe("when it's 'setinput function is called with a bacon stream", function() {

			it("should change the output streaming from it.", function() {
				expect(model.output).toEqual(0);
				incoming.push(1);
				expect(model.output).toEqual(1);
				incoming.push(2);
				expect(model.output).toEqual(2);
				});
			});
		});

	describe("should pass inputs to output stream", function() {
		describe("when it's input stream value changes", function() {
			it("should change the output streaming from it.", function() {

				expect(model.output).toEqual(0);
				model.input.push(1);
				expect(model.output).toEqual(1);
				model.input.push(2);
				expect(model.output).toEqual(2);
				});
			});		
		});

	describe("should parse inputs with eval contents", function() {

		var incoming;
		beforeEach(function() {
			incoming = new Bacon.Bus();
			model.setInput(incoming);
			});

		describe("when func is changed to make output = event+1", function() {
			it("should return 4 when 3 is sent to input", function() {

					expect(model.output).toEqual(0);
					model.input.push(1);
					expect(model.output).toEqual(1);
					model.input.push(2);
					expect(model.output).toEqual(2);

					model.set({'func':"this.output = event.value+1"});
					model.input.push(3);
					expect(model.output).toEqual(4);


				});
			});
		
		});

	describe("should contain other patches", function() {

		describe("should ", function() {
			
			});
		
		});

	});