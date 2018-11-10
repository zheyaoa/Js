{
    class VueDemo{
        constructor(options = {}){
            this.$option = options;
            Object.keys(this.$option.data).forEach(key => {
                this.proxyKeys(key)
            })
            Observer(this.$option.data);
            new Compile(options.el,this)
        }
        /**
         * @todo 实现this.data.key 和 this.key 的绑定
         * @param {Object key} key 
         */
        proxyKeys(key){
            Object.defineProperty(this,key,{
                get(){//实现了this.data.key 与 this.key的同步
                    return this.$option.data[key]
                },
                set(newValue){
                    this.$option.data[key] = newValue;
                }
            })
        }
    }

    /**
     * @todo observer 的职责是监听 Model(JS 对象) 的变化，
     * 最核心的部分就是用到了 Object.defineProperty() 的 get 和 set 方法，
     * 当要获取 Model(JS 对象) 的值时，会自动调用 get 方法；当改动了 Model(JS 对象) 的值时，
     * 会自动调用 set 方法；从而实现了对数据的劫持。
     */
    function Observer(data){
        if(!data||typeof(data)!== 'object'){
            return
        }
        Object.keys(data).forEach(key => {
            defineReactive(data,key,data[key])
        })
    }
    function defineReactive(data,key,value){
        let dep = new Dep();
        Object.defineProperty(data,key,{
            get(){
                if(Dep.target){
                    dep.addSub(Dep.target)
                }
                return value;
            },
            set(newValue){
                if(value === newValue || (newValue!== newValue&& value !== value)){
                    return
                }
                value = newValue;
                dep.notify()
            }
        })
    }

    /**
     * @todo  Dep(订阅者数组) 和 Watcher(订阅者) 的关系
     *  观测到变化后，我们总要通知给特定的人群，让他们做出相应的处理吧。
     * 为了更方便地理解，我们可以把订阅当成是订阅了一个微信公众号，
     * 当微信公众号的内容有更新时，那么它会把内容推送(update) 到订阅了它的人。
     */
    class Dep {
        constructor(){}
        addSub(sub){//添加订阅者
            Dep.subs.push(sub)    
        }
        notify(){//通知订阅者更新
            Dep.subs.forEach(sub => {
                sub.update();
            })
        }
    }
    Dep.subs = [];
    /**
     * @param {type} vm [Mvvm实例]
     * @param {type} exp 改变的值
     * @param {cb} 回调函数callback
     */
    class Watcher{
        constructor(vm,exp,cb){
            this.vm = vm;
            this.exp =exp;
            this.cb = cb;
            this.depId = null;
            this.value = this.get();
        }
        update(){
            this.run();
        }
        run(){
            let newValue = this.get();
            let value = this.value;
            if(newValue === value){
                return
            }
            this.cb.call(this.vm,newValue,value)
        }
        get(){
            Dep.target = this;
            const value = this.vm.$option.data[this.exp];
            Dep.target = null
            return value
        }
    }

    class Compile{
        constructor(el,vm){
            console.log(this)
            this.vm = vm;
            this.el = document.querySelector(el);
            this.fragment = null
            this.init();
        }
        init(){
            if(this.el){
                this.fragment = this.nodeToFragment(this.el);//将节点转为fragment文档碎片
                this.compileElement(this.fragment);//对fragment进行编译解析
                this.el.appendChild(this.fragment)
            }
        }
        nodeToFragment(el){
            const fragment = document.createDocumentFragment()
            let child = el.firstChild;//firstChild 是 text
            while(child){
                fragment.appendChild(child)
                child = el.firstChild
            }
            return  fragment
        }
        compileElement(el){
            let childNodes = [...el.childNodes];
            childNodes.forEach(node => {
                let text = node.textContent;
                let reg = /\{\{((?:.|\n)+?)\}\}/;
                //如果是element节点
                if(Compile.isElementNode(node)){
                    this.complie(node)
                }else if(Compile.isTextNode(node)&&reg.test(text)){
                    //如果是text节点，匹配第一个选项
                    this.compileText(node,RegExp.$1.trim())
                }
                //解析子节点包含的指令
                if(node.childNodes&&node.childNodes.length){
                    this.compileElement(node)
                }
            })
        }
        //指令解析
        complie(node){
            let nodeAttrs = node.attributes;
            [...nodeAttrs].forEach(attr => {
                let attrName = attr.name;
                if(this.isDirective(attrName)){
                    let exp = attr.value;
                    let dir = attrName.substring(2);
                    //如果是事件指令
                    if(this.isEventDirective(dir)){
                        compileUtil.eventHandler(node, this.vm, exp, dir);
                    }
                    //普通指令
                    else{
                        compileUtil[dir]&&compileUtil[dir](node, this.vm, exp)
                    }
                    //删除属性
                    node.removeAttribute(attrName)
                }
            })
        }
        compileText(node,exp){
            compileUtil.text(node,this.vm,exp)
        }
        //m-xxx指令判定
        isDirective(attr){
            return attr.startsWith('m-');
        }
        //m-on指令判定
        isEventDirective(attr){
            return attr.startsWith('on');
        }
        static isElementNode(node){
            return node.nodeType == 1;
        }
        static isTextNode(node){
            return node.nodeType == 3;
        }
    }

    const compileUtil = {
        //定义$elm,用来保存正在执行input事件的el元素
        $elm:null,
        timer:null,
        html(node,vm,exp){
            this.bind(node,vm,exp,'html')
        },
        text(node, vm, exp) {
            this.bind(node, vm, exp, 'text');
        },
        model(node,vm,exp){
            this.bind(node,vm,exp,'model');
            let val = this._getVmVal(vm,exp);
            node.addEventListener('input',(e)=>{
                let newVal = e.target.value; 
                this.$elm =  node
                if(val === newVal){
                    return 
                }
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this._setVmVal(vm,exp,newVal)
                    val = newVal
                },100)
            })             
        },
        class(node,vm,exp){
            this.bind(node,vm,exp,'class')
        },
        bind(node,vm,exp,dir){
            let updateFn = updater[`${dir}Updater`];
            //如果该函数存在，则执行对应数据的渲染
            updateFn&&updateFn(node,this._getVmVal(vm,exp));
            //给该node添加监听器
            new Watcher(vm,exp,function(value,oldValue){
                updateFn&&updateFn(node,value,oldValue)
            })

        },
        eventHandler(node,vm,exp,dir){
            let eventType = dir.split(':')[1];
            let fn = vm.$option.methods&&vm.$option.methods[exp];
            if(eventType&&fn){
                node.addEventListener(eventType,fn.bind(vm),false);
            }
        },
        //获取挂载在vm实例下的值
        _getVmVal(vm,exp){
            let value = vm.$option.data;
            let keys = exp.split(':');
            keys.forEach(key => {
                key = key.trim();
                value = value[key];
            })
            return value
        },
        _setVmVal(vm,exp,newVal){
            let value = vm.$option.data;
            keys = exp.split('.');
            keys.forEach((key,index) => {
                key = key.trim();
                console.log(index)
                if(index<keys.length-1){
                    value = value[key];
                }else{
                    value[key] = newVal;
                }
            })
        }
    }
    //指令渲染集合，将data中的值渲染到页面中
    const updater = {
        htmlUpdater(node,value){
            node.innerHTML = typeof value === 'undefined'?'':value;
        },
        textUpdater(node,value){
            node.textContent = typeof value === 'undefined'?'':value
        },
        classUpdater(){
            return
        },
        modelUpdater(node,value,oldValue){
            //不对触发input的dom进行渲染
            if(node === compileUtil.$elm){
                return
            }
            compileUtil.$elm = null;
            node.value = typeof value == 'undefined'?'':value;
        }
    }
    window.Mvvm = VueDemo
}
window.onload = function(){
    window.mv = new Mvvm({
        el: '#app',
        data: {
          a: 'content is a',
          b: 'content is b',
          text:'hello'
        },
        methods:{
            handleClick(){
                alert('click')
            }
        }
    })
}