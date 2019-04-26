function A(){
    let a = 3;
    this.a = 2;
    setTimeout(function(){
        console.log(a)
    },100) 
    setTimeout(function(){
        console.log(this.a)
    },200)
    setTimeout(()=>{
        console.log(a)
    },300)
    setTimeout(()=>{
        console.log(this.a)
    },400)
}

new A()
console.log(a)