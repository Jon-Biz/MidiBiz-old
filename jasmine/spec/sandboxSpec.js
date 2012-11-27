xdescribe("A function",function(){
	
	beforeEach(function(){
		sinon.spy(jQuery, "ajax");
 	
	});
	
	afterEach(function(){
	       jQuery.ajax.restore(); // Unwraps the spy
 	
	});
	
	it("test should inspect jQuery.getJSON's usage of jQuery.ajax",function(){
	       jQuery.getJSON("/some/resource");

        expect("/some/resource").toEqual(jQuery.ajax.getCall(0).args[0].url);
        expect("json").toEqual(jQuery.ajax.getCall(0).args[0].dataType);
        expect(jQuery.ajax).toHaveBeenCalled();
        	
	});
})

xdescribe('',function(){
	
		beforeEach(function(){
			
		});
		
		afterEach(function(){
			
		});
		
		it('',function(){
			
		});
		
});