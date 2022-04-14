//获取今日dom
const todayinf = document.querySelector('.content-today') 
const temper = document.querySelectorAll('.content-today > div')[0]
const wether = document.querySelectorAll('.content-today > div')[1]
const wind = document.querySelectorAll('.content-today > div')[2]
const suggestion = document.querySelectorAll('.content-today > div')[3]
//获取未来7日dom
const content_future = document.querySelector('.content-future')
const date_future = document.querySelectorAll('.date-future > div')
const wether_future = document.querySelectorAll('.wether-future > div')
const temper_future = document.querySelectorAll('.temper-future > div')
//获取生活dom元素
const life = document.querySelectorAll('.content-life > div >div')
const content_life = document.querySelector('.content-life')
const lifesta = document.querySelectorAll('.lifesta')
const lifesug = document.querySelectorAll('.lifesug')
//位置信息dom元素
const place = document.querySelector('.city')
//历史信息
const his = document.querySelector('.history')
const his_wrap = document.querySelectorAll('.history > div')
const his_item = document.querySelectorAll('.history-item')
const guanbi = document.querySelectorAll('.guanbi')
let hissum = 0
//define 搜索函数
const getplace = (cities) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(`GET`, `https://www.yiketianqi.com/free/day?appid=45624616&appsecret=wnsloa5x&city=${cities}&unescape=1`, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    let res = JSON.parse(xhr.response);
                    resolve(res)
                }else{
                    reject('请求失败')
                }
            }
        }
    })
}
const getfuture = (cities) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(`GET`, `https://yiketianqi.com/api?unescape=1&version=v1&appid=45624616&appsecret=wnsloa5x&city=${cities}`, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    let res = JSON.parse(xhr.response);
                    resolve(res)
                }else{
                    reject('请求失败')
                }
            }
        }
    })
}
//搜索框dom元素
const input = document.querySelector('.input')
const searchicon = document.querySelectorAll('.iconfont')[1]
const search = document.querySelector('.search')
let index = 0;
window.onkeydown = function (ev){
    let event = ev
    if(event.keyCode == 13){
        search.style.display = 'none'
        back.style.display = 'block'
        getfuture(input.value)
        .then((future) =>{
            wether.innerText = future.data[0].wea
            suggestion.innerText = future.data[0].air_tips
            for(let i = 0;i<7;i++){
                date_future[i].innerText = future.data[i].day
                wether_future[i].innerText = future.data[i].wea
                temper_future[i].innerText = future.data[i].tem1 + '/' + future.data[i].tem2
            }
            for(let i = 0;i<4;i++){
                lifesta[i].innerText = future.data[0].index[i].title + ':' + future.data[0].index[i].level
                lifesug[i].innerText = future.data[0].index[i].desc
            }
        })
        getplace(input.value)
        .then((today) => {
            if(today.city == undefined){
                alert('查询失败！请核对城市名称是否输入正确')
                search.style.display = 'block'
                back.style.display = 'none'
                input.value = null
            }else{
                index = 1
                navs[1].className = 'navbtnsselect'
                place.innerText = today.city
                todayinf.style.display = 'block'
                temper.innerText = today.tem + '℃'
                wind.innerText = today.win
                his_item[hissum].innerText = today.city
                his_wrap[hissum].style.display = 'flex'
                if(hissum == 5){hissum = 0}
                hissum++
            }
        })
    }
}
searchicon.onclick = ()=>{
    search.style.display = 'none'
        back.style.display = 'block'
        getfuture(input.value)
        .then((future) =>{
            wether.innerText = future.data[0].wea
            suggestion.innerText = future.data[0].air_tips
            for(let i = 0;i<7;i++){
                date_future[i].innerText = future.data[i].day
                wether_future[i].innerText = future.data[i].wea
                temper_future[i].innerText = future.data[i].tem1 + '/' + future.data[i].tem2
            }
            for(let i = 0;i<4;i++){
                lifesta[i].innerText = future.data[0].index[i].title + ':' + future.data[0].index[i].level
                lifesug[i].innerText = future.data[0].index[i].desc
            }
        })
        getplace(input.value)
        .then((today) => {
            console.log(today.city);
            if(today.city == undefined){
                alert('查询失败！请核对城市名称是否输入正确')
                search.style.display = 'block'
                back.style.display = 'none'
                input.value = null
            }else{
                index = 1
                navs[1].className = 'navbtnsselect'
                place.innerText = today.city
                todayinf.style.display = 'block'
                temper.innerText = today.tem + '℃'
                wind.innerText = today.win
                his_item[hissum].innerText = today.city
                his_wrap[hissum].style.display = 'flex'
                if(hissum == 5){hissum = 0}
                hissum++
            }
        })
}
//导航条dom元素及切换
const navs = document.querySelectorAll(".nav > div")
navs[0].onclick = () => {
    if(index == 1){
        for(let k = 0;k < navs.length;k++){
            navs[k].className = 'navbtns'
        }
        navs[0].className = 'navbtnsselect'
        todayinf.style.display = 'none'
        content_future.style.display = 'flex'
        content_life.style.display = 'none'
    }
}
navs[1].onclick = () => {
    if(index == 1){
        for(let k = 0;k < navs.length;k++){
            navs[k].className = 'navbtns'
        }
        navs[1].className = 'navbtnsselect'
        todayinf.style.display = 'block'
        content_future.style.display = 'none'
        content_life.style.display = 'none'
    }
}
navs[2].onclick = () => {
    if(index == 1){
        for(let k = 0;k < navs.length;k++){
            navs[k].className = 'navbtns'
        }
        navs[2].className = 'navbtnsselect'
        todayinf.style.display = 'none'
        content_future.style.display = 'none'
        content_life.style.display = 'block'
    }
}
//返回键
const back = document.querySelector('.back')
back.onclick = ()=>{
    back.style.display = 'none'
    search.style.display = 'block'
    place.innerText = '位置信息未确定'
    todayinf.style.display = 'none'
    content_future.style.display = 'none'
    content_life.style.display = 'none'
    index = 0
    input.value = null
    for(let k = 0;k < navs.length;k++){
        navs[k].className = 'navbtns'
    }
}
//历史记录显示
input.onfocus = function(){
    if(hissum > 0){
        his.style.display = 'block'  
    }
}
//历史记录消失
//清除历史记录
for(let i = 0;i<guanbi.length;i++){
    guanbi[i].onclick = () => {
        his_wrap[i].style.display = 'none'
        his.style.display = 'none'
        hissum--
    }
}
//点击历史记录
for(let i = 0;i < his_item.length;i++){
    his_item[i].onclick = () => {
        his.style.display = 'none'
        search.style.display = 'none'
        back.style.display = 'block'
        getfuture(his_item[i].innerText)
        .then((future) =>{
            wether.innerText = future.data[0].wea
            suggestion.innerText = future.data[0].air_tips
            for(let i = 0;i<7;i++){
                date_future[i].innerText = future.data[i].day
                wether_future[i].innerText = future.data[i].wea
                temper_future[i].innerText = future.data[i].tem1 + '/' + future.data[i].tem2
            }
            for(let i = 0;i<4;i++){
                lifesta[i].innerText = future.data[0].index[i].title + ':' + future.data[0].index[i].level
                lifesug[i].innerText = future.data[0].index[i].desc
            }
        })
        getplace(his_item[i].innerText)
        .then((today) => {
            if(today.city == undefined){
                alert('查询失败！请核对城市名称是否输入正确')
                search.style.display = 'block'
                back.style.display = 'none'
                input.value = null
            }else{
                index = 1
                navs[1].className = 'navbtnsselect'
                place.innerText = today.city
                todayinf.style.display = 'block'
                temper.innerText = today.tem + '℃'
                wind.innerText = today.win
                his_item[hissum].innerText = today.city
                his_wrap[hissum].style.display = 'flex'
                if(hissum == 5){hissum = 0}
                hissum++
            }
        })
    }
}