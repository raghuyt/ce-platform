// Generated by CoffeeScript 1.3.3

ce.module("_core.pagers", function(self, ce, Backbone, Marionette, $, _, models) {
  self.clientCredit_requests = Backbone.Paginator.clientPager.extend({
    initialize: function() {},
    paginator_core: {
      type: 'post',
      dataType: 'json',
      url: '/credit_requests/loadData'
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
    model: models.Credit_request
  });
  return self.requestCredit_requests = Backbone.Paginator.requestPager.extend({
    initialize: function() {},
    paginator_core: {
      type: 'post',
      dataType: 'json',
      url: '/credit_requests/loadData'
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
    model: models.Credit_request
  });
}, ce._core.models);
