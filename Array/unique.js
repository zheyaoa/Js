let unique = (str) => {
    let chars = new Array();
    let strs = [...str];
    for(var i = 0;i<strs.length; i++){
        if(chars[strs[i]-'a'] == undefined){ 
            chars[strs[i]-'a'] =  1;
        }else {
            return false;
        }
    }
    return true;
}
console.log(unique('hello'))