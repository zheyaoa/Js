function objWithProto(){
    this.foo = 'foo'
}
objWithProto.prototype.bar = 'bar';

let dict = new objWithProto()
dict.fooBar = 'fooBar'

console.log(dict.hasOwnProperty('foo'))
console.log(dict.hasOwnProperty('bar'))
console.log(dict.hasOwnProperty('fooBar'))
/**
 * 这个方法可以用来检测一个对象是否含有特定的自身属性
语法：obj.hasOwnProperty(prop)
参数：要检测的属性 字符串 名称或者 Symbol
返回值： 用来判断某个对象是否含有指定的属性的 Boolean

for in 会获取到原型链上的可枚举属性
hasOwnProperty 会忽略这个属性
 */