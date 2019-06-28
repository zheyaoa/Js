let count = 5;
function addCount(){
    count++
}
module.exports = {
    get count(){
        return count
    },
    addCount
}