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
    self.paginatorCollection = pagers.Activity_participants.extend({
      server_api: {
<<<<<<< HEAD
        "$format": "json",
        "$top": function() {
          return this.totalPages * this.perPage;
        },
        "activityId": self.details.activityId,
        "orderby": "fullName",
        "$skip": function() {
=======
        $format: "json",
        activityId: self.details.activityId,
        orderby: "fullName",
        $skip: function() {
>>>>>>> gsdfgsdfg
          return this.totalPages * this.perPage;
        }
      }
    });
    self.collection = new self.paginatorCollection();
    self.topbar = new self.Topbar({
      el: ".content-container"
    }).render();
    self.list = new self.List({
      el: $(".js-participant-table"),
      collection: self.collection
    }).render();
    self.bottombar = new self.Bottombar({
      el: ".content-container"
    }).render();
    self.list = new self.List({
      el: $(".js-registrants-container"),
      collection: self.collection
    }).render();
    self.bottombar = new self.Bottombar({
      el: ".js-bottom-bar"
    }).render();
    self.pager = new ce.ui.Pager({
      el: $(".js-pager-container"),
      collection: self.collection
    }).render();
    return self.trigger("page_loaded");
  };
}, ce._core.models, ce._core.pagers);
