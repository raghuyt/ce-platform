/*! ce.Views.Edit.EditView extends Backbone.Marionette.ItemView */
ce.module("Views.Edit",function(self,ce,Backbone,Marionette,$,_) {
	self.EditView = Backbone.Marionette.ItemView.extend({
		template: 'edit/edit',
	});
});