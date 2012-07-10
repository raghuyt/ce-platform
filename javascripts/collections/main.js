/*!
 * CE Platform
 * http://ccpd.uc.edu/
 * 
 * Copyright (c)2012 University of Cincinnati
 * You are not authorized to use this code without receiving direct concent from the University of Cincinnati.
 *
 * @module: main
 * @def: Collection
 */
 
CE.module("main",function(self,CE,Backbone,Marionette,$,_) {
	this.collection = Backbone.Collection.extend({
		url: '/api/main',
		model: this.model
	});
});
