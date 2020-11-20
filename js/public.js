$.component([["header"], ["footer"], ["return"]]);

var base_scroll = {
  cursorcolor: "#2983c5", //滚动条颜色,使用16进制颜色值
  cursorwidth: "8px", // 滚动条的宽度,单位:像素
  cursorborder: "0px solid #000", //CSS方式定义滚动条边框
  cursorborderradius: "5px", // 滚动条圆角(像素)
  scrollspeed: 40, //滚动速度
  zindex: "2800",
};

$("html").niceScroll(base_scroll);

$.ScrollAnimated(100);

function setHeight() {
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  // 轮播图高度
  $("#slide .carousel-inner,#slide img,#video-wrap,#video-wrap>img").height(
    winWidth > 768 ? (winHeight > 500 ? winHeight : 500) : 0.8 * winWidth
  );
  // 核心业务
  $("#cb-con>div").height(
    winWidth > 1000
      ? 512
      : winWidth > 768
      ? (winWidth / 2) * 0.9
      : parseInt((winWidth / 3 / 459) * 512)
  );
  // 公司历史
  $("#history .history-img-box .history-item").height(
    winWidth < 768 ? (winWidth * 0.9 <= 330 ? 330 : winWidth * 0.9) : 900
  );
  // 荣誉资质,资料下载
  function changeWidth(parEl, childEl) {
    var $parent = $(parEl);
    $parent.prop("style", "").find(childEl).prop("style", "");
    var childWidth = $parent.find(childEl + ":first").width();
    $parent.find(childEl).width(childWidth).css("margin-right", "20px");
    var childMargin = parseFloat(
      $parent.find(childEl + ":first").css("margin-right")
    );
    $parent.width((childWidth + childMargin) * 2);
  }
  changeWidth("#honor .honor-inner", ".honor-list");
  changeWidth("#download .propaganda-inner", ".propaganda-list");
  // 成功案例
  $("#hexagon-slide,#hexagon-slide .item").height(
    winWidth < 768 ? $("#hexagon-slide .item img").height() : 546
  );
  // 仓库tab 内容
  $("#warehousing-content").height($("#warehousing-content img").height());
}

setTimeout(() => {
  setHeight();
}, 500);

// 改变窗口尺寸，重新加载
$(window).on("resize", function () {
  debounce(function () {
    // location.reload();
    setHeight();
  }, 500);
});

var e = $(window),
  n = 0.8 * e.height();
(lineGroups = $(".line-group,.ani-group")),
  lineGroups.length &&
    e.scroll(function () {
      var a = e.scrollTop();
      lineGroups.each(function (e) {
        var i = $(this),
          t = i.offset().top - a;
        t < n && !i.hasClass("active")
          ? i.addClass("active")
          : n <= t && i.removeClass("active");
      });
    });

window.onload = function () {
  let index = 0;
  let url = location.href;
  let hash = url.slice(url.lastIndexOf("/") + 1, -5);
  if (hash === "about") {
    index = 0;
  } else if (hash === "core-business") {
    index = 1;
  } else if (hash === "operation") {
    index = 2;
  } else if (hash === "tes") {
    index = 3;
  }else {
    $(".header .main-nav li")[index].classList.remove("current");
    return;
  }
  
  $(".header .main-nav li")[index].classList.add("current");
};
