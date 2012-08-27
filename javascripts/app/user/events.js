// Generated by CoffeeScript 1.3.3

define("app/user/events", ["require", "backbone", "jquery"], function(require, Backbone, $) {
  var self;
  self = {};
  self.on("loggedIn", function() {
    ce.log.info("user: logged in");
  });
  self.on("loggedOut", function() {
    ce.log.warn("user: logged out");
  });
  self.on("loaded", function() {
    ce.log.info("user: init");
  });
  return module.setExports(self);
});
