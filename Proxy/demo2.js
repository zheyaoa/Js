const target = () => 'I am the taeget';
const handler = () => 'I am the proxy';

const p = new Proxy(target,handler)
console.log(p());
