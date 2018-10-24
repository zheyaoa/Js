/**
 * @todo 用单例模式构造Calendar对象
 */
class Calendar{
    /**
     * @todo 获取calendar单例
     * @returns {Calendar 对象}
     */
    static getSingle(){
        if(!this.instance){
            this.instance = new Calendar()
        }
        return this.instance;
    }
    constructor(){
        let time = new Date();
        this.year = time.getFullYear();
        this.month = time.getMonth();
        this.dom = this._getModel()
        this.setCalendar()
    }
    /**
     * @todo 将日历信息输出到模板中
     */
    setCalendar(year = this.year,month = this.month){
        this.year = year;
        this.month = month;
        this._setCalendarTitle()
        this._clearModel();
        let liArray = this.dom.querySelectorAll('li')
        let time = new　Date(`${year}/${month}/1`);
        let weekends = 1;
        let date = 1;
        while(month == time.getMonth()+1){
            let divArray =  liArray[time.getDay()].querySelectorAll('div');
            divArray[weekends].innerHTML = date;
            if(time.getDay()==6){
                weekends++
            }
            time.setDate(++date)   
        }
    }
    /**
     * @todo 获取静态模板
     * @return {model 日历模板}
     */
    _getModel(){
        let model = document.querySelector('#calendar');
        let html = `
            <h1><span class='year'></span>年<span class='month'></span>月</h1>
            <div class="calendarBox">
                <ul>
                    <li>
                        <div>SUN</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>

                    </li>
                    <li>
                        <div>MON</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>    
                        <div></div>   
                        <div></div>     
                    </li>
                    <li>
                        <div>TUE</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>
                    <li>
                        <div>WED</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>
                    <li>
                        <div>THU</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>
                    <li>
                        <div>FRI</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>
                    <li>
                        <div>SAT</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>    
                </ul>
            </div>
        `
        model.innerHTML = html;
        //给model设置样式
        model.style.fontSize = "18px";
        model.style.textAlign = 'center';
        model.querySelector('.calendarBox ul').style.display = 'flex';
        model.querySelectorAll('div').forEach(div =>{
            div.style.height = '50px'
        })
        model.querySelectorAll('.calendarBox li').forEach(li => {
            li.style.lineHeight = '50px'
            li.style.flex = 1;
            li.style.listStyle = "none";
        })
        return model;
    }
    /**
     * @todo　使model恢复初始状态
     */
    _clearModel(){
        this.dom.querySelectorAll('li').forEach(item =>{
            item.querySelectorAll('div').forEach((div,index) =>{
                if(index>=1){
                    div.innerHTML = ''
                }
            })
        })
    }
    _setCalendarTitle(){
        this.dom.querySelector('.year').innerHTML = this.year;
        this.dom.querySelector('.month').innerHTML = this.month;
    }
}


window.onload = function(){
    const calendar = Calendar.getSingle()
    const btn =  document.querySelector('#submit');
    btn.onclick = () => {
        let year = document.querySelector('.year').value;
        let month = document.querySelector('.month').value;
        calendar.setCalendar(year,month);        
    }
}