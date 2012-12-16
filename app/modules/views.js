App.module("Puts", function(Puts){
	
	Puts.InputView = Backbone.Marionette.ItemView.extend({
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
	
	Puts.InputsView = Backbone.Marionette.CollectionView.extend({
		itemView:Puts.InputView
		
	});
});