appGTD.module("ModuleName", function(ModuleName){
	
	ModuleName.View = Backbone.Marionette.ItemView.extend({
		tagName:"div"
		,className:"view"
		,initialize:function(){		
				this.model.bind('change', this.render, this);
		}
		,template: "#view"
		,events: {
		}
		,onRender: function(){				
		}

	});