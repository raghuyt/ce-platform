#! ce._core.controllers.Entity_relates extends Backbone.Controller 
ce.module "_core.controllers", (self, ce, Backbone, Marionette, $, _) ->
  @Entity_relates = (->
    entity_relates = ->
      main = undefined
      @collection = new self.collection
      main = $("#app")
      @collection.reset main.data("entity_relates")
      window.col = @collection
      main.removeData "entity_relates"
    entity_relates::indexView = ->
      view = undefined
      view = new self.views.indexView(collection: @collection)
      ce.mainRegion.show view

    entity_relates::editView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.editView(model: obj)
      ce.mainRegion.show view

    entity_relates::showView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.showView(model: obj)
      ce.mainRegion.show view

    entity_relates
  )()

