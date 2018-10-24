/**
 * @todo 模拟一个简单的ajax,用promise实现基本功能
 * @param {url 请求借口}
 * @param {method 请求方式}
 * @param {data 传输数据对象}
 * @param {async 是否异步调用}
 */
class Ajax{
    static get(url,data = {},async = true){
        console.log('GET')
        this.method = 'GET';
        this._init(url,data,async);
        return this.promise;
    }
    static post(url,data = {},async = true){
        this.method = 'POST';
        this._init(url,data,async);
        return this.promise;
    }
    static _init(url,data,async){
        this.url = url;
        this.data = data;
        this.async =  async;
        this.xhr = this._createXmlHttpRequest();
        this.xhr.onreadystatechange = this._onReadyStateChange;
        console.log(this.xhr.onreadystatechange)
        this.promise = new Promise((resolve,reject) => {
            this._sendXhr()
        });
    }
    static _createXmlHttpRequest(){
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            //IE浏览器
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        return xhr;
    }
    static _onReadyStateChange(){
        if(this.xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(this.xhr.response)
                return this.promise.resolve(this.xhr.response)
            }else{
                return this.promise.reject(new Error(this.xhr.statusText))
            }
        }
    }
    /**
     * @todo 创建,请求连接。如果是get请求，则将数据进行处理。
     */
    static _sendXhr(){
        console.log(this.prototype)
        if(this.method == 'GET'){
            let data = '';
            let url = this.url;
            for(let key in this.data){
                data += `&${key}=${this.data[key]}`;
            }
            url = url +'?' +data;
            url =  url.replace(/\?&/,"&");
            this.xhr.open(this.method,url,this.async);
            this.xhr.send();
        }else{
            this.xhr.open(this.method,this.url,this.async)
            let data = JSON.stringify(this.data);
            this.xhr.send(data)
        }
    }

}

window.onload = function(){
    Ajax.get('https://www.easy-mock.com/mock/5bc8276c6370ce7431ecbf43/SignInSystem/selectEnterprises')
}