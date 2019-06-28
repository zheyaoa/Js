const person = {
    name:"yyx",
};
const proxy = new Proxy(person,{
    get(target,propKey){
        return target[propKey];
    },
    set(target,propKey,newVal){
        console.log("hjkf");
        target[propKey] = newVal
    }
})
console.log(proxy.name)
proxy.name = 'yw';
console.log(proxy.name)
console.log(person.name)
