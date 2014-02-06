(function ($) {

  var EqualRowHeights = function(option) {
    var that = this;
    that.option = {
      selector: '.js-equalrowheights',
      resize: true,
      onBeforeRefresh: function() {},
      onAfterRefresh: function() {}
    };
    that.init.apply(that, arguments);
    return that;
  };


  EqualRowHeights.prototype.init = function(option) {
    var that = this;
    that.option = $.extend({}, that.option, option);
    that.el = $(option.selector);
    that._eventNS = '.EqualRowHeights'+$.now();
    if (that.el.length > 0) {
      that.refresh();
      that._eventify();
    }
    return that;
  };


  EqualRowHeights.prototype.destroy = function() {
    var that = this;
    that.reset();
    if (that.option.resize) {
      $(window).off(that._eventNS);
    }
    return that;
  };


  EqualRowHeights.prototype.reset = function() {
    var that = this;
    that.el.css('height', '');
    return that;
  };


  EqualRowHeights.prototype.refresh = function() {
    var that = this;
    var rows = {};

    that.option.onBeforeRefresh();

    that.reset();

    // 同じoffset.topのグループを作る
    $.each(that.el, function(idx, item) {
      var $item = $(item);
      var offset_top = $item.offset().top;
      rows["r"+offset_top] = rows["r"+offset_top] || {
        items: [],
        heights: []
      };
      rows["r"+offset_top].items.push($item);
      rows["r"+offset_top].heights.push($item.outerHeight());
    });

    // グループごとに最大の高さを求めて、高さをそろえる
    $.each(rows, function(idx, row) {
      var max_height = Math.max.apply(null, row.heights);
      console.log(max_height);
      //最大の高さを持つ要素のpaddingの上下をmax_heightから引く
      $.each(row.items, function(idx, item) {
        var $item = $(item);
        var v_padding = parseInt($item.css('padding-top'), 10) + parseInt($item.css('padding-bottom'), 10);
        $item.css('height', '');
        $item.height(max_height - v_padding);
      });
    });

    that.option.onAfterRefresh();

    return that;
  };


  EqualRowHeights.prototype._eventify = function() {
    var that = this;
    if (that.option.resize) {
      $(window).on("resize" + that._eventNS, $.proxy(that.refresh, that));
    }
    return that;
  };


  return $.EqualRowHeights = EqualRowHeights;

})(window.jQuery || window.$);
