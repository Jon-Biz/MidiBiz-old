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

	describe("getNewwidget()",function(){

		beforeEach(function() {
		  var widget = widgets.getNewwidget();
		});
		it("should return an object", function() {
		  expect(widget.getNewWidget() instanceof Object).toBeTruthy();
		});

		xit("should contain an inputs, outputs and internal inputs and outputs objects", function() {
			expect(widget.inputs instanceof Object).toBeTruthy();		  
			expect(widget.outputs instanceof Object).toBeTruthy();		  
			expect(widget.int_inputs instanceof Object).toBeTruthy();		  
			expect(widget.int_outputs instanceof Object).toBeTruthy();		  

		});
	})
});