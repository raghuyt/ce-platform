// Generated by CoffeeScript 1.3.3
(function() {

  ce.module("user", function(self, ce, Backbone, Marionette, $, _) {
    self.Model = ce.Models.Person.extend({});
    self.load = function(params) {
      self.model = new self.Model(params);
      return self.trigger("loaded");
    };
    return $(function() {
      return $(".loginLink").click(function(ev) {
        self.login({});
        return false;
      });
    });
  });

}).call(this);
