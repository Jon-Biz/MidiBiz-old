describe("MainCtrl", function() {
	it("should display a herobox ", function() {
		browser().navigateTo('/')
	  expect(element("div").count()).toEqual(1);
	});
  
});