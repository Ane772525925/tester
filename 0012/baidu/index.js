//背景颜色保存和获取
function setColor(color) {
    if (window.localStorage) {
        localStorage.setItem("keyColor", color);
    } else {
        Cookie.write("keyColor", color);
    }
}
function getColor() {
    var color = window.localStorage ? localStorage.getItem("keyColor") : Cookie.read("keyColor");
    return color;
}
//单例模式  将每一部分分离开来，这样不会污染全局变量，虽然此处没有几个变量
//而且一个类只有一个实例
$(function() {
    var index = {
        // 初始化   执行的入口  全局访问点
        init: function() {
            this.render();
            this.bind();
        },
        // 所有元素获取
        render: function() {
            var me=this;  //
            me.btnxk=$(".xk");
            me.btnzh=$(".zh");
            me.btnset=$(".set");
            me.btnsz=$(".sz");
            me.btnli_li=$(".li_li");
            me.btntab=$(".tab");
            me.btnhuan=$(".huan");
            me.btnpifu=$(".pifu");
            me.btnspan=$("li.span");
        },
        // 绑定元素
        bind: function() {
            var me = this;
            me.btnxk.hover(function(){me.zhblock();},function(){me.zhnone();});
            me.btnzh.hover(function(){me.zhblock();},function(){me.zhnone();});

            me.btnset.hover(function(){me.szblock();},function(){me.sznone();});
            me.btnsz.hover(function(){me.szblock();},function(){me.sznone();});

            me.btnli_li.hover(function(){me.tabblock();},function(){me.tabnone();});
            me.btntab.hover(function(){me.tabblock();},function(){me.tabnone();});

            me.btnhuan.hover(function(){me.pifublock();},function(){me.pifunone();});
            me.btnpifu.hover(function(){me.pifublock();},function(){me.pifunone();});

            me.btnspan.hover(function(){me.spanadd()},function(){me.spanremove()});
        },
        // 代码执行部分
        zhblock:function(){
            $(".zh").css("display", "block");
        },
        zhnone:function(){
            $(".zh").css("display", "none");
        },
        szblock:function(){
            $(".sz").css("display", "block");
        },
        sznone:function(){
            $(".sz").css("display", "none");
        },
        tabblock:function(){
            $(".tab").css("display", "block");
        },
        tabnone:function(){
            $(".tab").css("display", "none");
        },
        pifublock:function(){
            $(".pifu").css("display", "block");
        },
        pifunone:function(){
            $(".pifu").css("display", "none");
        },
        spanadd:function(){
            $(this).addClass("span-s");
        },
        spanremove:function(){
            $(this).removeClass("span-s");
        },

    };
    index.init();

    // 中间内容
    $("div.h-1>li.span").each(function(index) {
        $(this).click(function() {
            $("li.span-span").removeClass("span-span");
            $(this).addClass("span-span");

            $("span.No-1").removeClass("No-1");
            $("div.content>span").eq(index).addClass("No-1");
        });
    });

    // 换肤
    var color = getColor();
    $("div.all").css("background-color", color);

    // 遍历获取颜色，点击并更换颜色
    $("div.pifu>div>span").each(function() {
        $(this).click(function() {
            var colors = $(this).css("background-color");
            $("div.all").css({
                "background-color":colors,
                opacity: 1
            });
            setColor(colors);
        });
    });
});