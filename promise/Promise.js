var Promise =  (function(){
    function Promise(resolver){
        if(resolver&&typeof resolver !== 'function'){throw new Error('resolver is not a function')}
        this.state = 'pending';
        this.data = undefined;
        this.callbacks = [];
        executeResolver.bind(this)(resolver);
    }

    function executeResolver(resolver){
        var call = false,_this = this;
        function onError(value){
            if(call) return;
            call = true;
            executeCallBack.bind(_this)('reject',value)       
        }
        function onSuccess(value){
            if(call) return;
            call = true;
            executeCallBack.bind(_this)('resolve',value)
        }

        try{
            resolver(onSuccess,onError)
        }catch(e){
            onError(e)
        }
    }

    function executeCallBack(type,value){
        var isSolve = type === 'resolve',thenable;
        //如果value是一个obj或function,
        if(value&&(typeof value==='object'||typeof value==='function')){
            try{
                thenable = getThen(value)
            }catch(e){
                return executeCallBack('reject',e)
            }
        }
        //如果存在thenable
        if(typeof value === 'obj'&&typeof thenable === 'function'){
            executeResolver.bind(this)(thenable)
        }else{
            //如果是一个数值
            this.state = isSolve?'resolve':'reject';
            this.data  = value;
            this.callbacks.forEach(callback => {
                callback(value)
            })
        }
        return this;
    }

    function getThen(obj){
        var then = obj && obj.then;
        if (obj && typeof obj === 'object' && typeof then === 'function') {
            return function appyThen() {
                then.apply(obj, arguments);
            };
        }
    }

    function executeCallbackAsync(callback, value){
        var _this = this;
        setTimeout(function(){
          var res;
          try{
            res = callback(value);
          }catch(e){
            return executeCallback.bind(_this)('reject', e);
          }
      
          if(res !== _this){
            return executeCallback.bind(_this)('resolve', res);
          }else{
            return executeCallback.bind(_this)('reject', new TypeError('Cannot resolve promise with itself'));
          }
        }, 1)
    }

    Promise.prototype.then  =  function(onResolve,onReject){
        if(typeof onResolve !== 'function' && this.state === 'resolve' ||
            typeof onReject !== 'function' && this.state === 'reject'){
            return this;
        }
        var promise = new this.constructor();

        if(this.state !== 'pending'){
            var callback = this.state === 'resolve'?onResolve:onReject;
            executeCallbackAsync.bind(promise)(callback,this.data)
        }else{
            this.callbacks.push()
        }
    }

    return Promise;


})()

new Promise().then()