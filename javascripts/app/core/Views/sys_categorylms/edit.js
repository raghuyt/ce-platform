#! ce._core.views.sys_categorylms.EditView extends Backbone.Marionette.ItemView 
ce.module "_core.views.sys_categorylms", (self, ce, Backbone, Marionette, $, _) ->
  self.EditView = Backbone.Marionette.ItemView.extend(template: "sys_categorylms/edit")

