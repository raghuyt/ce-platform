window.ce = window.ce or {}

ce = new Backbone.Marionette.Application()

ce.module "_core"
ce.module "activity"
ce.module "person"

ce.addRegions
  page: "#page"
  subpage: ".contentBar div.content-container"

ce.addInitializer (options) ->
  ce.trigger("loaded")

ce.on("loaded", ->
    ce.log.info("app: started")
)