// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  self.on("filter_loaded", function() {
    ce.log.info("participants: filter loaded");
  });
  self.on("participants_loaded", function() {
    ce.log.info("participants: loaded");
  });
  self.on("page_loaded", function() {
    ce.log.info("participants: page ready");
  });
  return self.on("viewable_participant_date_changed", function() {
    ce.log.info("participants: viewable date changed");
  });
});
