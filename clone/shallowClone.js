

let shallowClone = (source) => {
    let copySource = {} 
    for (const item in source) {
        if(source.hasOwnProperty(item)){
            copySource[item] = source[item]
        }
    }
    return copySource
}

let clone = (source) => {
    let copySource = {}
    for (const item in source){
        if(source.hasOwnProperty(item)){
            console.log(typeof source[item])
            if(typeof source[item] === 'object'){
                copySource[item] = clone(source[item])
            }else{
                copySource[item] = source[item]
            }
        }
    }
    return copySource
}

Object.prototype.equals = function (x,y){
    for (const i in  x) {
        if(x.hasOwnProperty(i)&&y.hasOwnProperty(i)){
            //判断是否ｉ是否为对象
            if(typeof x[i] == 'object'){
                if(typeof y[i] != 'object') return false
                else if(!Object.equals(x[i],y[i])) return false
            }else{
                if(x[i] != y[i]) return false
            }
        }
    }
    //避免x是ｙ的子集的情况
    for(const i in y){
        if(!x.hasOwnProperty(i)&&y.hasOwnProperty(i)) return false
    }
    return true;
}
let a = {a:1,b:{c:1}}
let b = {a:1,b:{c:1}}
console.log(Object.equals(a,b))