ce.module("ui",function(self,ce,Backbone,Marionette,$,_){
	self.dialog = Backbone.Marionette.Region.extend({
		el: "#dialog",
		
		constructor: function(){
			_.bindAll(this);
			Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
			this.on("view:show", this.showDialog, this);
		},
		
		getEl: function(selector){
			var $el = $(selector).dialog();
			$el.on("hidden", this.close);
			return $el;
		},
		
		showDialog: function(view){
			view.on("close", this.hideDialog, this);
			this.$el.dialog('open');
		},
		
		hideDialog: function(){
			this.$el.dialog('close');
		}
	});
});

ce.addRegions({
	dialog:ce.ui.dialog
});