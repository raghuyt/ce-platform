#! ce._core.views.activity_participants.EditView extends Backbone.Marionette.ItemView 
ce.module "_core.views.activity_participants", (self, ce, Backbone, Marionette, $, _) ->
  self.EditView = Backbone.Marionette.ItemView.extend(template: "activity_participants/edit")

