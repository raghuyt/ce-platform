#! ce._core.controllers.Credit_request_emails extends Backbone.Controller 
ce.module "_core.controllers", (self, ce, Backbone, Marionette, $, _) ->
  @Credit_request_emails = (->
    credit_request_emails = ->
      main = undefined
      @collection = new self.collection
      main = $("#app")
      @collection.reset main.data("credit_request_emails")
      window.col = @collection
      main.removeData "credit_request_emails"
    credit_request_emails::indexView = ->
      view = undefined
      view = new self.views.indexView(collection: @collection)
      ce.mainRegion.show view

    credit_request_emails::editView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.editView(model: obj)
      ce.mainRegion.show view

    credit_request_emails::showView = (id) ->
      obj = undefined
      view = undefined
      obj = @collection.get(id)
      view = new self.views.showView(model: obj)
      ce.mainRegion.show view

    credit_request_emails
  )()

