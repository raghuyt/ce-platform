// Generated by CoffeeScript 1.3.3

ce.module("_core.pagers", function(self, ce, Backbone, Marionette, $, _, models) {
  return self.Sessions = Backbone.Paginator.clientPager.extend({
    initialize: function() {},
    paginator_core: {
      type: 'post',
      dataType: 'json',
      url: '/sessions/'
    },
    paginator_ui: {
      firstPage: 1,
      currentPage: 1,
      perPage: 15
    },
    parse: function(response) {
      this.totalPages = Math.ceil(response.length / this.perPage);
      return response;
    },
    model: models.Session
  });
}, ce._core.models);