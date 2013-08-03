describe("the patch model", function() {


	describe("should create a subscribable stream ouput", function() {
		
		describe("a model", function() {
			var model;

			beforeEach(function() {
				App.Patches.start();
				model = new App.Patches.Patch({});
				});
			
			describe("when it's input stream value changes", function() {
					it("should change the output streaming from it.", function() {
						expect(model.output).toEqual(0);
						model.input.push(1);
						expect(model.output).toEqual(1);
						model.input.push(1);
						expect(model.output).toEqual(1);
						});
				});
		});
	});

	describe("should accept inputs", function() {
		
		});

	describe("should pass inputs to output stream", function() {
		
		});

	describe("should parse inputs with eval contents", function() {
		
		});

	describe("should contain other patches", function() {

		describe("should ", function() {
			
			});
		
		});

	});