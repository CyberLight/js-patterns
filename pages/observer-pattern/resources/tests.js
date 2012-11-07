/// <reference path="resources/qunit.js" />

var observer,
    TOPIC_NAME = 'test-topic';
module( "observer-pattern-tests-module", {
  setup: function() {
     observer = new jspatterns.behavioral.Observer();     
  }, teardown: function() {
      observer.reset();            
  }
});

test( "is observer created success", function() {
    ok(observer!= undefined, 'observer not equal "undefined"')
});

test("try subscribe on event and check was returnes UUID of subscription", function(){    
    var uuid = observer.subscribe(TOPIC_NAME, function(topic, data){                
    });    
    ok(uuid, 'Can receive UUID of subscription');
});

test('try subscribe on two topics and verify that received UUIDs not equal', function(){
    var uuid = observer.subscribe(TOPIC_NAME, function(topic, data){                
    }),
    uuid2 = observer.subscribe(TOPIC_NAME, function(topic, data){                
    });  
    
    ok(uuid !== uuid2, "UUID's of different subscriptions can't be equal");
});

asyncTest('try subscribe on topic and verify that after publish, topic data received', function(){
    observer.subscribe(TOPIC_NAME, function(topic, data){
        equal(TOPIC_NAME, topic, 'received "'+ topic +'"');
        start();
    });
    observer.publish(TOPIC_NAME, {});
});

test('try publish topic which does not exists and verify that raised exception', function(){
    raises(function() {
       observer.publish('not-exists-topic'); 
    }, jspatterns.errors.WrongTopicError, "Must throw WrongTopicError to pass");
});

asyncTest('try subscribe two subscribers on one topic and check was subscribers receive data', function(){
    var handler = function(topic, data){
        expect(2);     
        equal(TOPIC_NAME, topic, 'received topic must be equal ' + TOPIC_NAME + ' for pass and handler can called only two times');
        start();
    };
    observer.subscribe(TOPIC_NAME, handler);
    observer.subscribe(TOPIC_NAME, handler);
    observer.publish(TOPIC_NAME);
});

asyncTest('try subscribe two subscribers and then unsubscribe one and check was only one subscriber receive data after publish', function(){
     var handler = function(topic, data){
        expect(1);     
        equal(TOPIC_NAME, topic, 'received topic must be equal ' + TOPIC_NAME + ' for pass and handler can called only one time');
        start();
    },
    uuidForUnSubscribe = observer.subscribe(TOPIC_NAME, handler);
    observer.subscribe(TOPIC_NAME, handler);
    observer.unsubscribe(uuidForUnSubscribe);
    observer.publish(TOPIC_NAME);    
});


