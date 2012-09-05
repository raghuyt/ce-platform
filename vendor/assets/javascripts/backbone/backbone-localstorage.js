
// Override `Backbone.sync` to use delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
Backbone.sync = function(method, model, options) {
var resp;
var store = model.localStorage || model.collection.localStorage;
switch (method) {
case "read": resp = model.id ? store.find(model) : store.findAll(); break;
case "create": resp = store.create(model); break;
case "update": resp = store.update(model); break;
case "delete": resp = store.destroy(model); break;
}
if (resp) {
options.success(resp);
} else {
options.error("Record not found");
}
};
