
angular.module('testmodule',[])
	.service('testservice',function(){
		return {getvalue : function(){
			return 5
			}
		};
	})

