// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  return self.Actions = Backbone.View.extend({
    template: "activity_participants-actions",
    initialize: function() {
      ce.ui.on("selected_count_changed", this.updateSelectedCount, this);
      self.on("row_selected", this.updateSelectedCount, this);
    },
    events: {
      "click .js-change-status": "changeParticipantStatus",
      "click .js-print-certificate": "printCertificate",
      "click .js-remove-participants": "removeParticipants",
      "click .js-unselect-participants": "unselectParticipants"
    },
    activateMenu: function() {
      this.$el.find(".js-action-menu-button").removeClass("disabled");
      this.$el.find(".js-action-menu-label").removeClass("disabled");
    },
    changeParticipantStatus: function(e) {
      var newStatusId, newStatusName, selectedParticipants;
      newStatusId = parseInt(e.currentTarget.id.split("-")[2]);
      selectedParticipants = this.collection.getSelected();
      switch (newStatusId) {
        case 1:
          newStatusName = "Complete";
          break;
        case 2:
          newStatusName = "In Progress";
          break;
        case 3:
          newStatusName = "Registered";
          break;
        case 4:
          newStatusName = "Terminated";
      }
      _.forEach(selectedParticipants, function(model) {
        model.save({
          STATUSID: newStatusId,
          NAME: newStatusName,
          ISSELECTED: false
        }, {
          success: function(obj) {
            obj.fetch();
            self.trigger("participant_status_updated", newStatusName);
            return ce.ui.trigger("selected_count_changed");
          }
        });
      });
    },
    deactivateMenu: function() {
      this.$el.find(".js-action-menu-button").addClass("disabled");
      this.$el.find(".js-action-menu-label").addClass("disabled");
    },
    printCertificate: function(e) {
      var certContent, certType, idList, selectedParticipants;
      certType = e.currentTarget.id.split("-")[1];
      selectedParticipants = this.collection.getSelected();
      idList = [];
      _.forEach(selectedParticipants, function(model) {
        return idList.push(model.id);
      });
      self.certContainer.empty();
      certContent = $.ajax({
        url: "/reports/" + certType + "cert",
        type: "post",
        data: {
          selectedattendees: idList.toString()
        },
        dataType: "json",
        success: function(data) {
          self.certContainer.html(data);
        },
        error: function() {
          certContainer.html("FUCK SAKE, MATE");
        }
      });
      self.certContainer.dialog("show");
    },
    removeParticipants: function() {
      var selectedParticipants;
      if (confirm("Are you sure you wish to remove " + this.collection.getSelectedCount() + " attendees?")) {
        selectedParticipants = this.collection.getSelected();
        this.model.destroy({
          wait: true,
          success: function(model) {}
        });
        self.trigger("participants_removed", selectedParticipants);
        ce.ui.trigger("selected_count_changed", this.model);
      }
    },
    render: function() {
      var _temp;
      this.$el.empty();
      _temp = _.template(ce.templates.get(this.template));
      this.$el.html(_temp);
      return this;
    },
    unselectParticipants: function() {
      var selectedParticipants;
      selectedParticipants = this.collection.getSelected();
      _.forEach(selectedParticipants, function(model) {
        return model.set({
          ISSELECTED: false
        });
      });
      ce.ui.trigger("selected_count_changed");
    },
    updateSelectedCount: function() {
      var selectedCount;
      selectedCount = this.collection.getSelectedCount();
      this.$el.find(".js-attendee-status-selected-count").text(selectedCount);
      if (selectedCount > 0) {
        this.activateMenu();
      } else {
        this.deactivateMenu();
      }
    }
  });
});
