#! ce._core.models.Credit_request.coffee extends Backbone.Model 
ce.module "_core.models", (self, ce, Backbone, Marionette, $, _) ->
    self.Credit_request.coffee = Backbone.Model.extend
      url: ->
                base = "/api/credit_request.coffee/"
                if @isNew()
                    base
                else
                    base + @id

