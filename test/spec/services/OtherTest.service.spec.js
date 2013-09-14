describe("Test Service", function() {
  var TestService;
  var OtherService;
  var getvaluestub;

  beforeEach(function() {




  	// var mock = {
  	// 	getvalue: function () {}
  	// }
  	// angular.module('newtestmodule',[])
  	// 	.service('testservice',function () {
  	// 		return mock;
  	// 	});

  	// getvaluestub = sinon.stub(mock,'getvalue').returns(4);

  	// angular.mock.module('newtestmodule');
  	module('testmodule');
    module('othertestmodule');

    inject(function ($injector) {
    	TestService = $injector.get('testservice');

    	getvaluestub = sinon.stub(TestService,'getvalue').returns(4);

    	OtherService = $injector.get('otherservice');
    })


  });

  it("should exist", function() {
    expect(OtherService).toBeDefined();
  });

  it("it should contain the expected value", function() {
    expect(OtherService.value).toEqual(5);
  });

  describe("getvalue", function() {
    it("should have been called", function() {
      expect(getvaluestub).toHaveBeenCalled();
    });
  });
});

