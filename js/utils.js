// utils   common===public
$.extend({
  component: function (json) {
    $.each(json, function (index, item) {
      $("#" + item[0]).load("common/" + item[0] + ".html", function () {
        if (item[1]) item[1]();
      });
    });
    return this;
  },

  getAllOffsetTop: function (selector) {
    //  工厂模式
    var arr = [];
    $(selector).each(function (index, item) {
      arr.push($(item).offset().top);
    });
    return arr;
  },

  ScrollAnimated: function (threshold) {
    var allOffsetTop = [];
    var threshold = threshold || 0; //阈值
    $(window).on("scroll", function () {
      var winHeight = $(this).height();
      var scrollTop = $(document).scrollTop();
      if (!allOffsetTop.length)
        allOffsetTop = $.getAllOffsetTop("[data-scroll-animated]");

      $("[data-scroll-animated]").each(function (index, item) {
        var aniDelay = $(item).attr("data-ani-delay");
        var tsDelay = $(item).attr("data-ts-delay");
        if (aniDelay)
          $(item).css({
            "-webkit-animation-delay": aniDelay,
            "animation-delay": aniDelay,
          });
        if (tsDelay)
          $(item).css({
            "-webkit-transition-delay": tsDelay,
            "transition-delay": tsDelay,
          });

        var aniInName = $(item).attr("data-scroll-animated");
        var aniOutName = aniInName.replace("In", "Out").replace("Up", "Down");
        var height = $(item).height();
        if (allOffsetTop[index] < winHeight + scrollTop - threshold) {
          if (allOffsetTop[index] + height < scrollTop + threshold) {
            $(item).removeClass(aniInName).addClass(aniOutName);
          } else {
            $(item).removeClass(aniOutName).addClass(aniInName);
          }
        } else {
          $(item).removeClass(aniInName).addClass(aniOutName);
        }
      });
    });
  },
});

var debounceTimer = null;

function debounce(callback, time) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function () {
    if (callback) callback();
  }, time || 1000);
}

var throttleTimer = null;

function throttle(callback, time) {
  if (!throttleTimer) {
    throttleTimer = setTimeout(function () {
      clearTimeout(debounceTimer);
      throttleTimer = null;
      if (callback) callback();
    }, time || 1000);
  }
}

//验证用户名是否合法
function isUserName(obj) {
  return /^[0-9]*$/.test(obj);
}

// 验证是否是密码
function isPassword(obj) {
  return /^[a-z0-9_-]{6,18}$/.test(obj);
}

function turnPage(options) {
  this.currentPage = options.currentPage || 1;
  this.allPage = options.allPage || 1;
  this.wrap = options.wrap;
  this.changePage = options.changePage || function () {};
}

turnPage.prototype = {
  constructor: turnPage,
  init() {
    this.fillHTML();
    this.bindEvent();
  },
  fillHTML() {
    this.wrap.html("");
    var turnWrapper = $('<ul class="turn-page"></ul>');
    
    turnWrapper.append('<li class="item prev">&lt;&lt;</li>');

    var firstLi = $('<li class="item num">1</li>');
    if (this.currentPage == 1) {
      firstLi.addClass("current");
    }
    turnWrapper.append(firstLi);

    if (this.currentPage - 2 > 2) {
      turnWrapper.append($('<span class="item">...</span>'));
    }

    for (var i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
      if (i > 1 && i < this.allPage) {
        var oLi = $('<li class="item num">' + i + "</li>");
        if (this.currentPage === i) {
          oLi.addClass("current");
        }
        turnWrapper.append(oLi);
      }
    }

    if (this.currentPage + 2 < this.allPage - 1) {
      turnWrapper.append($('<span class="item">...</span>'));
    }

    if (this.allPage != 1) {
      var lastLi = $('<li class="item num">' + this.allPage + "</li>");
      if (this.currentPage == this.allPage) {
        lastLi.addClass("current");
      }
      turnWrapper.append(lastLi);
    }
    turnWrapper.append($('<li class="item next">&gt;&gt;</li>'));
    this.wrap.append(turnWrapper);
  },
  bindEvent() {
    this.wrap.on("click", "li", (e) => {
      if (e.target.classList.contains("prev")) {
        if (this.currentPage === 1) {
          return;
        } else {
          this.currentPage--;
        }
        this.fillHTML();
        this.changePage(this.currentPage);
      } else if (e.target.classList.contains("next")) {
        if (this.currentPage === this.allPage) {
          return;
        } else {
          this.currentPage++;
        }
        this.fillHTML();
        this.changePage(this.currentPage);
      } else if (e.target.classList.contains("num")) {
        var page = parseInt(e.target.innerText);
        if (this.currentPage == page) {
          return;
        }
        this.currentPage = page;
        this.fillHTML();
        this.changePage(this.currentPage);
      }
    });
  },
};

$.fn.turnPage = function(options){
  var turnPage = new turnPage(options);
  turnPage.init();
}