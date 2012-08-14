// Generated by CoffeeScript 1.3.3

ce.module("ui", function(self, ce, Backbone, Marionette, $, _) {
  self.Pager = Backbone.View.extend({
    pagingTemplate: _.template(ce.templates.get("ui-pager")),
    initialize: function() {
      this.collection.on("change", this.render, this);
      this.collection.on("reset", this.render, this);
    },
    events: {
      "click a.js-next-page": "nextPage",
      "click a.js-page": "selectPage",
      "click a.js-prev-page": "prevPage"
    },
    render: function() {
      this.$el.html(this.pagingTemplate(this.collection.info()));
      self.trigger("pager_loaded");
      return this.el;
    },
    nextPage: function(e) {
      e.preventDefault();
      if (this.collection.currentPage < this.collection.information.totalPages) {
        this.collection.nextPage();
        self.trigger("pager_next");
      }
    },
    prevPage: function(e) {
      e.preventDefault();
      this.collection.previousPage();
      self.trigger("pager_prev");
    },
    selectPage: function() {
      var pageNo;
      pageNo = parseInt($(arguments[0].currentTarget).attr("id").split("-")[1]);
      this.collection.goTo(pageNo);
      self.trigger("pager_page_selected");
    }
  });
});
