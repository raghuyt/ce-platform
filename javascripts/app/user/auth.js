// Generated by CoffeeScript 1.3.3

define("app/user/auth", ["require", "backbone", "jquery"], function(require, Backbone, $) {
  var self;
  self = {};
  self.isLoggedIn = function() {
    if (self.model.get("loggedIn")) {
      self.trigger("loggedIn");
      return true;
    } else {
      self.trigger("loggedOut");
      return false;
    }
  };
  self.checkStatus = function() {
    $.ajax({
      url: "/sessions/status",
      type: "post",
      dataType: "json",
      success: function(data) {
        if (data.STATUS) {
          log.info("user status: " + data.STATUSMSG);
        } else {
          log.warn("user status: " + data.STATUSMSG);
        }
      }
    });
  };
  self.hasAuthority = function(authorityId) {
    if (self.model.get("account").AuthorityID === authorityId) {
      return true;
    } else {
      return false;
    }
  };
  self.isAdmin = function() {
    if (self.model.get("account").AuthorityID === 3) {
      log.info("authority: admin");
      return true;
    } else {
      log.info("authority: user");
      return false;
    }
  };
  self.LoginView = Backbone.View.extend({
    tagName: "div",
    className: "",
    render: function() {
      var view;
      view = this;
      $.ajax({
        url: "/login",
        type: "post",
        success: function(data) {
          $(view.el).html(data);
          return this;
        }
      });
    },
    events: {
      "change input": "change",
      "click .cancel": "cancel",
      "submit": "submitLogin"
    },
    change: function(event) {},
    submitLogin: function(params) {
      var $form, view;
      view = this;
      $form = $(view.el).find('form');
      $form.ajaxSubmit({
        dataType: 'json',
        success: function(data) {
          if (data.STATUS) {
            self.load(data.PAYLOAD);
            view.close();
          } else {
            $(view.el).find('.flash').text("Login failed!");
          }
        }
      });
      return false;
    },
    cancel: function() {}
  });
  self.login = function(params) {
    var view;
    view = new ce.ui.Popup();
    ce.Dialog.show(view);
    self.trigger("loggedIn");
  };
  self.logout = function(params) {
    self.trigger("loggedOut");
  };
  return module.setExports(self);
});
