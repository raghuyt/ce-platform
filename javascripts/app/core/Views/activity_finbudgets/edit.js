#! ce._core.views.activity_finbudgets.EditView extends Backbone.Marionette.ItemView 
ce.module "_core.views.activity_finbudgets", (self, ce, Backbone, Marionette, $, _) ->
  self.EditView = Backbone.Marionette.ItemView.extend(template: "activity_finbudgets/edit")

