#! ce._core.views.sys_components.IndexView extends Backbone.Marionette.CompositeView 
ce.module "_core.views.sys_components", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "sys_components/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".sys_components").append itemView.el

    newRecord: ->
  )

