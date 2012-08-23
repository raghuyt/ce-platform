#! ce._core.views.sys_cbafunds.IndexView extends Backbone.Marionette.CompositeView 
ce.module "_core.views.sys_cbafunds", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "sys_cbafunds/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".sys_cbafunds").append itemView.el

    newRecord: ->
  )

