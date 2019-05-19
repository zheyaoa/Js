const o = {
    _age:18,
    get age(){
        return this._age
    },
    set age(newAge){
        this._age = newAge
    }
}
console.log(o.age) 
o.age = 12
console.log(o.age)