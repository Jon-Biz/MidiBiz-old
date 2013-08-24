"the pluggable interface"

"the patch object"
	"with two models"
	"and 2 input and outputs"
	"should show the input and output collections"		
	"should show the patch collection"

describe("the input and output collections", function() {

});

describe("the patch collection", function(){
	"with two models"
	"when rendered"
		"should show two views"
		"should show their input and out put connection doms"
		"when connected"
			"should deliver the output of model 1 to the input of model 2"
			"when disconnected"
				"should no longer deliver the output"
	})
describe("the patch view", function() {
	describe("when rendered", function() {

		beforeEach(function() {
			App.Patches.start();
			model = new App.Patches.Patch({});

			var id = affix("#patchviewid");


			App.View.start();
			view = new App.View.Patch({'model':model,'el':id});
			view.render();

			});
		it("should show on the DOM", function() {

			expect($('#patchviewid').html()).not.toEqual('');
			});
		describe("it should have an input and an output", function() {
			
			});
		});
	describe("when two are rendered", function() {
		describe("and connected ", function() {
			describe("the second's model should be subscribed to the first", function() {
				
				});
			describe("and when disconnected", function() {
				describe("the second's model should no longer be subscribed to the first", function() {
					
					});			
				});
			});
		});
	});