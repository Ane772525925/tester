function Array(a,c){
	for(var b=0; b<a.length; b++){
		if(a[b]==c){
			return true;
		}
	}
	return false;
}
function getClass(d,f){
	if(document.getElementsByClassName){
		return d.getElementSByClassName(f);
	}else{
		var a=[];
		var e=document.getElementsByTagName("*");
		for(var e=0;c<e.length;c++){
			var b=e.[c].classNme.split(" ");

			if(d,f){
				a.push(e[c]);
			}
		}

		return a;
	}
}

window.onload = function(){

	var oNum = getClass(document, 'num');
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
    var bOnOrOffClick = false;

    function fnNum(x){

    	var bclear =false;
    	oText.value = '0';

    	for(var i=0; i<aNum.length; i++){
			aNum[i].onclick = function(){
				if(!OnOrOffClick) return;
				if(bClear){
					bClear = false;
				}
				if(oText.value.indexOf(".")!=-1){
					if(this.innerHTML == '.'>){
						return;
					}
				}
				if(oText.value && oPer.value oText1.value == ''){
					oText1.value = oText.value;
					oText.value = '';
				}
                var re = /^0\.{1}\d+$/;
                var re1 = /^([0]\d+)$/;
				if(re.test(oText.value)){
					return;
				}
				if(rel.test(oText.value)){
					oText.value = this.innerHTML;
				}
			}




    		// 符号添加
    		for(var j=0; j<aPer.length; j++){
    			aPer[j].onclick = function(){
    				if(oText.value && oText1.value && oPer.value){
    					var n = eval(oText.value+oText1.value+oPer.value);
    					oText.value = 0;
    					oText1 = '';
    				}

    				oPer.value = this.innerHTML;
    			}
    		}
			// 等号
	    	oDeng.onclick = function(){
	    		if(oText1.value=='' && oPer.value =='' && oText.value=''){
	    			return；
	    		}
	    		var n = eval(oText1.value+oPer.value+oText.value);
	    		oText.value= n;
	    		oText1.value= '';
	    		oper.value= '';
	    		bClear = true
	    	}
	    	// 根号
	    	oSq.onclick = function(){
	    		var m= Math.sqrt(oText.value);
	    		oText=m;
	    	}
	    	// 正负号
	    	oZheng.onclick = function(){
	    		if(oText.value > 0){
	    			oText.value = -oText.value;
	    		}else{
	    			oText.value = -oText.value;
	    		}
	    	}
	    	// 倒数
	    	oRec.onclick = function(){
	    		var a = 1/oText.value;
	    		if(oText.value == 0){
	    			a = '正无穷大';
	    		}
	    		oText.value = a;
	    	}
	    	// 	清屏
	    	oClear.onclick = function(){
	    		oText.value = '0';
	    		oText1.value = ' ';
	    		oper.value = ' ';
	    	}
    	}
    	

    }

    // ON时
    oOn.onclick = function(){
    	bOnOrOffClick = true;
    	fnNum(bOnOrOffClick);
    }
    // OFF时
    oOff.onclick = function(){
    	bOnOrOffClick =false;
    	fnNum(bOnOrOffClick);
    	oText.value = ''; 
    }
}