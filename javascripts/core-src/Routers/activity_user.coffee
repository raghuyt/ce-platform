#! ce._core.routers.Activity_user.coffee extends Backbone.Marionette.AppRouter 
ce.module "_core.routers", (self, ce, Backbone, Marionette, $, _) ->
  self.Activity_user.coffee = Backbone.Marionette.AppRouter.extend(appRoutes:
    "": "index"
    "activity_user.coffee/:id/show": "show"
    "activity_user.coffee/:id/edit": "edit"
  )

