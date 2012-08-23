#! ce._core.views.sys_groupings.IndexView extends Backbone.Marionette.CompositeView 
ce.module "_core.views.sys_groupings", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "sys_groupings/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".sys_groupings").append itemView.el

    newRecord: ->
  )

