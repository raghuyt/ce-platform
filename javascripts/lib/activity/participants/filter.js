// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  return self.Filter = Backbone.View.extend({
    template: _.template(ce.templates.get("activity_participants-filter")),
    initialize: function() {
      self.on("selected_count_changed", this.getFilterCounts, this);
    },
    events: {
      "click .js-clear-attendee-search": "clearAttendeeSearch",
      "click .js-attendee-search-typeahead": "keepTypeaheadOpen",
      "keyup .js-attendee-search-typeahead": "searchAttendeeList",
      "click .js-attendees-filter li.js-attendee-status": "filteredAttendeeStatus",
      "click .js-attendees-filter li.js-attendee-status-all": "showAll",
      "click .js-attendees-filter li.js-attendee-status-Selected": "showSelected"
    },
    render: function() {
      this.$el.html(this.template(this.collection.info()));
      this.getFilterCounts();
      self.trigger("filter_loaded");
      return this.el;
    },
    clearAttendeeSearch: function() {
      this.$el.find(".js-attendee-search-typeahead").val("");
      this.$el.find(".js-clear-attendee-search").hide();
      this.showAll();
    },
    getFilterCounts: function() {
      var curr, filterOptions;
      curr = this;
      filterOptions = this.$el.find('.js-attendee-status');
      this.$el.find('li.js-attendee-status-all').find('span.js-attendee-status-count').text("(" + this.collection.getTotalCount() + ")");
      $.each(filterOptions, function() {
        var filterStatus;
        filterStatus = parseInt($(this).attr('id').replace('status', ''));
        switch (filterStatus) {
          case 1:
            $(this).find('span.js-attendee-status-count').text("(" + curr.collection.getCompleteCount().length + ")");
            break;
          case 2:
            $(this).find('span.js-attendee-status-count').text("(" + curr.collection.getInProgressCount().length + ")");
            break;
          case 3:
            $(this).find('span.js-attendee-status-count').text("(" + curr.collection.getRegisterCount().length + ")");
            break;
          case 4:
            $(this).find('span.js-attendee-status-count').text("(" + curr.collection.getTermCount().length + ")");
        }
      });
      this.$el.find(".js-attendee-status-selected-count").text(this.collection.getSelectedCount().length);
    },
    filteredAttendeeStatus: function(e) {
      var filterStatusId, filterStatusName;
      filterStatusId = $(e.currentTarget).attr('id').replace('status', '');
      filterStatusName = $(e.currentTarget).find('.js-attendee-status-name').text();
      this.collection.setFilter(['STATUSID'], filterStatusId);
      this.collection.pager();
      this.updateFilterLabel(filterStatusName);
    },
    keepTypeaheadOpen: function(e) {
      e.preventDefault();
      return false;
    },
    searchAttendeeList: function(e) {
      var filterVal, input;
      if ($.inArray(e.keyCode, [32, 13, 16, 17]) !== 0) {
        input = this.$el.find(".js-attendee-search-typeahead");
        filterVal = input.val();
        if (input.val().length > 0) {
          this.$el.find(".js-clear-attendee-search").show();
          $.each(this.collection.origModels, function(i, item) {
            var matchFilter, matches;
            matchFilter = new RegExp(filterVal.replace(/(\S+)/g, function(s) {
              return "\\b" + s + ".*";
            }).replace(/\s+/g, ""), "gi");
            matches = matchFilter.exec(item.get("FULLNAME"));
            if (matches !== null) {
              return item.set({
                "ISFILTERMATCH": true,
                silent: true
              });
            } else {
              return item.set({
                "ISFILTERMATCH": false,
                silent: true
              });
            }
          });
          this.collection.setFilter(['ISFILTERMATCH'], 'true');
          this.updateFilterLabel("Filtered");
        } else {
          this.$el.find(".js-clear-attendee-search").hide();
          this.showAll();
        }
      }
    },
    showAll: function() {
      this.collection.setFilter(['STATUSID'], [1, 2, 3, 4]);
      this.collection.pager();
      this.updateFilterLabel("All");
    },
    showSelected: function() {
      this.collection.setFilter(['ISSELECTED'], 'true');
      this.collection.pager();
      this.updateFilterLabel("Selected");
    },
    updateFilterLabel: function(filterName) {
      this.$el.find('.js-attendee-status-title').text(filterName);
      return self.trigger("participants_filtered", filterName);
    }
  });
});
