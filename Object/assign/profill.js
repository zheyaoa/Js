if(typeof Object.assign != 'function'){
    Object.defineProperty(Object,'assign',{
        value:function(target,sources){
            'use strict'
            if(target == null){
                throw new TypeError('Cannot convert undefined or null to Object')
            }
            let to = Object(target);
            for(var index=1;index<arguments.length;index++){
                var nextSource = arguments[index];
                if(nextSource != null){
                    for(let nextkey in nextSource){
                        if(Object.prototype.hasOwnProperty.call(nextSource,nextkey)){
                            to[nextkey]=nextSource[nextkey];
                        }
                    }
                }
            }
            return to;
        },
        configurable:true,
        writable:true
    })
}

let obj1 = {a:1};
let obj2 = {b:2};

Object.assign(obj1,obj2);
console.log(obj1)