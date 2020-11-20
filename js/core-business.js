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

  $("#hexagon-nav li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("#hexagon-slide .item")
      .eq($(this).index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
