#! ce._core.views.sys_stat_log_types.IndexView extends Backbone.Marionette.CompositeView 
ce.module "_core.views.sys_stat_log_types", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "sys_stat_log_types/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".sys_stat_log_types").append itemView.el

    newRecord: ->
  )

