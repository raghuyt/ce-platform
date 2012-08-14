// Generated by CoffeeScript 1.3.3

ce.module("creditinator", function(self, ce, Backbone, Marionette, $, _, models, log, wheels) {
  self.views = self.views || {};
  self.views.steps = self.steps || {};
  self.views.StepView = Backbone.View.extend({
    el: ".creditinator-view",
    continueEl: ".continueBtn",
    backEl: ".backBtn",
    wheelsAction: "start",
    wheelsControllerPath: "/creditinator/",
    wheelsFullPath: function() {
      return this.wheelsControllerPath + "" + this.wheelsAction;
    },
    isStepValid: function() {
      return false;
    },
    currentStep: "unknown",
    nextStep: function() {},
    prevStep: "unknown",
    stepTitle: "Untitled Step",
    stepSubTitle: "",
    events: {
      "click .continueBtn": "goToNext",
      "click .backBtn": "goToPrev"
    },
    initialize: function() {
      _.bindAll(this);
      this.render();
      this.$continueEl = $(this.el).find(this.continueEl);
      return this.$backEl = $(this.el).find(this.backEl);
    },
    beforeGoToNext: function() {},
    goToNext: function(ev) {
      if (this.beforeGoToNext()) {
        wheels.go({
          url: '/creditinator/' + nextStep()
        });
      }
      ev.preventDefault();
      return false;
    },
    goToPrev: function() {},
    render: function() {
      return $(this.el).html();
    }
  });
}, ce._core.models, ce.log, ce.wheels);
