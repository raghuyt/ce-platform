// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _, models, pagers) {
  return self.load = function(params) {
    self.details = {
      activityId: ce.activity.model.get("id"),
      AddlAttendees: params.legacy.AddlAttendees,
      currAttendee: params.legacy.currAttendee,
      currPerson: params.legacy.currPerson,
      MaxRegistrants: params.legacy.MaxRegistrants,
      NoChange: params.legacy.NoChange,
      nPageNo: params.legacy.nPageNo,
      nStatus: params.legacy.nStatus,
      selectedRows: params.legacy.selectedRows,
      selectedCount: params.legacy.selectedCount,
      totalAttendeeList: params.legacy.totalAttendeeList,
      rowsPerPage: params.legacy.rowsPerPage,
      totalPages: params.legacy.totalPages
    };
    self.paginatorCollection = pagers.clientActivity_participants.extend({
      server_api: {
        "$format": "json",
        "$top": function() {
          this.totalPages * this.perPage;
        },
        "activityId": self.details.activityId,
        "orderby": "fullName",
        "$skip": function() {
          this.totalPages * this.perPage;
        }
      },
      paginator_ui: {
        "firstPage": 1,
        "currentPage": self.details.nPageNo,
        "perPage": 15
      },
      whereExpanded: function(attrs) {
        return _.filter(this.origModels, function(model) {
          var key;
          for (key in attrs) {
            if (attrs[key] !== model.get(key)) {
              return false;
            }
          }
          return true;
        });
      },
      getCompleteCount: function() {
        return this.whereExpanded({
          ISSTATUS1: true
        }).length;
      },
      getInProgressCount: function() {
        return this.whereExpanded({
          ISSTATUS2: true
        }).length;
      },
      getRegisterCount: function() {
        return this.whereExpanded({
          ISSTATUS3: true
        }).length;
      },
      getSelectedCount: function() {
        return this.whereExpanded({
          ISSELECTED: true
        }).length;
      },
      getTermCount: function() {
        return this.whereExpanded({
          ISSTATUS4: true
        });
      },
      getTotalCount: function() {
        return this.information.totalUnfilteredRecords;
      }
    });
    self.collection = new self.paginatorCollection;
    self.StatusDateModel = models.Activity_participant.extend({
      url: "/ajax_adm_activity/saveAttendeeDate"
    });
    self.topbar = new self.Topbar({
      el: ".js-top-bar"
    }).render();
    self.loader = new ce.ui.Loader({
      el: "#tier3",
      parentEl: $(".content-container")
    });
    self.loader.start();
    self.list = new self.List({
      el: ".js-attendee-rows",
      collection: self.collection
    });
    self.selectall = new self.SelectAllCheckBox({
      el: ".js-selectall-placeholder",
      collection: self.collection
    }).render();
    self.bottombar = new self.Bottombar({
      el: ".js-bottom-bar"
    }).render();
    self.on("data_loaded", function() {
      self.loader.stop();
      self.actions = new self.Actions({
        el: ".js-partic-actions",
        collection: self.collection
      }).render();
      self.pager = new ce.ui.Pager({
        el: ".js-pager-container",
        collection: self.collection
      }).render();
      return self.filter = new self.Filter({
        el: ".js-attendee-filter",
        collection: self.collection
      }).render();
    });
    self.trigger("page_loaded");
  };
}, ce._core.models, ce._core.pagers);
