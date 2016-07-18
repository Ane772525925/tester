
<SCRIPT language=javascript>
<!--
var endNumber=true
var mem=0
var carry=10
var hexnum="0123456789abcdef"
var angle="d"
var stack=""
var level="0"
var layer=0


//数字键

function inputkey(key)
{
	var index=key.charCodeAt(0);
	if ((carry==2 && (index==48 || index==49))
	 || (carry==8 && index>=48 && index<=55)
	 || (carry==10 && (index>=48 && index<=57 || index==46))
	 || (carry==16 && ((index>=48 && index<=57) || (index>=97 && index<=102))))
	if(endNumber)
	{
		endNumber=false
		document.calc.display.value = key
	}
	else if(document.calc.display.value == null || document.calc.display.value == "0")
		document.calc.display.value = key
	else
		document.calc.display.value += key
}

function changeSign()
{
    if (document.calc.display.value!="0")
    	if(document.calc.display.value.substr(0,1) == "-")
        	document.calc.display.value = document.calc.display.value.substr(1)
    	else
        	document.calc.display.value = "-" + document.calc.display.value
}

//函数键

function inputfunction(fun,shiftfun)
{
	endNumber=true
	if (document.calc.shiftf.checked)
		document.calc.display.value=decto(funcalc(shiftfun,(todec(document.calc.display.value,carry))),carry)
	else
		document.calc.display.value=decto(funcalc(fun,(todec(document.calc.display.value,carry))),carry)
	document.calc.shiftf.checked=false
	document.calc.hypf.checked=false	
	inputshift()
}

function inputtrig(trig,arctrig,hyp,archyp)
{
	if (document.calc.hypf.checked)
		inputfunction(hyp,archyp)
	else
		inputfunction(trig,arctrig)
}


//运算符

function operation(join,newlevel)
{
	endNumber=true
	var temp=stack.substr(stack.lastIndexOf("(")+1)+document.calc.display.value
	while (newlevel!=0 && (newlevel<=(level.charAt(level.length-1))))
	{
		temp=parse(temp)
		level=level.slice(0,-1)
	}
	if (temp.match(/^(.*\d[\+\-\*\/\%\^\&\|x])?([+-]?[0-9a-f\.]+)$/))
		document.calc.display.value=RegExp.$2
	stack=stack.substr(0,stack.lastIndexOf("(")+1)+temp+join
	document.calc.operator.value=" "+join+" "
	level=level+newlevel
	
}

//括号

function addbracket()
{
	endNumber=true
	document.calc.display.value=0
	stack=stack+"("
	document.calc.operator.value="   "
	level=level+0
	
	layer+=1
	document.calc.bracket.value="(="+layer
}

function disbracket()
{
	endNumber=true
	var temp=stack.substr(stack.lastIndexOf("(")+1)+document.calc.display.value
	while ((level.charAt(level.length-1))>0)
	{
		temp=parse(temp)
		level=level.slice(0,-1)
	}
	
	document.calc.display.value=temp
	stack=stack.substr(0,stack.lastIndexOf("("))
	document.calc.operator.value="   "
	level=level.slice(0,-1)

	layer-=1
	if (layer>0)
		document.calc.bracket.value="(="+layer
	else
		document.calc.bracket.value=""
}

//等号

function result()
{
	endNumber=true
	while (layer>0)
		disbracket()
	var temp=stack+document.calc.display.value
	while ((level.charAt(level.length-1))>0)
	{
		temp=parse(temp)
		level=level.slice(0,-1)
	}

	document.calc.display.value=temp
	document.calc.bracket.value=""
	document.calc.operator.value=""
	stack=""
	level="0"
}


//修改键

function backspace()
{
	if (!endNumber)
	{
		if(document.calc.display.value.length>1)
			document.calc.display.value=document.calc.display.value.substring(0,document.calc.display.value.length - 1)
		else
			document.calc.display.value=0
	}
}

function clearall()
{
	document.calc.display.value=0
	endNumber=true
	stack=""
	level="0"
	layer=""
	document.calc.operator.value=""
	document.calc.bracket.value=""
}


//转换键

function inputChangCarry(newcarry)
{
	endNumber=true
	document.calc.display.value=(decto(todec(document.calc.display.value,carry),newcarry))
	carry=newcarry

	document.calc.sin.disabled=(carry!=10)
	document.calc.cos.disabled=(carry!=10)
	document.calc.tan.disabled=(carry!=10)
	document.calc.bt.disabled=(carry!=10)
	document.calc.pi.disabled=(carry!=10)
	document.calc.e.disabled=(carry!=10)
	document.calc.kp.disabled=(carry!=10)
				
	document.calc.k2.disabled=(carry<=2)
	document.calc.k3.disabled=(carry<=2)
	document.calc.k4.disabled=(carry<=2)
	document.calc.k5.disabled=(carry<=2)
	document.calc.k6.disabled=(carry<=2)
	document.calc.k7.disabled=(carry<=2)
	document.calc.k8.disabled=(carry<=8)
	document.calc.k9.disabled=(carry<=8)
	document.calc.ka.disabled=(carry<=10)
	document.calc.kb.disabled=(carry<=10)
	document.calc.kc.disabled=(carry<=10)
	document.calc.kd.disabled=(carry<=10)
	document.calc.ke.disabled=(carry<=10)
	document.calc.kf.disabled=(carry<=10)

	
	
}

function inputChangAngle(angletype)
{
	endNumber=true
	angle=angletype
	if (angle=="d")
		document.calc.display.value=radiansToDegress(document.calc.display.value)
	else
		document.calc.display.value=degressToRadians(document.calc.display.value)
	endNumber=true
}

function inputshift()
{
	if (document.calc.shiftf.checked)
	{
		document.calc.bt.value="deg "
		document.calc.ln.value="exp "
		document.calc.log.value="expd"
		
		if (document.calc.hypf.checked)
		{
			document.calc.sin.value="ahs "
			document.calc.cos.value="ahc "
			document.calc.tan.value="aht "
		}
		else
		{
			document.calc.sin.value="asin"
			document.calc.cos.value="acos"
			document.calc.tan.value="atan"
		}
		
		document.calc.sqr.value="x^.5"
		document.calc.cube.value="x^.3"
		
		document.calc.floor.value="小数"
	}
	else
	{
		document.calc.bt.value="d.ms"
		document.calc.ln.value=" ln "
		document.calc.log.value="log "

		if (document.calc.hypf.checked)
		{
			document.calc.sin.value="hsin"
			document.calc.cos.value="hcos"
			document.calc.tan.value="htan"
		}
		else
		{
			document.calc.sin.value="sin "
			document.calc.cos.value="cos "
			document.calc.tan.value="tan "
		}
		
		document.calc.sqr.value="x^2 "
		document.calc.cube.value="x^3 "
		
		document.calc.floor.value="取整"
	}

}
//存储器部分

function clearmemory()
{
	mem=0
	document.calc.memory.value="   "
}

function getmemory()
{
	endNumber=true
	document.calc.display.value=decto(mem,carry)
}

function putmemory()
{
	endNumber=true
	if (document.calc.display.value!=0)
	{
		mem=todec(document.calc.display.value,carry)
		document.calc.memory.value=" M "
	}
	else
		document.calc.memory.value="   "
}

function addmemory()
{
	endNumber=true
	mem=parseFloat(mem)+parseFloat(todec(document.calc.display.value,carry))
	if (mem==0)
		document.calc.memory.value="   "
	else
		document.calc.memory.value=" M "
}

function multimemory()
{
	endNumber=true
	mem=parseFloat(mem)*parseFloat(todec(document.calc.display.value,carry))
	if (mem==0)
		document.calc.memory.value="   "
	else
		document.calc.memory.value=" M "
}

//十进制转换

function todec(num,oldcarry)
{
	if (oldcarry==10 || num==0) return(num)
	var neg=(num.charAt(0)=="-")
	if (neg) num=num.substr(1)
	var newnum=0
	for (var index=1;index<=num.length;index++)
		newnum=newnum*oldcarry+hexnum.indexOf(num.charAt(index-1))
	if (neg)
		newnum=-newnum
	return(newnum)
}

function decto(num,newcarry)
{
	var neg=(num<0)
	if (newcarry==10 || num==0) return(num)
	num=""+Math.abs(num)
	var newnum=""
	while (num!=0)
	{
		newnum=hexnum.charAt(num%newcarry)+newnum
		num=Math.floor(num/newcarry)
	}
	if (neg)
		newnum="-"+newnum
	return(newnum)
}

//表达式解析

function parse(string)
{
	if (string.match(/^(.*\d[\+\-\*\/\%\^\&\|x\<])?([+-]?[0-9a-f\.]+)([\+\-\*\/\%\^\&\|x\<])([+-]?[0-9a-f\.]+)$/))
		return(RegExp.$1+cypher(RegExp.$2,RegExp.$3,RegExp.$4))
	else
		return(string)
}

//数学运算和位运算

function cypher(left,join,right)
{
	left=todec(left,carry)
	right=todec(right,carry)
	if (join=="+")
		return(decto(parseFloat(left)+parseFloat(right),carry))
	if (join=="-")
		return(decto(left-right,carry))
	if (join=="*")
		return(decto(left*right,carry))
	if (join=="/" && right!=0)
		return(decto(left/right,carry))
	if (join=="%")
		return(decto(left%right,carry))
	if (join=="&")
		return(decto(left&right,carry))
	if (join=="|")
		return(decto(left|right,carry))
	if (join=="^")
		return(decto(Math.pow(left,right),carry))
	if (join=="x")
		return(decto(left^right,carry))
	if (join=="<")
		return(decto(left<<right,carry))
	alert("除数不能为零")
	return(left)
}

//函数计算

function funcalc(fun,num)
{
	with(Math)
	{
		if (fun=="pi")
			return(PI)
		if (fun=="e")
			return(E)

		if (fun=="abs")
			return(abs(num))
		if (fun=="ceil")
			return(ceil(num))
		if (fun=="round")
			return(round(num))

		if (fun=="floor")
			return(floor(num))
		if (fun=="deci")
			return(num-floor(num))


		if (fun=="ln" && num>0)
			return(log(num))
		if (fun=="exp")
			return(exp(num))
		if (fun=="log" && num>0)
			return(log(num)*LOG10E)
		if (fun=="expdec")
			return(pow(10,num))

		
		if (fun=="cube")
			return(num*num*num)
		if (fun=="cubt")
			return(pow(num,1/3))
		if (fun=="sqr")
			return(num*num)
		if (fun=="sqrt" && num>=0)
			return(sqrt(num))

		if (fun=="!")
			return(factorial(num))

		if (fun=="recip" && num!=0)
			return(1/num)
		
		if (fun=="dms")
			return(dms(num))
		if (fun=="deg")
			return(deg(num))

		if (fun=="~")
			return(~num)
	
		if (angle=="d")
		{
			if (fun=="sin")
				return(sin(degressToRadians(num)))
			if (fun=="cos")
				return(cos(degressToRadians(num)))
			if (fun=="tan")
				return(tan(degressToRadians(num)))

			if (fun=="arcsin" && abs(num)<=1)
				return(radiansToDegress(asin(num)))
			if (fun=="arccos" && abs(num)<=1)
				return(radiansToDegress(acos(num)))
			if (fun=="arctan")
				return(radiansToDegress(atan(num)))
		}
		else
		{
			if (fun=="sin")
				return(sin(num))
			if (fun=="cos")
				return(cos(num))
			if (fun=="tan")
				return(tan(num))

			if (fun=="arcsin" && abs(num)<=1)
				return(asin(num))
			if (fun=="arccos" && abs(num)<=1)
				return(acos(num))
			if (fun=="arctan")
				return(atan(num))
		}
	
		if (fun=="hypsin")
			return((exp(num)-exp(0-num))*0.5)
		if (fun=="hypcos")
			return((exp(num)+exp(-num))*0.5)
		if (fun=="hyptan")
			return((exp(num)-exp(-num))/(exp(num)+exp(-num)))

		if (fun=="ahypsin" | fun=="hypcos" | fun=="hyptan")
		{
			alert("对不起,公式还没有查到!")
			return(num)
		}
		
		alert("超出函数定义范围")
		return(num)
	}
}

function factorial(n)
{
	n=Math.abs(parseInt(n))
	var fac=1
	for (;n>0;n-=1)
		fac*=n
	return(fac)
}

function dms(n)
{
	var neg=(n<0)
	with(Math)
	{	
		n=abs(n)
		var d=floor(n)
		var m=floor(60*(n-d))
		var s=(n-d)*60-m
	}
	var dms=d+m/100+s*0.006
	if (neg) 
		dms=-dms
	return(dms)
}

function deg(n)
{
	var neg=(n<0)
	with(Math)
	{
		n=abs(n)
		var d=floor(n)
		var m=floor((n-d)*100)
		var s=(n-d)*100-m
	}
	var deg=d+m/60+s/36
	if (neg) 
		deg=-deg
	return(deg)
}

function degressToRadians(degress)
{
	return(degress*Math.PI/180)
}

function radiansToDegress(radians)
{
	return(radians*180/Math.PI)
}

//界面

//-->
</SCRIPT>
<!-- Create By Ianse.com -->
<!--2005.10-->



  <table width="100%" height="290"  border="0" align="center" cellpadding="0" cellspacing="0" class="Input">
    <tr>
      <td width="99" align="center" valign="top">
	  	
<style>
#Ianse_MenuHeader{cursor:hand;list-style-image:url(/Images/Menu/Icon_H.gif);Color:#996666;}
#foldinglist{list-style-image:url(/Images/Menu/Icon_L.gif)}
</style>
<script language="JavaScript1.2">

document.write("<img style='width:0px;height:0px;' width=0 height=0 src='' id='SetCookieImg' border=0>")
function writeCookie(name,value)
{
	SetCookieImg.src = "/Inc/SetCookie.asp?name="+name+"&value="+value;
}
var Ianse_GoMenuID='';
var head="display:''"
img1=new Image()
img1.src="/Images/Menu/Icon_H.gif"
img2=new Image()
img2.src="/Images/Menu/Icon_K.gif"

function change(){
   if(!document.all)
      return
   if (event.srcElement.id=="Ianse_MenuHeader") {
      var srcIndex = event.srcElement.sourceIndex
      var nested = document.all[srcIndex+1]
      if (nested.style.display=="none") {
         nested.style.display=''
         event.srcElement.style.listStyleImage="url(/Images/Menu/Icon_K.gif)"
      }
      else {
         nested.style.display="none"
         event.srcElement.style.listStyleImage="url(/Images/Menu/Icon_H.gif)"
      }
   }

		if (document.all){
		  var nodelength=foldinglist.length-1
		  var nodes=new Array(nodelength)
		  var openones=''
		}
		for (i=0 ; i <= nodelength ; i++){
		if (foldinglist[i].style.display=='')
		   openones=openones + i + " "
		}
		writeCookie("IanseSuperMenu",openones);
		
}
document.onclick=change
//-->
</script>



<script language="JavaScript1.2">
if (Ianse_GoMenuID != ''){
  var openresults=Ianse_GoMenuID.split(" ")
  for (i=0 ; i < openresults.length ; i++){
    foldinglist[openresults[i]].style.display=''
    document.all[foldinglist[openresults[i]].sourceIndex - 1].style.listStyleImage="url(/Images/Menu/Icon_K.gif)"
  }
}
</script>
    </td></tr>
  <tr><td></td></tr>
</table>
	  </td>
      <td align="center" valign="top">
		  <br />
		  
		  
<FORM name=calc>
<TABLE border=3 height=250 width=500 Style="border-width:5px; FONT-FAMILY: '宋体', 'Arial Narrow', 'Times New Roman'; FONT-SIZE: 9pt; font-color: #000000;">
  <TBODY>
  <TR>
    <TD height=50>
      <TABLE width=500>
        <TBODY>
        <TR>
          <TD></TD>
          <TD align=center>
            <INPUT name=display readOnly size=40 value=0 style="Color:#000000;Font-Size:18px;Height:30px;">
		  </TD></TR></TBODY></TABLE></TD></TR>
  <TR>
    <TD>
      <TABLE width=500>
        <TBODY>
        <TR>
          <TD width=290><INPUT name=carry onclick=inputChangCarry(16) 
            type=radio> 十六进制 <INPUT CHECKED name=carry 
            onclick=inputChangCarry(10) type=radio> 十进制 <INPUT name=carry 
            onclick=inputChangCarry(8) type=radio> 八进制 <INPUT name=carry 
            onclick=inputChangCarry(2) type=radio> 二进制 </TD>
          <TD width="44"></TD>
          <TD width=150><INPUT CHECKED name=angle 
            onclick="inputChangAngle('d')" type=radio value=d> 角度制 <INPUT 
            name=angle onclick="inputChangAngle('r')" type=radio value=r> 弧度制 
        </TD></TR></TBODY></TABLE>
      <TABLE width=500>
        <TBODY>
        <TR>
          <TD width=170><INPUT name=shiftf onclick=inputshift() 
            type=checkbox>上档功能 <INPUT name=hypf onclick=inputshift() 
            type=checkbox>双曲函数 </TD>
          <TD><INPUT name=bracket readOnly size=3 
            style="BACKGROUND-COLOR: lightgrey"> <INPUT name=memory readOnly 
            size=3 style="BACKGROUND-COLOR: lightgrey"> <INPUT name=operator 
            readOnly size=3 style="BACKGROUND-COLOR: lightgrey"> </TD>
          <TD width=183 align="center"><INPUT onclick=backspace() style="COLOR: red" type=button value="退格"> 
<INPUT onclick="document.calc.display.value = 0 " style="COLOR: red" type=button value="清除"> 
<INPUT onclick=clearall() style="COLOR: red" type=button value="复位 CE">          </TD>
        </TR></TBODY></TABLE>
      <TABLE width=500>
        <TBODY>
        <TR>
          <TD>
            <TABLE>
              <TBODY>
              <TR align=middle>
                <TD><INPUT name=pi onclick="inputfunction('pi','pi')" style="COLOR: blue; width:40px;" type=button value=" PI "> 
                </TD>
                <TD><INPUT name=e onclick="inputfunction('e','e')" style="COLOR: blue; width:40px;" type=button value=" E "> 
                </TD>
                <TD><INPUT name=bt onclick="inputfunction('dms','deg')" style="COLOR: #ff00ff; width:40px;" type=button value=d.ms> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT onclick=addbracket() style="COLOR: #ff00ff; width:40px;" type=button value=" (  "> 
                </TD>
                <TD><INPUT onclick=disbracket() style="COLOR: #ff00ff; width:40px;" type=button value=" )  "> 
                </TD>
                <TD><INPUT name=ln onclick="inputfunction('ln','exp')" style="COLOR: #ff00ff; width:40px;" type=button value=" ln "> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT name=sin onclick="inputtrig('sin','arcsin','hypsin','ahypsin')" style="COLOR: #ff00ff; width:40px;" type=button value="sin"> 
                </TD>
                <TD><INPUT onclick="operation('^',7)" style="COLOR: #ff00ff; width:40px;" type=button value="x^y"> 
                </TD>
                <TD><INPUT name=log onclick="inputfunction('log','expdec')" style="COLOR: #ff00ff; width:40px;" type=button value="log"> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT name=cos onclick="inputtrig('cos','arccos','hypcos','ahypcos')" style="COLOR: #ff00ff; width:40px;" type=button value="cos"> 
                </TD>
                <TD><INPUT name=cube onclick="inputfunction('cube','cubt')" style="COLOR: #ff00ff; width:40px;" type=button value="x^3"> 
                </TD>
                <TD><INPUT onclick="inputfunction('!','!')" style="COLOR: #ff00ff; width:40px;" type=button value=" n! "> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT name=tan onclick="inputtrig('tan','arctan','hyptan','ahyptan')" style="COLOR: #ff00ff; width:40px;" type=button value="tan"> 
                </TD>
                <TD><INPUT name=sqr onclick="inputfunction('sqr','sqrt')" style="COLOR: #ff00ff; width:40px;" type=button value="x^2"> 
                </TD>
                <TD><INPUT onclick="inputfunction('recip','recip')" style="COLOR: #ff00ff; width:40px;" type=button value="1/x"> 
                </TD></TR></TBODY></TABLE></TD>
          <TD width=30></TD>
          <TD>
            <TABLE>
              <TBODY>
              <TR>
                <TD><INPUT onclick=putmemory() style="COLOR: red" type=button value="储存"> 
                </TD></TR>
              <TR>
                <TD><INPUT onclick=getmemory() style="COLOR: red" type=button value="取存"> 
                </TD></TR>
              <TR>
                <TD><INPUT onclick=addmemory() style="COLOR: red" type=button value="累存"> 
                </TD></TR>
              <TR>
                <TD><INPUT onclick=multimemory() style="COLOR: red" type=button value="积存"> 
                </TD></TR>
              <TR>
                <TD height=33><INPUT onclick=clearmemory() style="COLOR: red" type=button value="清存"> 
                </TD></TR></TBODY></TABLE></TD>
          <TD width=30></TD>
          <TD>
            <TABLE>
              <TBODY>
              <TR align=middle>
                <TD><INPUT name=k7 onclick="inputkey('7')" style="COLOR: blue; width:40px;" type=button value=" 7 "> 
                </TD>
                <TD><INPUT name=k8 onclick="inputkey('8')" style="COLOR: blue; width:40px;" type=button value=" 8 "> 
                </TD>
                <TD><INPUT name=k9 onclick="inputkey('9')" style="COLOR: blue; width:40px;" type=button value=" 9 "> 
                </TD>
                <TD><INPUT onclick="operation('/',6)" style="COLOR: red; width:40px;" type=button value=" / "> 
                </TD>
                <TD><INPUT onclick="operation('%',6)" style="COLOR: red" type=button value="取余"> 
                </TD>
                <TD><INPUT onclick="operation('&',3)" style="COLOR: red" type=button value=" 与 "> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT name=k4 onclick="inputkey('4')" style="COLOR: blue; width:40px;" type=button value=" 4 "> 
                </TD>
                <TD><INPUT name=k5 onclick="inputkey('5')" style="COLOR: blue; width:40px;" type=button value=" 5 "> 
                </TD>
                <TD><INPUT name=k6 onclick="inputkey('6')" style="COLOR: blue; width:40px;" type=button value=" 6 "> 
                </TD>
                <TD><INPUT onclick="operation('*',6)" style="COLOR: red; width:40px;" type=button value=" * "> 
                </TD>
                <TD><INPUT name=floor onclick="inputfunction('floor','deci')" style="COLOR: red" type=button value=取整> 
                </TD>
                <TD><INPUT onclick="operation('|',1)" style="COLOR: red" type=button value=" 或 "> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT onclick="inputkey('1')" style="COLOR: blue; width:40px;" type=button value=" 1 "> 
                </TD>
                <TD><INPUT name=k2 onclick="inputkey('2')" style="COLOR: blue; width:40px;" type=button value=" 2 "> 
                </TD>
                <TD><INPUT name=k3 onclick="inputkey('3')" style="COLOR: blue; width:40px;" type=button value=" 3 "> 
                </TD>
                <TD><INPUT onclick="operation('-',5)" style="COLOR: red; width:40px;" type=button value=" - "> 
                </TD>
                <TD><INPUT onclick="operation('<',4)" style="COLOR: red" type=button value=左移> 
                </TD>
                <TD><INPUT onclick="inputfunction('~','~')" style="COLOR: red" type=button value=" 非 "> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT onclick="inputkey('0')" style="COLOR: blue; width:40px;" type=button value=" 0 "> 
                </TD>
                <TD><INPUT onclick=changeSign() style="COLOR: blue; width:40px;" type=button value="+/-"> 
                </TD>
                <TD><INPUT name=kp onclick="inputkey('.')" style="COLOR: blue; width:40px;" type=button value=" . "> 
                </TD>
                <TD><INPUT onclick="operation('+',5)" style="COLOR: red; width:40px;" type=button value=" + "> 
                </TD>
                <TD><INPUT onclick=result() style="COLOR: red" type=button value=" ＝ "> 
                </TD>
                <TD><INPUT onclick="operation('x',2)" style="COLOR: red" type=button value=异或> 
                </TD></TR>
              <TR align=middle>
                <TD><INPUT disabled name=ka onclick="inputkey('a')" style="COLOR: blue" type=button value=" A "> 
                </TD>
                <TD><INPUT disabled name=kb onclick="inputkey('b')" style="COLOR: blue" type=button value=" B "> 
                </TD>
                <TD><INPUT disabled name=kc onclick="inputkey('c')" style="COLOR: blue" type=button value=" C "> 
                </TD>
                <TD><INPUT disabled name=kd onclick="inputkey('d')" style="COLOR: blue" type=button value=" D "> 
                </TD>
                <TD><INPUT disabled name=ke onclick="inputkey('e')" style="COLOR: blue" type=button value=" E "> 
                </TD>
                <TD><INPUT disabled name=kf onclick="inputkey('f')" style="COLOR: blue" type=button value=" F "> 
                </TD></TR></TBODY></TABLE></TD></TR></TBODY></TABLE></TD></TR></TBODY></TABLE>		</FORM>
<br />
<!-- 计算器表格完 -->



<script language="javascript">
var results='';var previouskey='';var re=/(\/|\*|\+|-)/;var re2=/(\/|\*|\+|-){2}$/;var re3=/.+(\/|\*|\+|-).+/;var re4=/\d|\./;var re5=/^[^\/\*\+].+\d$/;var re6=/\./;function calculate(n){if(n.match(re4)&&previouskey=="=")results='';if(result.innerText.match(re3)&&n.match(re)){if(!results.match(re5)){result.innerText="Error!";return}results=eval(results);if(results.toString().length>=12&&results.toString().match(re6))results=results.toString().substring(0,12)
result.innerText=results}results+=n;if(results.match(re2))results=results.substring(0,results.length-2)+results.charAt(results.length-1)
result.innerText=results}function calculateresult(){if(!results.match(re5)){result.innerText="Error!";return}results=eval(results);if(results.toString().length>=12&&results.toString().match(re6))
results=results.toString().substring(0,12)
result.innerText=results}function pn(){if(result.innerText.charAt(0)!='-')result.innerText=results='-'+result.innerText;else if(result.innerText.charAt(0)=='-')result.innerText=results=result.innerText*(-1)}function k3(n,m){if(event.keyCode!=13)return;a=n.value;if(a=="")return;try{text_32[m].value=eval(a)}catch(e){M("请输入正确的计算式子！")}}
dt3='在框中输入“计算式子”  然后按“回车键”显示计算结果。'
</script>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<td>
<table border="0" cellpadding="5" cellspacing="0" background="img/1001.jpg">
<tr>
<td>计算器１：
<input size=43 onKeyDown="k3(this,0)" maxlength=60 onclick="if (this.value==''){M(dt3)}else{return false}">

</td>
<td>
<input name=text_32 size=23>
</td>
</tr>

</table>
</td>
</tr>
</table>
<br>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<td>
<table border="0" cellpadding="5" cellspacing="0" background="img/1001.jpg">
<tr>
<td>计算器２：
<input size=43 onKeyDown="k3(this,1)" maxlength=60 onclick="if (this.value==''){M(dt3)}else{return false}">
</td>
<td>
<input name=text_32 size=23>
</td>
</tr>

</table>
</td>
</tr>
</table>
<br>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<td>
<table border="0" cellpadding="5" cellspacing="0" background="img/1001.jpg">
<tr>
<td>计算器３：
<input size=43 onKeyDown="k3(this,2)" maxlength=60 onclick="if (this.value==''){M(dt3)}else{return false}">

</td>
<td>
<input name=text_32 size=23>
</td>
</tr>

</table>
</td>
</tr>
</table>
<br>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<td>
<table border="0" cellpadding="5" cellspacing="0" background="img/1001.jpg">
<tr>
<td>计算器４：
<input size=43 onKeyDown="k3(this,3)" maxlength=60 onclick="if (this.value==''){M(dt3)}else{return false}">

</td>
<td>
<input name=text_32 size=23>
</td>
</tr>

</table>
</td>
</tr>
</table>
<br>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<td>
<table border="0" cellpadding="5" cellspacing="0" background="img/1001.jpg">
<tr>
<td>计算器５：
<input size=43 onKeyDown="k3(this,4)" maxlength=60 onclick="if (this.value==''){M(dt3)}else{return false}">

</td>
<td>
<input name=text_32 size=23>
</td>
</tr>

</table>
</td>
</tr>
</table>
