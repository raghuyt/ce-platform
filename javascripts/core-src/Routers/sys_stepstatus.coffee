#! ce._core.routers.Sys_stepstatus.coffee extends Backbone.Marionette.AppRouter 
ce.module "_core.routers", (self, ce, Backbone, Marionette, $, _) ->
  self.Sys_stepstatus.coffee = Backbone.Marionette.AppRouter.extend(appRoutes:
    "": "index"
    "sys_stepstatus.coffee/:id/show": "show"
    "sys_stepstatus.coffee/:id/edit": "edit"
  )

