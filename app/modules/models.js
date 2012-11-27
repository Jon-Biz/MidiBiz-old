App.module("ModuleName", function(ModuleName){

	ModuleName.Model = Backbone.RelationalModel.extend({
	  defaults: {
			title: "Title"
			,text: "nothing here yet"
			}
		,initialize: function(){
		}
		,urlRoot: 'urlroot'
		,idAttribute: "_id"
	});

}