#! ce._core.views.credit_requests.ShowView extends Backbone.Marionette.ItemView 
ce.module "_core.views.credit_requests", (self, ce, Backbone, Marionette, $, _) ->
  self.ShowView = Backbone.Marionette.ItemView.extend(template: "credit_requests/show")

