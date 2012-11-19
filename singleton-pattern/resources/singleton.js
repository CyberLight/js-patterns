var jspatterns = {};

jspatterns.errors = {};
jspatterns.creational = {};

jspatterns.creational.Singleton = (function(){
	var instances = {};
	return{
		init : function(name, object){
			instances[name] = object;
		},
		getInstanceOf : function(name){
			return instances.hasOwnProperty(name) ? instances[name] : null;
		}
	}
})();