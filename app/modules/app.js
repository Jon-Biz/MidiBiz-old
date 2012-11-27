App.module("ModuleName", function(ModuleName){

  App.addInitializer(function(options){
  	
  });
  
	App.vent.bindTo("",function(){
	})
	
//	console.log(Tids);

	App.Main = function(){

		console.log("main init");	
	
		App.addRegions({
				SideBarRegion: "#sidebar"
				,MainRegion: "#main"
			});
						
		App.SideBarRegion.show(View);
		App.MainRegion.show(View);

	};

});
