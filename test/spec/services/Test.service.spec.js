describe("Test Service", function() {
  var TestService

  beforeEach(function() {
    module('testmodule');


    inject(function ($injector) {
    	TestService = $injector.get('testservice');
    })
  });

  it("should exist", function() {
    expect(TestService).toBeDefined();
  });

  it("it should return the expected value for getvalue()", function() {
    expect(TestService.getvalue()).toEqual(5);
  });
});

