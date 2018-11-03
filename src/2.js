import Css from './body.css';
// import Fn from './1.js';

// console.log(Css);
window.onload=()=>{
    let change = document.getElementById('change');
    let total = document.getElementById('total');
    let radioArr = document.getElementsByName('wyq');
    let list = document.getElementById('list');
//   Fn();
class Mt {
    constructor(title = '', total = 0
        , status = 0, list = []) {
        this.title = title;
        this.list = list;

        this.total = total;
        this.status = status;
    }
    change() {
        if (event.keyCode == 13) {
            this.title = event.target.value;
            event.target.value = '';
            // 0 全部
            // 1 完成
            // 2 未完成
            // {
            //    el : '',  
            //    status : 2 
            // }
            this.list.push({
                el : `<p>
                    <div index=${this.list.length} onclick='mt.upStatus()' style="
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background-color: black;" status="2"></div>
                    <p> ${this.title} </p>
                    <b onclick='mt.delList()' index=${this.list.length}> X </b>
                </p>`,
                status: 2
            })
            /// 添加完数据之后  render
            this.render(this.list);
        }
    }
    render(l) {
        // 页面的更新 
        // 递归  ===> 条件  什么时候结束 i > length;
        function listStr(i,arr,str){
            if(typeof arr[i] === "undefined"){
                return str;
            }else{
                str += arr[i].el;
                i++;
                return listStr(i,arr,str);
            }
        }
        list.innerHTML = listStr(0,l,'');
    }
    upStatus() {
       let s =  event.target.getAttribute('status');
       let index = event.target.getAttribute('index');
       console.log(s,index)
       let status = s == 2 ? 1 : 2;
       this.list[Number(index)].status = status;
       event.target.setAttribute('status',status);
       event.target.style.backgroundColor = s == 1 ? 'black' : 'gold';
    }
    delList(){
        let index = event.target.getAttribute('index');
        this.list[Number(index)].el = '';
        this.render(this.list);
    }
    radioChange(){
        // 1. value
        let val = event.target.value;
        // 2. value  ==> list
        //          filter
        let arr = this.list.filter( 
            (value) => {
                return  val == 0 || val == value.status
            }
        )
        // 3. list ===> render
        this.render(arr);
    }
}
// 第一个坑点
let mt = new Mt();
change.onkeydown = mt.change.bind(mt);
for(let i = 0; i < radioArr.length;i++){
    radioArr[i].onchange = mt.radioChange.bind(mt)
}
}