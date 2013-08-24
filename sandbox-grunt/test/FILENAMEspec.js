describe("an x equal of one",function(){
	var x;
	When(function(){x = 1});
	Then(function(){
		expect(x).toEqual(1);
	});
});

