function Animals(name){
    this.name = name|| 'Animals'
    //实例
    this.sleep = function(){
        console.log(this.name + "正在睡觉")
    }
}
//原型属性
Animals.prototype.eat = function(food){
    console.log(`${this.name} eat ${food}`)
}


//第一种继承方式 原型链继承
function Cat(){}
Cat.prototype = new Animals();
Cat.prototype.name = 'cat'
var cat = new Cat()
console.log(cat.name)
cat.sleep()
cat.eat("fish")
console.log(Cat.prototype.constructor)
console.log(cat instanceof Cat)
console.log(cat instanceof Animals)
console.log("")


//构造函数继承
function Dog(name){
    Animals.call(this,name)
}
const dog = new Dog('dog');
console.log(dog.name)
console.log(Dog.prototype.constructor)
console.log(dog instanceof Dog)
console.log(dog instanceof Animals)
console.log("")


//组合继承
function Tiger(name,age){
    Animals.call(this,name)
    this.age = age;
}
Tiger.prototype = new Animals();
Tiger.prototype.constructor = Tiger;
const tiger = new Tiger("tiger","20")
console.log(tiger.name)
tiger.sleep()
tiger.eat("fish")
console.log(tiger)
console.log(tiger instanceof Tiger)
console.log(tiger instanceof Animals)
console.log("")


//寄生组合继承
function Bird(name,size){
    Animals.call(this,name)
    this.size = size
}
Bird.prototype = Object.create(Animals.prototype)
Bird.prototype.constructor = Bird
const bird = new Bird("bird","small")
console.log(bird.name)
bird.eat("bird food")
console.log(bird instanceof Bird)
console.log(bird instanceof Animals)
console.log(bird)