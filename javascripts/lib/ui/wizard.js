// Generated by CoffeeScript 1.3.3

ce.module("ui", function(self, ce, Backbone, Marionette, $, _, models, log, wheels) {
  self.Wizard = Backbone.View.extend({
    id: "wizard",
    el: $(".ui_wizard"),
    events: {
      "click #next_step_button": "nextStep",
      "click #prev_step_button": "prevStep"
    },
    initialize: function() {
      _.bindAll(this, "render");
      return this.currentStep = 0;
    },
    render: function() {
      var t;
      t = ce.template("ui_wizard");
      $(this.el).html(t({}));
      this.progressIndicator = this.$("#progress_indicator");
      this.title = this.$("h2#step_title");
      this.instructions = this.$("p#step_instructions");
      this.currentStepContainer = this.$(".current_step_container");
      this.nextStepButton = this.$("#next_step_button");
      this.prevStepButton = this.$("#prev_step_button");
      this.renderCurrentStep();
      return this;
    },
    renderProgressIndicator: function() {
      this.progressIndicator.empty();
      return _.each(this.options.steps, _.bind(function(step) {
        var el, text;
        text = "(" + step.step_number + ") " + step.title + ">>> ";
        el = this.make("span", {}, text);
        if (step.step_number === this.currentStep + 1) {
          $(el).addClass("active");
        }
        return this.progressIndicator.append(el);
      }, this));
    },
    renderCurrentStep: function() {
      var currentStep, nextStep, prevStep;
      currentStep = this.options.steps[this.currentStep];
      if (!this.isFirstStep()) {
        prevStep = this.options.steps[this.currentStep - 1];
      }
      nextStep = this.options.steps[this.currentStep + 1];
      this.title.html(currentStep.title);
      this.instructions.html(currentStep.instructions);
      this.currentView = currentStep.view;
      this.currentStepContainer.html(this.currentView.render().el);
      this.renderProgressIndicator();
      if (prevStep) {
        this.prevStepButton.html("Prev: " + prevStep.title).show();
      } else {
        this.prevStepButton.hide();
      }
      if (nextStep) {
        return this.nextStepButton.html("Next: " + nextStep.title);
      } else {
        return this.nextStepButton.html("Finish");
      }
    },
    nextStep: function() {
      if (this.currentView.validate()) {
        if (!this.isLastStep()) {
          this.currentView.validate();
          this.currentStep += 1;
          return this.renderCurrentStep();
        }
      } else {
        return this.save();
      }
    },
    prevStep: function() {
      if (!this.isFirstStep()) {
        this.currentStep -= 1;
        return this.renderCurrentStep();
      }
    },
    isFirstStep: function() {
      return this.currentStep === 0;
    },
    isLastStep: function() {
      return this.currentStep === this.options.steps.length - 1;
    }
  });
});
