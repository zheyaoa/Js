function SuperType(){
    this.name = 'super';
    this.color = []
}

SuperType.prototype.sayAge = function(){
    console.log(this.age)
}
SuperType.prototype.sayName = function(){
    console.log(this.name)
}

function Type(){
    this.age = '20'
}

Type.prototype = new SuperType();
Type.prototype.constructor = Type;

var type1 = new Type();
var type2 = new Type();

console.log(type1)
type1.name = 'changeName'
type1.color.push(1)
console.log(type1.constructor)
console.log(type2.color)