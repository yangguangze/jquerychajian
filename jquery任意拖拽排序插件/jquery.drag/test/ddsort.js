//+function ($) {
//	$.fn.DDSort = function (options) {
//  	var defaultOptions = {
//	        down: $.noop,
//	        move: $.noop,
//	        up: $.noop,
//	        target: 'li',
//	        delay: 100,
//	        cloneStyle: {
//	            'background-color': '#eee'
//	        },
//	        floatStyle: {
//	            // 用固定定位可以防止定位父级不是Body的情况的兼容处理，表示不兼容IE6
//	            'position': 'fixed',
//	            'box-shadow': '10px 10px 20px 0 #eee',
//	//             'webkitTransform': 'rotate(4deg)',
//	//             'mozTransform': 'rotate(4deg)',
//	//             'msTransform': 'rotate(4deg)',
//	//             'transform': 'rotate(4deg)'
//	        }
//	    };
//  	
//      var $doc = $(document);
//      var settings = $.extend(true, {}, defaultOptions, options);
//      return this.each(function () {
//          var that = $(this);
//          var height = 'height';
//          var width = 'width';
//          //如果有border-box属性，获取元素高度和宽度
//          if (that.css('box-sizing') == 'border-box') {
//              height = 'outerHeight';
//              width = 'outerWidth';
//          }
//          that.on('mousedown', settings.target, function (e) {//鼠标按下时
//              var startTime = new Date().getTime();//当前时间戳
//              // 只允许鼠标左键拖动
//              if (e.type == 'mousedown' && e.which != 1) return;//判断是否是鼠标左键mousedown事件
//              // 防止表单元素，a 链接，可编辑元素失效
//              var tagName = e.target.tagName.toLowerCase();//li
//              if (tagName == 'input' || tagName == 'textarea' || tagName == 'select' ||
//                  tagName == 'a' || $(e.target).prop('contenteditable') == 'true') {
//                  return;
//              }//如果元素是input、textarea、select、a、或者可编辑，就直接返回
//              var self = this;
//              var $this = $(self);
//              // 鼠标按下时的元素偏移
//              var offset = $this.offset();//鼠标按下当前元素时获取当前元素的偏移量
//              // 鼠标按下时的鼠标坐标
//              var pageX = e.pageX;
//              var pageY = e.pageY;
//              var clone = $this.clone()
//                      .css(settings.cloneStyle)
//                      .css('height', $this[height]())
//                      .empty();//克隆当前元素，并清空内容
//              var hasClone = 1;
//
//              // 缓存计算
//              var thisOuterHeight = $this.outerHeight(),
//                  thisOuterWidth = $this.outerWidth(),
//                  thatOuterHeight = that.outerHeight(),
//                  thatOuterWidth = that.outerWidth();
//              // 滚动速度
//              var upSpeed = thisOuterHeight,
//                  downSpeed = thisOuterHeight,
//                  leftSpeed = thisOuterWidth,
//                  rightSpeed = thisOuterWidth,
//                  maxSpeed = thisOuterHeight * 3;
//              settings.down.call(self);//继承当前元素
//              $doc.on('mousemove', function (e) {//鼠标移动时
//                  // 鼠标移动时的鼠标的坐标
//                  var _pageX = e.pageX;
//                  var _pageY = e.pageY;
//					//判断如果当前时间与开始时间的差值小于100秒，就直接返回
//                  if (new Date().getTime() - startTime < settings.delay) {
//                      return;
//                  }
//                  if (hasClone) {
//                      $this.before(clone)//如果hasClone=1，就在当前元素前插入克隆的空元素
//                          .css('width', $this[width]())
//                          .css(settings.floatStyle)
//                          .appendTo($this.parent());//在当前元素的结尾插入
//                      hasClone = 0;
//                  }
//                  var disX = pageX - _pageX;
//                  var disY = pageY - _pageY;
//                  var left = offset.left - disX;
//                  var top = offset.top - disY;
//                  $this.offset({
//                      left: left,
//                      top: top 
//                  });
//                  var $left = getLeft(clone),
//                      $right = getRight(clone, $this),
//                      $top = getTop(clone),
//                      $under = getUnder(clone, $this);
//                  if ($top && $top.length && top < $top.offset().top + $top.outerHeight(true) / 2) {
//                      // 向上排序
//                      $top.before(clone);
//                  } else if ($under && $under.length && top + thisOuterHeight > $under.offset().top + $under.outerHeight(true) / 2) {
//                      // 向下排序
//                      $under.after(clone);
//                  } else if($left && $left.length && left < $left.offset().left + $left.outerWidth(true) / 2) {
//                      //向左排序
//                      $left.before(clone);
//                  } else if($right && $right.length && left + thisOuterWidth > $right.offset().left + $right.outerWidth(true) / 2) {
//                      //向右排序
//                      $right.after(clone);
//                  }
//              })
//              .on('mouseup', function () {//鼠标抬起
//                  $doc.off('mousemove mouseup');//移除mousemove，mouseup事件
//                  // click 的时候也会触发 mouseup 事件，加上判断阻止这种情况
//                  if (!hasClone) {
//                      clone.before($this.removeAttr('style')).remove();
//                      settings.up.call(self);
//                  }
//              });
//              return false;
//          });
//      });
//  };
//  
//  //允许计算误差
//  var deviation = 5;
//  var getLeft = function (clone) {//计算left误差不能大于5
//      var left = clone.prev();//获取当前元素的上一个同级元素
//      if(left.length && clone.offset().top==left.offset().top) {
//          var _dev = Math.abs(clone.offset().left - (left.offset().left + left.outerWidth(true)));
//          if(_dev <= deviation) {
//              return left;
//          }
//      }
//      return undefined;
//  }
//  var getTop = function (clone, prev) {
//      if(!prev){
//          prev = clone.prev();//获取当前元素的上一个同级元素
//      }
//      if(!prev.length) {//如果当前元素是第一个元素，返回undefined
//          return undefined;
//      }
//      if(clone.offset().left==prev.offset().left) {
//          var _dev = Math.abs(clone.offset().top - (prev.offset().top+prev.outerHeight(true)));
//          if(_dev <= deviation) {
//              return prev;
//          }
//      }
//      return getTop(clone, prev.prev());
//  }
//  var getRight = function (clone, $this) {
//      var rigth = clone.next().not($this);//获取当前元素的下一个同级元素
//      if(rigth.length && clone.offset().top==rigth.offset().top) {
//          var _dev = Math.abs(clone.offset().left - (rigth.offset().left-clone.outerWidth(true)));
//          if(_dev <= deviation) {
//              return rigth;
//          }
//      }
//      return undefined;
//  }
//  var getUnder = function (clone, $this, next) {
//      if(!next){
//          next = clone.next().not($this);//获取当前元素的下一个同级元素
//      }
//      if(!next.length) {//如果是最后一个元素，返回undefined
//          return undefined;
//      }
//      if(clone.offset().left==next.offset().left) {
//          var _dev = Math.abs(clone.offset().top - (next.offset().top-clone.outerHeight(true)));
//          if(_dev <= deviation) {
//              return next;
//          }
//      }
//      return getUnder(clone, $this, next.next().not($this));
//  }
//}(jQuery);





;(function ($) {
	$.extend({
		DDSort:function(options) {
			var defaultOptions = {
		        down: $.noop,
		        move: $.noop,
		        up: $.noop,
		        fabox:'',
		        target: '',
		        delay: 100,
		        cloneStyle: {
		            'background-color': '#eee'
		        },
		        floatStyle: {
		            'position': 'fixed',
		            'box-shadow': '10px 10px 20px 0 #eee',
		        }
		    };
		    
		    var $doc = $(document);
	        var settings = $.extend(defaultOptions, options);
	        return $(settings.fabox).each(function () {
	            var that = $(this);
	            var height = 'height';
	            var width = 'width';
	            //如果有border-box属性，获取元素高度和宽度
	            if (that.css('box-sizing') == 'border-box') {
	                height = 'outerHeight';
	                width = 'outerWidth';
	            }
	            that.on('mousedown', settings.target, function (e) {//鼠标按下时
	                var startTime = new Date().getTime();//当前时间戳
	                // 只允许鼠标左键拖动
	                if (e.type == 'mousedown' && e.which != 1) return;//判断是否是鼠标左键mousedown事件
	                // 防止表单元素，a 链接，可编辑元素失效
	                var tagName = e.target.tagName.toLowerCase();//li
	                if (tagName == 'input' || tagName == 'textarea' || tagName == 'select' ||
	                    tagName == 'a' || $(e.target).prop('contenteditable') == 'true') {
	                    return;
	                }//如果元素是input、textarea、select、a、或者可编辑，就直接返回
	                var self = this;
	                var $this = $(self);
	                // 鼠标按下时的元素偏移
	                var offset = $this.offset();//鼠标按下当前元素时获取当前元素的偏移量
	                // 鼠标按下时的鼠标坐标
	                var pageX = e.pageX;
	                var pageY = e.pageY;
	                var clone = $this.clone()
	                        .css(settings.cloneStyle)
	                        .css('height', $this[height]())
	                        .empty();//克隆当前元素，并清空内容
	                var hasClone = 1;
	
	                // 缓存计算
	                var thisOuterHeight = $this.outerHeight(),
	                    thisOuterWidth = $this.outerWidth(),
	                    thatOuterHeight = that.outerHeight(),
	                    thatOuterWidth = that.outerWidth();
	                // 滚动速度
	                var upSpeed = thisOuterHeight,
	                    downSpeed = thisOuterHeight,
	                    leftSpeed = thisOuterWidth,
	                    rightSpeed = thisOuterWidth,
	                    maxSpeed = thisOuterHeight * 3;
	                settings.down.call(self);//继承当前元素
	                $doc.on('mousemove', function (e) {//鼠标移动时
	                    // 鼠标移动时的鼠标的坐标
	                    var _pageX = e.pageX;
	                    var _pageY = e.pageY;
						//判断如果当前时间与开始时间的差值小于100秒，就直接返回
	                    if (new Date().getTime() - startTime < settings.delay) {
	                        return;
	                    }
	                    if (hasClone) {
	                        $this.before(clone)//如果hasClone=1，就在当前元素前插入克隆的空元素
	                            .css('width', $this[width]())
	                            .css(settings.floatStyle)
	                            .appendTo($this.parent());//在当前元素的结尾插入
	                            console.log($this.parent())
	                        hasClone = 0;
	                    }
	                    var disX = pageX - _pageX;
	                    var disY = pageY - _pageY;
	                    var left = offset.left - disX;
	                    var top = offset.top - disY;
	                    $this.offset({
	                        left: left,
	                        top: top 
	                    });
	                    var $left = getLeft(clone),
	                        $right = getRight(clone, $this),
	                        $top = getTop(clone),
	                        $under = getUnder(clone, $this);
	                    if ($top && $top.length && top < $top.offset().top + $top.outerHeight(true) / 2) {
	                        // 向上排序
	                        $top.before(clone);
	                    } else if ($under && $under.length && top + thisOuterHeight > $under.offset().top + $under.outerHeight(true) / 2) {
	                        // 向下排序
	                        $under.after(clone);
	                    } else if($left && $left.length && left < $left.offset().left + $left.outerWidth(true) / 2) {
	                        //向左排序
	                        $left.before(clone);
	                    } else if($right && $right.length && left + thisOuterWidth > $right.offset().left + $right.outerWidth(true) / 2) {
	                        //向右排序
	                        $right.after(clone);
	                    }
	                })
	                .on('mouseup', function () {//鼠标抬起
	                    $doc.off('mousemove mouseup');//移除mousemove，mouseup事件
	                    // click 的时候也会触发 mouseup 事件，加上判断阻止这种情况
	                    if (!hasClone) {
	                        clone.before($this.removeAttr('style')).remove();
	                        settings.up.call(self);
	                    }
	                });
	                return false;
	            });
	            //允许计算误差
			    var deviation = 5;
			    var getLeft = function (clone) {//计算left误差不能大于5
			        var left = clone.prev();//获取当前元素的上一个同级元素
			        if(left.length && clone.offset().top==left.offset().top) {
			            var _dev = Math.abs(clone.offset().left - (left.offset().left + left.outerWidth(true)));
			            if(_dev <= deviation) {
			                return left;
			            }
			        }
			        return undefined;
			    }
			    var getTop = function (clone, prev) {
			        if(!prev){
			            prev = clone.prev();//获取当前元素的上一个同级元素
			        }
			        if(!prev.length) {//如果当前元素是第一个元素，返回undefined
			            return undefined;
			        }
			        if(clone.offset().left==prev.offset().left) {
			            var _dev = Math.abs(clone.offset().top - (prev.offset().top+prev.outerHeight(true)));
			            if(_dev <= deviation) {
			                return prev;
			            }
			        }
			        return getTop(clone, prev.prev());
			    }
			    var getRight = function (clone, $this) {
			        var rigth = clone.next().not($this);//获取当前元素的下一个同级元素
			        if(rigth.length && clone.offset().top==rigth.offset().top) {
			            var _dev = Math.abs(clone.offset().left - (rigth.offset().left-clone.outerWidth(true)));
			            if(_dev <= deviation) {
			                return rigth;
			            }
			        }
			        return undefined;
			    }
			    var getUnder = function (clone, $this, next) {
			        if(!next){
			            next = clone.next().not($this);//获取当前元素的下一个同级元素
			        }
			        if(!next.length) {//如果是最后一个元素，返回undefined
			            return undefined;
			        }
			        if(clone.offset().left==next.offset().left) {
			            var _dev = Math.abs(clone.offset().top - (next.offset().top-clone.outerHeight(true)));
			            if(_dev <= deviation) {
			                return next;
			            }
			        }
			        return getUnder(clone, $this, next.next().not($this));
			    }
	        });
	        
		}
	})
})(jQuery);

