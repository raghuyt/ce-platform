// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _, models) {
  return self.SelectAllCheckBox = Backbone.View.extend({
    template: "activity_participants-selectallcheckbox",
    events: {
      "change .js-check-all": "selectAllParticipants"
    },
    render: function() {
      var _temp;
      this.$el.empty();
      _temp = _.template(ce.templates.get(this.template));
      this.$el.html(_temp);
      return self.trigger("selectallcheckbox_rendered");
    },
    selectAllParticipants: function() {
      _.forEach(this.collection.models, function(model) {
        return model.set({
          ISSELECTED: true
        });
      });
      return self.trigger("selected_count_changed");
    }
  });
});
