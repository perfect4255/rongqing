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
    .on("click", "a", function (e) {
      e.preventDefault();
      var url = $(this).prop("href");
      var hash = url.slice(url.indexOf("#"));
      $("html,body").animate({
        scrollTop: $(hash).offset().top,
      });
    });

  // tab切换
  $("#warehousing-tab a").click(function () {
    $(this).addClass("cur").parent().siblings().find("a").removeClass("cur");
    $("#warehousing-content .item")
      .eq($(this).parent().index())
      .addClass("active")
      .siblings()
      .removeClass("active");
      
    $("#warehousing-content .item")
      .eq($(this).parent().index())
      .find(".temp-txt")
      .addClass("fadeInUp")
      .parent()
      .siblings()
      .find(".temp-txt")
      .removeClass("fadeInUp");
  });
});
