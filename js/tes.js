$(function () {
  // System&Solution
  $("#S-hexagon-nav li").click(function () {
    $(this).addClass("cur").siblings().removeClass("cur");
    $("#S-hexagon-con>.item")
      .eq($(this).index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // C-list弹出框
  $(".C-list>div").click(function () {
    var $this = $(this);
    $(".J-honor-pop .J-pop-til-txt").text($this.data("poptil"));
    $(".J-honor-pop .pop-honor-img").html(
      '<img src="' +
        $this.data("imgurl") +
        '" alt="' +
        $this.data("poptil") +
        '"></img>'
    );
    $(".pop-bg").fadeIn();
    $(".J-honor-pop").addClass("active");
  });

  $("body").on("click", ".pop-bg,.close-pop", function () {
    $(".pop-box").removeClass("active");
    $(".pop-bg").fadeOut(1e3);
  });
});
