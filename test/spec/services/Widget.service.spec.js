describe("Widget Service", function() {

	var widgets;
 	beforeEach(function() {
 		module('Puts');
		module('WidgetServicer');
		inject(function($injector){

			var puts = $injector.get('Puts');

			widgets = $injector.get('widgets',puts);
			}
		);
	});

	describe("widgets", function() {
		it("should be an arrray", function() {
		  expect(widgets.widgets instanceof Array).toBeTruthy();
		});
	});
});