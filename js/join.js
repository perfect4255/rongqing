$(function () {
  // 下拉框
  $(".select-item")
    .click(function () {
      var $this = $(this);
      $this.find(".input-wrap").addClass("blue-theme");
      $this.find(".drop-cont").fadeIn();
    })
    .mouseleave(function () {
      setTimeout(() => {
        $(this).find(".input-wrap").removeClass("blue-theme");
        $(this).find(".drop-cont").fadeOut();
      }, 100);
    });

  $(".drop-cont a").click(function (e) {
    e.stopPropagation();
    var $this = $(this);
    var $txt = $this.text();

    $this.addClass("selected").siblings().removeClass("selected");
    $this.parent().prev().html($txt);

    // 收起下拉
    $this.parent().fadeOut();
    $this.parents(".select-item").find(".input-wrap").removeClass("blue-theme");
  });

  // 结果列表
  $.ajax({
    type: "get",
    url: "data/search.json",
    success: function (response) {
      var data = response.data;
      var tr = "";
      $.each(data, function (index, item) {
        var td = "";
        for (var key in item) {
          if (key === "id") continue;

          if (key === "post") {
            td += '<td><a href="javascript:void(0);">' + item[key] + "</a></td>";
            continue;
          }

          td += "<td>" + item[key] + "</td>";
        }
        tr += "<tr>" + td + "</tr>";
      });
      $("#join-table tbody").html(tr);
    },
  });

  $("#goSearch").click(function () {
    var val = $("#txtKey").val();
    $("#join-table tbody tr").hide();
    $("#join-table tbody tr:contains(" + val + ")").show();
  });
  $("#join-table").niceScroll(base_scroll);
});

function selectJob(that, val) {
  $(".tab-title2 a").removeClass("active");
  $(that).addClass("active");
  $("#positionType>a").text("请选择");
  $("#workLocation>a").text("请选择");
  $("#txtKey").val("");
  $("#join-table tbody tr").hide();
  $("#join-table tbody tr:contains(" + val + ")").show();
}
