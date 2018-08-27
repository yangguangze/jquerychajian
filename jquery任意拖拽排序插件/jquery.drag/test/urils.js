//(function($) {
//	$.extend({
//		
//		argea:function (config) {
//			var settings = {
//				fabox='',
//				chbox=''
//			};
//			var opt = $.extend(settings,config);
//			var range = { x: 0, y: 0 };//鼠标元素偏移量
//			var lastPos = { x: 0, y: 0, x1: 0, y1: 0 }; //拖拽对象的四个坐标
//			var tarPos = { x: 0, y: 0, x1: 0, y1: 0 }; //目标元素对象的坐标初始化
//			var theDiv = null, move = false;//拖拽对象 拖拽状态
//			var theDivId =0, theDivHeight = 0, theDivHalf = 0; tarFirstY = 0; //拖拽对象的索引、高度、的初始化。
//			var tarDiv = null, tarFirst, tempDiv; //要插入的目标元素的对象, 临时的虚线对象
//			function loopbox(){ //循环初始化
//		     $(opt.fabox).find(opt.chbox).each(function(){
//		       $(this).mousedown(function (event){
//		         //拖拽对象
//		         theDiv = $(this);
//		         //鼠标元素相对偏移量
//		         range.x = event.pageX - theDiv.offset().left;
//		         range.y = event.pageY - theDiv.offset().top;
//		         theDivId = theDiv.index();
//		         theDivHeight = theDiv.height();
//		         theDivHalf = theDivHeight/2;
//		         move = true;
//		         theDiv.attr("class","drag_module_maindash");
//		         // 创建新元素 插入拖拽元素之前的位置(虚线框)
//		         $("<div class='drag_module_dash'></div>").insertBefore(theDiv);
//		       });
//		     });
//		     $(opt.fabox).mousemove(function(event) {
//			     if (!move) return false;
//			     lastPos.x = event.pageX - range.x;
//			     lastPos.y = event.pageY - range.y;
//			     lastPos.y1 = lastPos.y + theDivHeight;
//			     // 拖拽元素随鼠标移动
//			     theDiv.css({left: lastPos.x + 'px',top: lastPos.y + 'px'});
//			     // 拖拽元素随鼠标移动 查找插入目标元素
//			     var $main = $(opt.chbox); // 局部变量：按照重新排列过的顺序 再次获取 各个元素的坐标，
//			     tempDiv = $(".drag_module_dash"); //获得临时 虚线框的对象
//			     $main.each(function () {
//			       tarDiv = $(this);
//			       tarPos.x = tarDiv.offset().left;
//			       tarPos.y = tarDiv.offset().top;
//			       tarPos.y1 = tarPos.y + tarDiv.height()/2;
//			       tarFirst = $main.eq(0); // 获得第一个元素
//			       tarFirstY = tarFirst.offset().top + theDivHalf ; // 第一个元素对象的中心纵坐标
//			       //拖拽对象 移动到第一个位置
//			       if (lastPos.y <= tarFirstY) {
//			           tempDiv.insertBefore(tarFirst);
//			       }
//			       //判断要插入目标元素的 坐标后， 直接插入
//			       if (lastPos.y >= tarPos.y - theDivHalf && lastPos.y1 >= tarPos.y1 ) {
//			         tempDiv.insertAfter(tarDiv);
//			       }
//			     });
//			   }).mouseup(function(event) {
//			    if(theDiv==null) return false;
//			     theDiv.insertBefore(tempDiv); // 拖拽元素插入到 虚线div的位置上
//			     theDiv.attr("class", opt.chbox); //恢复对象的初始样式
//			     $('.drag_module_dash').remove(); // 删除新建的虚线div
//			     move=false;
//			   });
//		     
//		  }
//			
//			
//		}
//		
//		
//	})
//})(jQuery)




(function ($) {
	$.extend({
		Argea:function (config) {
			var settings = {
				fabox:'',
				chbox:''
			};
			var opt = $.extend(settings,config);
			var range = { x: 0, y: 0 };//鼠标元素偏移量
			var lastPos = { x: 0, y: 0, x1: 0, y1: 0 }; //拖拽对象的四个坐标
			var tarPos = { x: 0, y: 0, x1: 0, y1: 0 }; //目标元素对象的坐标初始化
			var theDiv = null, move = false;//拖拽对象 拖拽状态
			var theDivId =0, theDivHeight = 0, theDivHalf = 0; tarFirstY = 0; //拖拽对象的索引、高度、的初始化。
			var tarDiv = null, tarFirst, tempDiv; //要插入的目标元素的对象, 临时的虚线对象
			
			function loopbox(){//循环初始化
		     $(opt.fabox).find(opt.chbox).each(function(){
		       $(this).mousedown(function (event){
		         //拖拽对象
		         theDiv = $(this);
		         //鼠标元素相对偏移量
		         range.x = event.pageX - theDiv.offset().left;
		         range.y = event.pageY - theDiv.offset().top;
		         theDivId = theDiv.index();
		         theDivHeight = theDiv.height();
		         theDivHalf = theDivHeight/2;
		         move = true;
		         theDiv.attr("class","drag_module_maindash");
		         // 创建新元素 插入拖拽元素之前的位置(虚线框)
		         $("<div class='drag_module_dash'></div>").insertBefore(theDiv);
		       });
		     });
		     $(opt.fabox).mousemove(function(event) {
			     if (!move) return false;
			     lastPos.x = event.pageX - range.x;
			     lastPos.y = event.pageY - range.y;
			     lastPos.y1 = lastPos.y + theDivHeight;
			     // 拖拽元素随鼠标移动
			     theDiv.css({left: lastPos.x + 'px',top: lastPos.y + 'px'});
			     // 拖拽元素随鼠标移动 查找插入目标元素
			     var $main = $(opt.chbox); // 局部变量：按照重新排列过的顺序 再次获取 各个元素的坐标，
			     tempDiv = $(".drag_module_dash"); //获得临时 虚线框的对象
			     $main.each(function () {
			       tarDiv = $(this);
			       tarPos.x = tarDiv.offset().left;
			       tarPos.y = tarDiv.offset().top;
			       tarPos.y1 = tarPos.y + tarDiv.height()/2;
			       tarFirst = $main.eq(0); // 获得第一个元素
			       tarFirstY = tarFirst.offset().top + theDivHalf ; // 第一个元素对象的中心纵坐标
			       //拖拽对象 移动到第一个位置
			       if (lastPos.y <= tarFirstY) {
			           tempDiv.insertBefore(tarFirst);
			       }
			       //判断要插入目标元素的 坐标后， 直接插入
			       if (lastPos.y >= tarPos.y - theDivHalf && lastPos.y1 >= tarPos.y1 ) {
			         tempDiv.insertAfter(tarDiv);
			       }
			     });
			   }).mouseup(function(event) {
			    if(theDiv==null) return false;
			     theDiv.insertBefore(tempDiv); // 拖拽元素插入到 虚线div的位置上
			     theDiv.attr("class", opt.chbox); //恢复对象的初始样式
			     $('.drag_module_dash').remove(); // 删除新建的虚线div
			     move=false;
			   });
		     
		  }
			loopbox()
		}
		
	});
})(jQuery);

