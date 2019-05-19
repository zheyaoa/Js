function SuperClass(name,age){
    this.name = name
    this.age = age
}
SuperClass.prototype.sayHello = function(){
    console.log(`${this.name} say hello`)
}

function MyClass(name){
    this.name = name
}
MyClass.prototype = new SuperClass()

const myClass = new MyClass()
console.log(myClass.constructor)

MyClass.prototype.constructor = MyClass
const otherClass = new MyClass()
console.log(myClass.constructor)
