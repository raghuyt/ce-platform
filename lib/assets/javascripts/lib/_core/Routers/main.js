// Generated by CoffeeScript 1.3.3

ce.module("_core.routers", function(self, ce, Backbone, Marionette, $, _) {
  return self.Main = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "": "index",
      "main/:id/show": "show",
      "main/:id/edit": "edit"
    }
  });
});