setTimeout(() => {
  var url = location.href;
  var hash = url.slice(url.indexOf("#"));
  if (hash.length > 2) {
    $("html,body").animate({
      scrollTop: $(hash).offset().top,
    });
  }
}, 1000);
$(function () {
  var winHeight = $(window).height();
  $.component([
    [
      "header",
      function () {
        $(".header")
          .attr("data-spy", "affix")
          .affix({
            offset: {
              top: winHeight,
            },
          });
      },
    ],
    ["footer"],
    ["return"],
  ]);

  $("#subnav")
    .affix({
      offset: {
        top: winHeight,
      },
    })
    .on("click", "a:not(.join)", function (e) {
      e.preventDefault();
      var url = $(this).prop("href");
      var hash = url.slice(url.indexOf("#"));
      $("html,body").animate({
        scrollTop: $(hash).offset().top,
      });
    });

  // 更多展开
  $("#mob-item-menu").click(function () {
    $(this).parent().toggleClass("opened").find(".mob-item-hide").toggle();
  });

  // 公司历史 图片切换
  $(".history-nav li").click(function () {
    var $this = $(this);
    var len = $(".history-nav li").length;

    $this.addClass("active").siblings().removeClass("active");
    $this.index() > 6
      ? $(".history-top-logo").addClass("switch")
      : $(".history-top-logo").removeClass("switch");

    var imgBox = $(".history-img-box");
    var historyItem = imgBox.find(".history-item");
    imgBox.find(".history-inner").css({
      transform:
        "translate(0," +
        ($this.index() === len - 1 ? len - 2 : $this.index()) *
          -historyItem.height() +
        "px)",
      transition: "transform .6s",
    });

    historyItem
      .eq($this.index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // 更多成员弹出框
  $(".member-logo-list .member-item").click(function () {
    var $this = $(this);
    $(".J-moremember-pop .pop-inner").html($this.find(".J-pop-inner").html());
    $(".J-moremember-pop .pop-inner .detail-table").show();
    $(".J-moremember-pop .J-pop-til-txt").html($this.data("title"));
    // 遮罩层
    $(".pop-bg").fadeIn();
    $(".J-moremember-pop").addClass("active");
  });

  // 荣誉资质弹出框
  $(".honor-list .item").click(function () {
    var $this = $(this);
    $(".J-honor-pop .pop-honor-img").html(
      '<img src="' +
        $this.data("imgurl") +
        '" alt="' +
        $this.find("h4").text() +
        '" id="popImg"></img>'
    );
    $(".J-honor-pop .J-pop-til-txt").html($this.find("h4").text());
    $(".pop-bg").fadeIn();
    $(".J-honor-pop").addClass("active");
  });

  $("body").on("click", ".pop-bg,.close-pop", function () {
    $(".pop-box").removeClass("active");
    $(".pop-bg").fadeOut(1e3);
  });

  // 荣誉资质 选项卡
  $(".honor-tab").on("click", ".item", function (e) {
    var $this = $(this);
    $this.addClass("active").siblings().removeClass("active");

    var margin = parseFloat($(".honor-list").css("margin-right"));
    if ($(this).index() === 1) {
      $(".honor-inner").css(
        "transform",
        "translateX(-" + ($(".honor-list").width() + margin) + "px)"
      );
    } else {
      $(".honor-inner").css("transform", "translateX(0)");
    }
  });

  $(".propaganda-tab").on("click", ".item", function (e) {
    $(this).addClass("active").siblings().removeClass("active");
    var margin = parseFloat($(".honor-list").css("margin-right"));
    if ($(this).index() === 1) {
      $(".propaganda-inner").css(
        "transform",
        "translateX(-" + ($(".propaganda-list").width() + margin) + "px)"
      );
    } else {
      $(".propaganda-inner").css("transform", "translateX(0)");
    }
  });

});
