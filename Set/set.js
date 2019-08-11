    function Set(data){
        this._values = [];
        this.size = 0;

        if(data){
            try{
                for(let item of data){
                    this.add(item)
                }
            }catch{
                throw('not a iterable')
            }
        }
    }
    Set.prototype.add = function(item){
        if(!this.has(item)){
            this._values.push(item)
            this.size ++ 
        }
        return this
    }
    Set.prototype.has = function(item){
        return this._values.includes(item)
    }
    Set.prototype.delete = function(item){
        if(!this.has(item)){
            return false
        }
        try{
            this._values.splice(this._values.indexOf(item),1)
            this.size--
        }catch(e){
            return false
        }
    }
    Set.prototype.clear = function(){
        this.size = 0
        this._values = []
    }
