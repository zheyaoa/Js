function Set(args=[]){
    this._o = {};
    this.size = 0;
    try{
        for(let key of args){
            this.add(key);
        }
    }catch{
        throw new Error("args need be a Iterator")
    }
}
Set.prototype.add = function(value){
    let key = typeof(value)+value;
    if(!this._o[key]){
        this._o[key] = value;
        this.size++;
    }
    return this;
}
Set.prototype.has = function(value){
    let key = typeof(value)+value;
    return this._o[key] != undefined;
}
Set.prototype.remove = function(value){
    let key = typeof(value)+value;
    delete this._o[key]
}
Set.prototype.clear = function(){
    this._o = {};
    this.size = 0;
}
Set.prototype.size = function(){
    return Object.keys(this._o).length;
}

const set = new Set('abcd');
console.log(set);