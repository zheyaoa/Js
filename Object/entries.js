const obj = { 0: 'a', 1: 'b', 2: 'c' };

for([key,value] of Object.entries(obj)){
    console.log(key,value)
    console.log(value)
}