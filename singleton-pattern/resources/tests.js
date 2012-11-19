/// <reference path="resources/qunit.js" />

var singleton,
	USER1 = {name: 'user1', score: 2},
	USER2 = {name: 'user2', score: 5, info: "test user information"};   
module( "singleton-pattern-tests-module", {
  setup: function() {
     singleton = jspatterns.creational.Singleton;     
  }, teardown: function() {
     delete singleton; 
  }
});

function initiateTest1Object(){
	singleton.init('test1', USER1);
}

function initiateTest2Object(){
	singleton.init('test2', USER2);
}

test("should check would be singleton created successfully", function() {
    ok(singleton!= undefined, 'singleton not equal "undefined"');
});

test("should be set object with init() method", function(){
	initiateTest1Object();
	ok(true, "initialization can be successfull for test pass");
});

test("should return initiated object by name", function(){	
	initiateTest1Object();
	ok(singleton.getInstanceOf('test1') != undefined, "should not be equals to 'undefined'");
});

test("should return null object for not registered object name", function(){	
	equal(null, singleton.getInstanceOf('non-reg-test1'), "should be equals to null for test pass");
});

test("should return instance of requested object by name multiple times", function(){
	for(var i=0; i<10; i++){
		deepEqual(USER1, singleton.getInstanceOf('test1'), "should be equal to user1 object everytime for test pass");
	}
});

test("should initiated with second test object", function(){	
	initiateTest2Object();
	ok(true, "initialization can be successfull for test pass");
});

test("should return test2 object by name", function(){
	initiateTest2Object();
	deepEqual(USER2, singleton.getInstanceOf('test2'), "should be equal to user2 object for test pass");
});

test("should be return objects registered by name using global access to \"jspatterns.creational.Singleton\" without using variable", function(){
	initiateTest1Object();
	initiateTest2Object();
	deepEqual(USER1, jspatterns.creational.Singleton.getInstanceOf('test1'), "should be equal to user1 object for test pass");
	deepEqual(USER2, jspatterns.creational.Singleton.getInstanceOf('test2'), "should be equal to user2 object for test pass");
});