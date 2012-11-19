var ITest;

module( "Interface pattern tests", {
  setup: function() {
	ITest = new jspatterns.contracts.Interface('ITest', ['getValue', 'setValue']);    
  }, teardown: function() {
	delete ITest    
  }
});

test( "is testInterface object created successfully", function() {
	var testInterface = new jspatterns.contracts.Interface('test', []);
    ok(testInterface!= undefined, 'testInterface not equal "undefined"')
});

test('check was after trying to create new instance of  Interface without 2 constructor parameters, throws exception', function(){
    raises(function(){
	   var testInstance = new jspatterns.contracts.Interface();
	  }, jspatterns.errors.WrongConstructorArgumentCountError, 'can throw error for pass');
});

test('check was after trying to create new instance of  Interface with more then 2 constructor parameters, throws exception', function(){
    raises(function(){
	   var testInstance = new jspatterns.contracts.Interface('test', [], []);
	  }, jspatterns.errors.WrongConstructorArgumentCountError, 'can throw error for pass');
});

test('check was after trying to create new instance of  Interface with first not string constructor parameter, throws exception', function(){
    raises(function(){
	   var testInstance = new jspatterns.contracts.Interface({}, []);
	  }, jspatterns.errors.WrongParameterTypeError, 'can throw error for pass');
});

test('try set methods and object, check was interface name and methods of interface setted sucessfully', function(){
	var interface = new jspatterns.contracts.Interface('test', ['method1', 'method2']);	
	equal('test', interface.name, 'name of interface can not be undefined for test passing');
	equal(2, interface.methods.length, 'count of methods can be equals to 2 for test passing');
});

test('try set methods names for interface with not string type, check was raised exception', function(){
	raises(function(){
			var interface = new jspatterns.contracts.Interface('test', ['method1', {}]);	
		}, Error, 'can throw exception for pass');
});

test('try call "ensureImplements" method of Interface class without parameters, throws WrongParameterValueError exception', function(){
	raises(function(){
		jspatterns.contracts.Interface.ensureImplements();
	}, jspatterns.errors.WrongParameterValueError, 'can throw exception for test passing');
});

test('try call "ensureImplements" method of Interface class with more then 2 parameters, exception was not thrown', function(){	
		var interface1 = new jspatterns.contracts.Interface('interface1',{}),
			 interface2 = new jspatterns.contracts.Interface('interface2',{});
		ok(interface1 instanceof jspatterns.contracts.Interface, 'interface1 can be instance of Interface');
		jspatterns.contracts.Interface.ensureImplements({}, interface1, interface2);
		ok(true, 'test pass if exception not thrown');
});

test('try call "ensureImplements" method of Interface class with objects which not derrived from Interface class and check was exception raised', function(){	
	raises(function(){
		var interface1 = {},
			 interface2 = {};
		jspatterns.contracts.Interface.ensureImplements({}, interface1, interface2);
		}, Error, 'can throw exception for pass');
});

test('try verify what object implements test interface, checking must successfull', function(){  
  
	function MyTestObject(){
		return {
			getValue : function(){},
			setValue : function(val){}
		};
	};
	
	var testObj = new MyTestObject();
	ok(jspatterns.contracts.Interface.ensureImplements(testObj, ITest), 'must return true for test pass');
});

test('try call "ensureImplements" method of Interface class for object what not implemented all items of  ITest interface, verify was raised error', function(){
	function MyTestObject(){
		return {
			getValue : function(){}			
		};
	};
	
	var testObj = new MyTestObject();
	raises(function(){
		jspatterns.contracts.Interface.ensureImplements(testObj, ITest);
	}, Error, 'can throw exception for test pass');
});

test('try call "ensureImplements" method of Interface class for "undefined" object on implementation of ITest interface, raises exception WrongParameterValueError', function(){
	raises(function(){
		jspatterns.contracts.Interface.ensureImplements(undefined, ITest);
	}, jspatterns.errors.WrongParameterValueError, 'can throw WrongParameterValueError for test pass');
});
