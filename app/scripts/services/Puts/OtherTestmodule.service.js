
angular.module('othertestmodule',[])
	.service('otherservice',function(testservice){
		var val = testservice.getvalue()+1;
		return {value : val};
	})

