#! ce._core.views.attendee_addresses.IndexView extends Backbone.Marionette.CompositeView 
ce.module "_core.views.attendee_addresses", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "attendee_addresses/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".attendee_addresses").append itemView.el

    newRecord: ->
  )

