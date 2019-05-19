const book = {}

Object.defineProperties(book,{
    _name: {
        writable: true,
        value: '战争与和平'
    },
    name: {
        enumerable:true,
        set: function(value){
            this._name = value
        },
        get: function(){
            return this._name
        }
    }
})

console.log(book)
console.log(book.name)
book.name = 'shdj'
console.log(book.name)

