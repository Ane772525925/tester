function test() {
    // 获取text值
    var text = document.getElementById('text');
    var a = text.value;
    var M;
    // 去除两端多余的空格；
    a = a.trim();
    // 判断，也可以用switch
    if (!a) {
        M = "请输入！"
    } else {
        if (a <= 100 && a >= 90) {
            M = "你是1等生";
        } else if (a < 90 && a >= 80) {
            M = "你是2等生";
        } else if (a < 80 && a >= 70) {
            M = "你是3等生";
        } else if (a < 70 && a >= 60) {
            M = "你是4等生";
        } else if (a < 60 && a >= 0) {             //统一范围
            M = "你是差等生";
        } else if (a == " ") {                      //这个可以不要
            M = "空值，请重新输入！"
        } else {
            M = "不好意思，你输入的无法识别，请重新输入";
        }
    }
    alert(M);
    // document.getElementById("id").write(M);
}