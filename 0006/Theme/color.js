function setColor(color){
    if (window.localStorage) {
        localStorage.setItem("keyColor",color);
    } else {
        Cookie.write("keyColor",color);
    }
}
function getColor(){
    var color = window.localStorage?localStorage.getItem("keyColor"):Cookie.read("keyColor");
    return color;
}
window.onload = function() {

    var color=getColor();
    
    var nav = document.getElementById("nav");
    nav.style.backgroundColor = color;
    console.log(color);


    var colors=[];
    var e = document.getElementsByClassName("color");
    for (var i = 0; i < e.length; i++) {
        colors[i] = window.getComputedStyle(e[i], null).getPropertyValue("background-color");

        e[i].index = i;
        e[i].onclick = function(){

			var n = this.index;
			var nav = document.getElementById("nav");

        	nav.style.backgroundColor = colors[n];

            var color = colors[n];
            setColor(color);
        }

    }
    //console.log(colors);
}
