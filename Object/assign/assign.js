const obj = { a: 1 }
const copy = Object.assign({},obj)
console.log(copy)

const o1 = {a:1};
const o2 = { [Symbol('foo')]:2}
const o3 = Object.assign(o1,o2)
console.log(o3)

let obj1 = { a: 0 , b: { c: 0}}; 
let obj2 = Object.assign({}, obj1); 
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

obj1.b.c = 1
console.log(obj2.b.c)