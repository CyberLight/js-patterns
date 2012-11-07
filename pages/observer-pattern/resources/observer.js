var jspatterns = {};

jspatterns.errors = {};
jspatterns.behavioral = {};

jspatterns.errors.WrongTopicError = function(message) {
    this.message = message;
};

jspatterns.errors.WrongTopicError.prototype = new Error();

jspatterns.behavioral.Observer = function(){
    var topics = {},
        genUUID = function(){
            var S4 = function ()
            {
                return Math.floor(
                        Math.random() * 0x10000 /* 65536 */
                    ).toString(16);
            };
        
            return ('_' + S4() + S4() + S4() + S4() + S4() + S4() + S4() );
        },
        checkTopic = function(topic){
            if (!topics[topic]) {
                topics[topic] = [];
            }
        },          
        subscribe = function(topic, func){
            checkTopic(topic);
            var uuid = genUUID();
            
            topics[topic].push({
                    token: uuid,
                    func: func
                });
            
            return uuid;
        },
        publish = function(topic, args){
            var subscribers = topics[topic];
            
            if(!subscribers)
                throw new jspatterns.errors.WrongTopicError('Wrong topic id for publishing');
                
            for(var i=0; i<subscribers.length; i++){
                subscribers[i].func.call(this, topic, args);
            }
        },
        reset = function(){
            delete topics;
            topics = {};
        },
        unsubscribe = function(token){
            for(var topic in topics){
                var len = (topics[topic] || []).length;
                if(len){
                    for(var i=0; i<len;i++){
                        if(topics[topic][i].token == token){
                            topics[topic].splice(i, 1);
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    return{
        subscribe : subscribe,        
        publish : publish,
        reset : reset,
        unsubscribe : unsubscribe
    }
};