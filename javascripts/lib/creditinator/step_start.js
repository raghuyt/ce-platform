// Generated by CoffeeScript 1.3.3

ce.module("creditinator", function(self, ce, Backbone, Marionette, $, _, models, log, user) {
  self.views.steps.Start = self.views.StepView.extend({
    wheelsAction: "start",
    wheelsControllerPath: "/creditinator/",
    wheelsFullPath: function() {
      return this.wheelsControllerPath + "" + this.wheelsAction;
    },
    isStepValid: function() {
      return false;
    },
    currentStep: "start",
    nextStep: "identify",
    prevStep: "",
    stepTitle: "Welcome!",
    stepSubTitle: "Enter the code you were provided at the live event.",
    beforeGoToNext: function() {
      return true;
    }
  });
}, ce._core.models, ce.log, ce.user);
