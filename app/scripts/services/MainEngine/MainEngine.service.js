angular.module("MainEngine")
.service('mainEngine',function(engineFactory,Midiputs){
	var that = engineFactory.getEngine();
	that.$$master = Midiputs;
	that.IO = that.$$master.IO;
	return that;
});

