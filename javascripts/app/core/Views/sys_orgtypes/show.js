#! ce._core.views.sys_orgtypes.ShowView extends Backbone.Marionette.ItemView 
ce.module "_core.views.sys_orgtypes", (self, ce, Backbone, Marionette, $, _) ->
  self.ShowView = Backbone.Marionette.ItemView.extend(template: "sys_orgtypes/show")

