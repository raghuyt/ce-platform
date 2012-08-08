// Generated by CoffeeScript 1.3.3

ce.module("templates", function(self, ce, Backbone, Marionette, $, _) {
  self.get = function(tmplKey) {
    var template, tmpl;
    if (!self.cache) {
      self.cache = {};
    }
    tmpl = self.cache[tmplKey];
    template = "";
    if (!tmpl) {
      $.ajax({
        url: "/tmpls/loader/" + tmplKey,
        async: false,
        success: function(data) {
          return template = data;
        }
      });
      tmpl = template;
      self.cache[tmplKey] = tmpl;
    }
    return tmpl;
  };
  return self.clear = function() {
    return self.cache = {};
  };
});

Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
  var myTemplate;
  myTemplate = ce.templates.get(templateId);
  return myTemplate;
};
