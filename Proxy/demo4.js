let arr = [1,2,3,4,5];

const proxy = new Proxy(arr,{
    get:function(target,key,reciver){
        return Reflect.get(target,key,reciver)
    },
    set:function(target,key,newValue,reciver){
        console.log(key,newValue)
        return Reflect.set(target,key,newValue,reciver)
    }
})

proxy.push(6)
console.log(arr)