#! ce._core.views.sys_grouptypes.ShowView extends Backbone.Marionette.ItemView 
ce.module "_core.views.sys_grouptypes", (self, ce, Backbone, Marionette, $, _) ->
  self.ShowView = Backbone.Marionette.ItemView.extend(template: "sys_grouptypes/show")

