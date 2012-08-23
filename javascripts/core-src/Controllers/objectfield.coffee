#! ce._core.controllers.Objectfield.coffee extends Backbone.Controller 
ce.module "_core.controllers", (self, ce, Backbone, Marionette, $, _) ->
  @Objectfield.coffee = (->
    objectfield.coffee = ->
      main = undefined
      @collection = new self.collection
      main = $("#app")
      @collection.reset main.data("objectfield.coffee")
      window.col = @collection
      main.removeData "objectfield.coffee"
    objectfield.coffee::indexView = ->
      view = undefined
      view = new self.views.indexView(collection: @collection)
      ce.mainRegion.show view

    objectfield.coffee::editView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.editView(model: obj)
      ce.mainRegion.show view

    objectfield.coffee::showView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.showView(model: obj)
      ce.mainRegion.show view

    objectfield.coffee
  )()

