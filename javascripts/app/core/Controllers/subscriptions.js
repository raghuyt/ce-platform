#! ce._core.controllers.Subscriptions extends Backbone.Controller 
ce.module "_core.controllers", (self, ce, Backbone, Marionette, $, _) ->
  @Subscriptions = (->
    subscriptions = ->
      main = undefined
      @collection = new self.collection
      main = $("#app")
      @collection.reset main.data("subscriptions")
      window.col = @collection
      main.removeData "subscriptions"
    subscriptions::indexView = ->
      view = undefined
      view = new self.views.indexView(collection: @collection)
      ce.mainRegion.show view

    subscriptions::editView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.editView(model: obj)
      ce.mainRegion.show view

    subscriptions::showView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.showView(model: obj)
      ce.mainRegion.show view

    subscriptions
  )()

