#! ce._core.models.Sys_occclass.coffee extends Backbone.Model 
ce.module "_core.models", (self, ce, Backbone, Marionette, $, _) ->
    self.Sys_occclass.coffee = Backbone.Model.extend
      url: ->
                base = "/api/sys_occclass.coffee/"
                if @isNew()
                    base
                else
                    base + @id

