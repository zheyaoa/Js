Function.prototype.bindDemo = function(obj,args){
    let arg = Array.prototype.slice.call(arguments,1);
    const that = this;
    let tmp =  function(){
       args = arg.concat(Array.prototype.slice.call(arguments));
       return that.apply(obj,args);
    }
    tmp.prototype = this.prototype;
    return tmp;
}
const o = {
    name:'yyx',
    age:'20',
    getAge(){
        console.log(this.age);
    }
}
const getAge = o.getAge;
const bindGetAge = getAge.bindDemo(o)
bindGetAge()
