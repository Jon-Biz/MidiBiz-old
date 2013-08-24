App.module("View",function(View){

	View.Patch = Backbone.Marionette.ItemView.extend({
		tagName:"div"
		,className:"patch"
		,initialize:function(){

		}
		,template:"#patch"
	}); 
})