// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  return self.Row = Backbone.View.extend({
    tagName: "tr",
    className: "personRow AllAttendees js-all-attendee",
    template: _.template(ce.templates.get("activity_participants-row")),
    bindViews: function() {
      var attributesToPass, statusDateEl;
      statusDateEl = this.$el.find(".js-status-date");
      attributesToPass = {
        STATUSID: this.model.get("STATUSID"),
        ATTENDEEID: this.model.get("ATTENDEEID"),
        COMPLETEDATE: this.model.get("COMPLETEDATE"),
        CURRSTATUSDATE: this.model.get("CURRSTATUSDATE"),
        CURRSTATUSID: this.model.get("CURRSTATUSID"),
        REGISTERDATE: this.model.get("REGISTERDATE"),
        TERMDATE: this.model.get("TERMDATE")
      };
      this.statusDate = new self.StatusDate({
        el: statusDateEl,
        model: new self.StatusDateModel(attributesToPass),
        parentModel: this.model
      }).render();
    },
    events: {
      "change .js-participant-checkbox": "selectAttendee"
    },
    markSelected: function() {
      this.$el.find(".js-participant-checkbox").attr("checked", true);
      this.$el.addClass("alert-info");
    },
    render: function() {
      this.$el.empty();
      this.$el.append(this.template(this.model.toJSON()));
      if (this.model.get("ISSELECTED")) {
        this.markSelected();
      }
      this.bindViews();
      return this;
    },
    selectAttendee: function(e) {
      if (this.$el.find(".js-participant-checkbox").is(":checked")) {
        this.$el.addClass("alert-info");
        this.model.set({
          "ISSELECTED": true
        });
      } else {
        this.$el.removeClass("alert-info");
        this.model.set({
          "ISSELECTED": false
        });
      }
    }
  });
});
