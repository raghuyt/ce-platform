// Generated by CoffeeScript 1.3.3

ce.module("creditinator", function(self, ce, Backbone, Marionette, $, _, models, log, user) {
  return self.views.steps.Finish = self.views.StepView.extend({
    eventCode: $(".eventCode"),
    checkCode: function(eventCode) {},
    isStepValid: function() {
      return false;
    },
    isCompleted: function() {
      return false;
    },
    nextStep: function() {
      if (user.isLoggedIn()) {
        return 'finish';
      } else {
        return 'identify';
      }
    },
    events: {
      ".continueBtn click": "saveCode"
    }
  });
}, ce._core.models, ce.log, ce.user);
