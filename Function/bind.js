function add(arg1,arg2){
    return arg1+arg2;
}
var getArguements = add.bind(null,123);
console.log(getArguements(231));

function list(){
    return Array.prototype.slice.call(arguments);
}
var addList = list.bind(null,12);
var lists = addList(123,234,65);
console.log(lists);


function LateBloomer() {
    this.petalCount = Math.ceil(Math.random() * 12) + 1;
  }
  
  // 在 1 秒钟后声明 bloom
  LateBloomer.prototype.bloom = function() {
    setTimeout(this.declare.bind(this), 1000);
  };
  
  LateBloomer.prototype.declare = function() {
    console.log('I am a beautiful flower with ' +
      this.petalCount + ' petals!');
  };
  
  var flower = new LateBloomer();
  flower.bloom();  // 一秒钟后, 调用'declare'方法


var slice = Array.prototype.slice;

console.log(slice.call([1,2,3],1));

var slice2 = Function.prototype.call.bind(slice);
console.log(slice2([1,2,3,4,5],3))