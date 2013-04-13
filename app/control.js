
var App= new Backbone.Marionette.Application();

AppController = {
	index: function(hash) {
			console.log('index triggered');
			App.Midi.ready.add(function(options){
				console.log('index resolving');
				App.Puts.Main();			
			});
  }
	,other: function(hash){
		console.log('other triggered');
    }	  
};

Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    "": "index",
    "other":"other"
  }
  ,controller: AppController
});


// Trigger the initial route and enable HTML5 History API support

App.bind("initialize:after", function(options){
  new Router();
 
  if (Backbone.history&&!this.debug){
    Backbone.history.start();
  }
});