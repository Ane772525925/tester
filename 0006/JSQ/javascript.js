function findArr(a, c) {
    for (var b = 0; b < a.length; b++) {
        if (a[b] == c) {
            return true;
        }
    }
    return false;
}

function getClass(d, f) {
    if (document.getElementsByClassName) {
        return d.getElementsByClassName(f);
    } else {
        var a = [];
        var e = document.getElementsByTagName("*");
        for (var c = 0; c < e.length; c++) {
            var b = e[c].className.split(" ");
            if (findArr(b, f)) {
                a.push(e[c]);
            }
        }
        return a;
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
    var oClear = getClass(document, 'clear')[0];
    var oSin = getClass(document, 'sin')[0];
    var oCos = getClass(document, 'cos')[0];
    var oTan = getClass(document, 'tan')[0];
    var oPi = getClass(document, 'pi')[0];
    var bOnOrOffClick = false;

    function fnNum(a) {
        var bClear = false;
        oText.value = '0'
        for (var i = 0; i < aNum.length; i++) {
            aNum[i].onclick = function() {

                    if (!bOnOrOffClick) return;
                    if (bClear) {
                        bClear = false;
                    }
                    if (oText.value.indexOf('.') != -1) {
                        if (this.innerHTML == '.') {
                            return;
                        }
                    }
                    if (oPer.value && oText.value && oText1.value == '') {
                        oText1.value = oText.value;
                        oText.value = '';
                    }
                    var re = /^0\.{1}\d+$/;
                    var re1 = /^([0]\d+)$/;
                    oText.value += this.innerHTML;
                    if (re.test(oText.value)) {
                        return;
                    }
                    if (re1.test(oText.value)) {
                        oText.value = this.innerHTML;
                    }
                }
                //符号部分的添加
            for (var j = 0; j < aPer.length; j++) {
                aPer[j].onclick = function() {
                    if (oText.value && oPer.value && oText1.value) {
                        var n = eval(oText.value + oPer.value + oText1.value);
                        oText.value = n;
                        oText1.value = '';
                    }
                    oPer.value = this.innerHTML;
                }
            }
            //点击等号的时候
            oDeng.onclick = function() {
                    //+-*/%的情况
                    if (oText1.value == '' && oPer.value == '' && oText.value == '') {
                        return;
                    }
                    var n = eval(oText1.value + oPer.value + oText.value);
                    var re = /^[0-9]*\.{1}[0-9]+$/; // 小数测试  /^0\.{1}\d+$/
                    if (re.test(n)) {
                        n = parseFloat(n.toFixed(3));
                    }
                    oText.value = n;
                    oText1.value = '';
                    oPer.value = '';
                    bClear = true;
                }
                //点击开根号的时候
            oSq.onclick = function() {
                    var m = Math.sqrt(oText.value);
                    var re = /^[0-9]*\.{1}[0-9]+$/; // 小数测试  /^0\.{1}\d+$/
                    if (re.test(m)) {
                        m = parseFloat(n.toFixed(7));
                    }
                    oText.value = m;
                }
                //点击倒数的时候
            oRec.onclick = function() {
                    var a = 1 / oText.value;
                    var re = /^[0-9]*\.{1}[0-9]+$/; // 小数测试  /^0\.{1}\d+$/
                    if (oText.value == '0') {
                        a = '正无穷'
                    } else if (re.test(a)) {
                        a = parseFloat(a.toFixed(7));
                    }
                    oText.value = a;
                }
                //正负号的时候
            oZheng.onclick = function() {
                    oText.value = -oText.value;
                }
                //清屏的时候
            oClear.onclick = function() {
                    oText.value = '0';
                    oText1.value = '';
                    oPer.value = '';
                }
                // sin的时候
            oSin.onclick = function() {
                    var s = Math.sin(oText.value).toFixed(7);
                    oText.value = s;
                }
                // cos的时候
            oCos.onclick = function() {
                    var c = Math.cos(oText.value).toFixed(7);
                    oText.value = c;
                }
                // tan的时候
            oTan.onclick = function() {
                    var t = Math.tan(oText.value).toFixed(7);
                    oText.value = t;
                }
                // PI
            oPi.onclick = function() {
                oText.value = Math.PI.toFixed(7);
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



element.attachEvent('onclick', function(){
        // ...
    });