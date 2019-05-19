const proto = {
    sayName(){
        console.log(this.name)
    }
}

const obj = Object.create(proto,{
    _name:{
        writable: true,
        enumerable: false,
        value: 'zheyao'
    },
    name:{
        configurable: false,
        enumerable: true,
        get: function(){
            return this._name
        },
        set: function(value){
            this._name = value
        }
    }
})

for (prop in proto){
    console.log(prop)
}