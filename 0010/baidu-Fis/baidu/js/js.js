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

$(document).ready(function() {
    $(".xk").hover(function() {
        $(".zh").css("display", "block");
    }, function() {
        $(".zh").css("display", "none");
    });

    $(".zh").hover(function() {
        $(this).css("display", "block");
    }, function() {
        $(this).css("display", "none");
    });

    $(".set").hover(function() {
        $(".sz").css("display", "block");
    }, function() {
        $(".sz").css("display", "none");
    });

    $(".sz").hover(function() {
        $(this).css("display", "block");
    }, function() {
        $(this).css("display", "none");
    });


    $(".li_li").hover(function() {
        $(".tab").css("display", "block");
    }, function() {
        $(".tab").css("display", "none");
    });

    $(".tab").hover(function() {
        $(this).css("display", "block");
    }, function() {
        $(this).css("display", "none");
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

    $(".huan").hover(function() {
        $(".pifu").css("display", "block");
    }, function() {
        $(".pifu").css("display", "none");
    });

    $(".pifu").hover(function() {
        $(this).css("display", "block");
    }, function() {
        $(this).css("display", "none");
    });



    // 中间内容
    $("div.h-1>li.span").each(function(index) {
        $(this).click(function() {
            $("li.span-span").removeClass("span-span");
            $(this).addClass("span-span");

            $("span.No-1").removeClass("No-1");
            $("div.content>span").eq(index).addClass("No-1");

            // $("#span").children().removeClass("ren").addClass("ren-1");
        });
    });

    $("li.span").hover(function() {
        $(this).addClass("span-s");
    }, function() {
        $(this).removeClass("span-s");
    });

});