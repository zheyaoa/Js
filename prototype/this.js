function Person1(){
    Person1.prototype = {
        constructor:Person1,
        name:'yyx',
        sayName:function(){
            console.log(this.name)
        }
    }
}
function Person2(){
    this.age = 20
    Person2.prototype.name = 'yyx';
    Person2.prototype.sayName = function(){
        console.log(this.prototype)
    }
}

var p2 = new Person2();
p2.sayName()