/*! ce.Routers.Main extends Backbone.Marionette.AppRouter */
ce.pkg("Routers",function(self,ce,Backbone,Marionette,$,_) {
	this.Main = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'': 'index',
			'main/:id': 'show',
			'main/:id': 'edit'
		}
	});
});
