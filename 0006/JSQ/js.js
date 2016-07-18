function findArr(a, c) {
    for (var b=0; b<a.length; b++) {
        if (a[b]==c) {    //若a中有c，则返回true否则返回false
            return true
        }
    }
    return false
}

function getClass(d, f) {
    if (document.getElementsByClassName) {
        return d.getElementsByClassName(f);
    } else {
        var a = [];
        var e = document.getElementsByTagName("*");
        for (var c=0; c<e.length; c++) {
            var b = e[c].className.split(" ");  //b为类名的分割后的数组
            if (findArr(b, f)) {        //类名数组  和  类名   //返回true/false
                a.push(e[c])            //将e[c]添加到a后
            }
        }
        return a                //a为标签的数组
    }
};
window.onload = function() {
    var aNum = getClass(document, 'num');
    var oText = document.getElementById('text');
    var aPer = getClass(document, 'oper');
    var oPer = document.getElementById('per');
    var oText1 = document.getElementById('text1');
    var oDeng = getClass(document, 'deng')[0];
    var oSq = getClass(document, 'sq')[0];
    var oRec = getClass(document, 'rec')[0];
    var oZheng = getClass(document, 'zheng')[0];
    var oOn = getClass(document, 'on')[0];
    var oOff = getClass(document, 'off')[0];
    var oClea = getClass(document, 'clear')[0];
    var bOnOrOffClick = false;

    function fnNum(a) {
        var bClear = false;
        oText.value = '0'
        for (var i=0; i<aNum.length; i++) {
            aNum[i].onclick = function() {
                    if (!bOnOrOffClick) return;    //为false时跳出for
                    if (bClear) {                   //为true则赋值false
                        bClear = false;
                    }
                    if (oText.value.indexOf('.') != -1) {
                        if (this.innerHTML=='.') {
                            return;
                        }
                    }
                    if (oPer.value&&oText.value&&oText1.value=='') {
                        oText1.value = oText.value;
                        oText.value = '';
                    }
                    var re = /^0\.{1}\d+$/;     //0开头 .一个 [0-9]一次到n次              //有小数点 
                    var re1 = /^([0]\d+)$/;     //  \d=[0-9]  0开头[0-9]一次到n次结尾     //无小数部分
                    oText.value += this.innerHTML;    //返回HTML文本 累加
                    if (re.test(oText.value)) {       //是否存re    小数
                        return;
                    }
                    if (re1.test(oText.value)) {      //是否存re1    整数
                        oText.value = this.innerHTML;   
                    }
                }
                //符号部分的添加
            for (var j=0; j<aPer.length; j++) {
                aPer[j].onclick = function() {
                    if (oText.value && oPer.value && oText1.value) {
                        var n = eval(oText1.value + oPer.value + oText.value);
                        oText.value = n;
                        oText1.value = '';
                    }
                    oPer.value = this.innerHTML;
                }
            }
            //点击等号的时候
            oDeng.onclick = function() {
                    //+-*/%的情况
                    if (oText1.value=='' && oPer.value=='' && oText.value=='') {
                        return;                  //无数值直接跳出
                    }
                    var n = eval(oText1.value + oPer.value + oText.value);
                    oText.value=n;             //eval计算表达式的值
                    oText1.value='';
                    oPer.value='';
                    bClear=true;
                }
                //点击开根号的时候
            oSq.onclick = function() {
                    var m = Math.sqrt(oText.value);
                    oText.value = m;
                }
                //点击倒数的时候
            oRec.onclick = function() {
                    var a=1/oText.value;
                    if (oText.value=='0') {
                        a='正无穷'
                    }
                    oText.value = a;
                }
                //正负号的时候
            oZheng.onclick = function() {
                    if (oText.value>0) {
                        oText.value = -oText.value;
                    } else {
                        oText.value = -oText.value;
                    }
                }
                //清屏的时候
            oClea.onclick = function() {
                oText.value = '0';
                oText1.value = '';
                oPer.value = '';
            }
        }
    }
    //on时
    oOn.onclick = function() {
        bOnOrOffClick = true;     
        fnNum(bOnOrOffClick);
    }
    //off时
    oOff.onclick = function() {
        bOnOrOffClick = false;
        fnNum(bOnOrOffClick);
        oText.value = '';    
    }
}
