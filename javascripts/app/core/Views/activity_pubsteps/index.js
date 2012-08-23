#! ce._core.views.activity_pubsteps.IndexView extends Backbone.Marionette.CompositeView 
ce.module "_core.views.activity_pubsteps", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "activity_pubsteps/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".activity_pubsteps").append itemView.el

    newRecord: ->
  )

