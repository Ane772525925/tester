//本地保存
function setColor(color){
    if (window.localStorage) {
        localStorage.setItem("keyColor",color);
    }//else {
    //     Cookie.write("keyColor",color);
    // }
}
// 本地获取
function getColor(){
    var color = window.localStorage?localStorage.getItem("keyColor"):Cookie.read("keyColor");
    return color;
}
window.onload = function() {
    // 初始化加载
    var color=getColor();
    
    var nav = document.getElementById("nav");
    nav.style.backgroundColor = color;
    console.log(color);

    // 遍历获取颜色，点击并更换颜色
    var colors=[];
    var e = document.getElementsByClassName("color");
    for (var i = 0; i < e.length; i++) {
        colors[i] = window.getComputedStyle(e[i], null).getPropertyValue("background-color");

        e[i].index = i;                //转换保存
        e[i].onclick = function(){

			var n = this.index;      //转换保存
			var nav = document.getElementById("nav");

        	nav.style.backgroundColor = colors[n];

            var color = colors[n];   //转换保存
            // 调用设置保存
            setColor(color);
        }

    }
    //console.log(colors);
}
