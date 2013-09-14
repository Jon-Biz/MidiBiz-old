xdescribe("Widget Service", function() {

	var widget;
 	beforeEach(function() {
 		module('Puts');
		module('WidgetServicer');
		inject(function($injector){
			var puts = $injector.get('Puts');
			widget = $injector.get('widget');
			}
		);
	});

	xit("should contain inputs, outputs, int_inputs, int_outputs arrays", function() {

		expect(widget.inputs instanceof Array).toBeTruthy();			
		expect(widget.outputs instanceof Array).toBeTruthy();			
		expect(widget.internal.inputs instanceof Array).toBeTruthy();			
		expect(widget.internal.outputs instanceof Array).toBeTruthy();			
		expect(widget.internal.widgets instanceof Array).toBeTruthy();
	});

	
});