/*! ce.user.events @description: logs when user events */
ce.module("user",{
	startWithApp:false,
	define:function(self,ce,Backbone,Marionette,$,_) {
		self.on("loggedIn",function() {
			ce.log.info("user: logged in");
		});
		
		self.on("loggedOut",function() {
			ce.log.warn("user: logged out");
		});
		
		self.on("loaded",function() {
			ce.log.info("user: loaded");
		});
	}
});