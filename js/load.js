var time_delay=null;
$(document).ready(function(){
   $("#Floatingbar").Floatingbar();
   if ($("#scrollobj").length>0)
   { setInterval("scroll(document.getElementById('scrollobj'))",30);   }	
   
		if ($("#playBanner").length>0)
		{
				$("#playBanner").Xslider({
					speed: 600, 
					space: 3000,
					auto: true, //自动滚动
					affect:'scrollx',
					ctag: 'div'
				});
		}
	$.fn.scroll_({arrows:false,mouseWheelSpeed: 30,verticalGutter:15});
	setTimeout(function(){
		$('#IntroductionTab').Tab({lilab:"li",labselect:".change",Tabname:".Tab_nr",labaction:"click",animatename:"scroll_x",animateTime:300,mode:"none"})
	},100)
	$('#ZhiYeTab').Tab({lilab:"li",labselect:".change",Tabname:".ZhiYe_box",labaction:"click",animatename:"scroll_x",animateTime:300,mode:"none"})
	$("#PhotoGundong").jcarousellite_gundong({btn:1,list:".PhotoList li","visible":5,"auto":2500,"speed":300})		
	$(".ad,#Version,.bigPhoto li,.bigPhoto2 li,.photolist4 li,.photolist3 li").GameHover("#787878",2,0,1);
	
	$(".bigPhoto,.photolist3 li").bind('mouseenter',function(){
			var self=$(this).find("img");
			time_delay=setTimeout(function(){
						if(!self.is(":animated"))
						{
							self.addClass("star_animate");
							self.stop(true,false).animate({"opacity":1}, 500);
						}
				
			},100)
		
	}).bind('mouseleave',function(){
			clearTimeout(time_delay)	
					var self=$(this).find("img")
					if (self.is(".star_animate"))
					{		
							
							self.stop(true,false).animate({"opacity":1}, 500);
							self.removeClass("star_animate");
					}
	})
			
			
	$(".PhotoList li").bind('mouseenter',function(){
			var self=$(this)
			time_delay=setTimeout(function(){
						if(!self.is(":animated"))
						{
							self.addClass("star_animate");
							var img=self.find("img");
							self.stop(true,false).animate({"top":"-10px"},300)
							img.stop(true,false).animate({"opacity":0.6}, 500);
						}
				
			},100)
		
	}).bind('mouseleave',function(){
			clearTimeout(time_delay)	
				var self=$(this)
					if (self.is(".star_animate"))
					{		
							var img=self.find("img");
							self.stop(true,false).animate({"top":"0"},200)
							img.stop(true,false).animate({"opacity":1}, 500);
							self.removeClass("star_animate");
					}
	})
			
			
		$(".ad").bind('mouseenter',function(){
					var self=$(this)
					clearTimeout(time_delay)	
					time_delay=setTimeout(function(){
								if(!self.is(":animated"))
								{
									self.addClass("hover");
									var self_img=self.find("img");
									//var self_fdj=self.find(".icon_fdj");
									var easing={ duration:1300,easing:'easeOutElastic' };
									//var easing2={ duration:300,easing:'easeInOutCirc' };
									//self_img.animate({"opacity":"0.6"}, 400);
									//self_fdj.stop(true,false).animate({"opacity":"1","top":"40%"}, easing);
									self_img.stop(true,false).animate({"margin-left":"-10%","width":"120%","height":"120%" }, easing);
									
								}
						
					},100)
				
			}).bind('mouseleave',function(){
				   clearTimeout(time_delay)	
							var self=$(this)
							if (self.is(".hover"))
							{		
									
									var self_img=self.find("img");
									//var self_fdj=self.find(".icon_fdj");
									var easing={ duration:800,easing:'easeInOutCirc' };
									//self_img.stop(true,false).animate({"opacity":"1"}, 400);
									self_img.stop(true,false).animate({"margin-left":"0","margin-top":"0","width":"100%","height":"100%"},easing);									
									self.removeClass("hover");
							}
			})	
		
	//返回顶部 
	$(".btn_backtop").bind("click",function(){
		$("html,body").stop(true,false).animate({scrollTop:0},1000)
	return false;	
	})	
		
})

function scroll(obj) {
	var tmp = (obj.scrollLeft)++;
	//当滚动条到达右边顶端时
	if (obj.scrollLeft==tmp) obj.innerHTML += obj.innerHTML;
	//当滚动条滚动了初始内容的宽度时滚动条回到最左端
	if (obj.scrollLeft>=obj.firstChild.offsetWidth) obj.scrollLeft=0;
}



//加载滚动条
$.fn.scroll_=function(config){
	var scrollobj=$("[data-scroll]")
	if (scrollobj.length==0) return false;
	scrollobj.each(function(index, element) {
			var self=$(this)
			if (self.length==0)  return false;
			
			var h=parseInt(self.attr("data-scroll-height")),
				w=parseInt(self.attr("data-scroll-width")),
				color=self.attr("data-scroll-color");
				self.css({"width":"100%"});
				self.wrap('<div class="container1" style="width:'+w+'px"></div>').wrap('<div class="div_scroll"></div>');
				self.parents('.div_scroll').css({height:h}).scroll_absolute(config)	
				self.find("img").load(function(){self.parents('.div_scroll').scroll_absolute(config);})
			
			if (typeof(color)!="undefined")
			{setTimeout(function(){self.parents(".container1").find(".scroll_drag").css({"background":color})},500);}
	});
}
//选项卡切换
		$.fn.Tab=function(config){
			var self=$(this);
			var select_=0;
			var classname=config.labselect.replace(".","")
			if (self.length==0) return false;
			if (self.find(config.lilab).length==0) return false;
			
			
			self.each(function(index, element) {
							
				self=$(this);
						
						if (self.find(config.labselect).length==0) 
						{self.find(config.lilab+":eq(0)").addClass(classname);}
						self.find(config.lilab).each(function(index, element) {
							if (!$(this).is(config.labselect))
							{
								self.siblings(config.Tabname+":eq("+index+")").hide();
							}
						});
						
						self.find(config.lilab).bind(config.labaction+".action",function(){
							
							var index=$(this).index();
							if(self.siblings(config.Tabname+":visible").is(":animated")){ 
							return false;
							
							}

							
							if ($(this).is(config.labselect)) return false;
							var index2=$(this).siblings(config.labselect).index()
							$(this).addClass(classname).siblings().removeClass(classname);
							
							config.animate(index,index2,config.animatename)
							return config.labaction=="click"?   false :  true;
						})
						
						config.animate=function(index,index2,active){
							
							switch (active)
							{
								case "fade":
									self.siblings(config.Tabname+":visible").hide();
									self.siblings(config.Tabname+":eq("+index+")").fadeIn(config.animateTime);
								break;
								case "scroll_x":
									self.parent().css({"position":"relative","overflow":"hidden"});
									var selfs=self.siblings(config.Tabname+":visible")
									var dr="100%",dr2="100%"
									if (index2>index)
									{
										dr="100%";
										dr2="-100%"
									}
									else
									{
										dr="-100%";
										dr2="100%"
									}
									var top=selfs.position().top
									
									
									if (config.mode=="delay")		
									{
									//当前渐隐
									selfs
									.css({"position":"relative","width":"100%"})
									.stop(true,false)
									.animate({"left":dr,"opacity":0},config.animateTime,
												function(){
													 $(this).css({"position":"static","left":"auto","opacity":1,"display":"none"}
												)}
											)
									setTimeout(function(){
												self.siblings(config.Tabname+":eq("+index+")").css({"position":"relative","left":dr2,"display":"block","opacity":0})
												.stop(true,false)
												.animate({"left":0,"opacity":1},config.animateTime
												,function(){
														$(this).css({"top":0,"position":"static"})	
														
												})
									},config.animateTime)		
								
									}
									
									else
									{
										
											selfs
											.css({"position":"absolute","width":"100%","left":selfs.position().left,"top":selfs.position().top})
											.stop(true,false)
											.animate({"left":dr,"opacity":0},config.animateTime,
												function(){
													 $(this).css({"position":"relative","top":"auto","left":"auto","opacity":1,"display":"none"}
												)}
											)
									
									
												self.siblings(config.Tabname+":eq("+index+")").css({"position":"relative","left":dr2,"display":"block","opacity":0})
												.stop(true,false)
												.animate({"left":0,"opacity":1},config.animateTime
												,function(){
														$(this).css({"top":0,"position":"relative"})	
														
												})
									}
								break;
								
								
								case "none":
									self.siblings(config.Tabname+":visible").hide();
									self.siblings(config.Tabname+":eq("+index+")").show();
								break;	
								
							}
							
							
						}


            });

		}

//滚动
		$.fn.jcarousellite_gundong=function(options ){
			var self=$(this);
			if (self.length==0) return false;
			var items=options.list,config;
			if (self.find(items).length<=options.visible) 
			{
				var width=self.find(options.list).parent().outerWidth()
				self.css({"margin":"0 auto","width":width})
			return false;	
			}
			else
			{
				var liobj=self.find(options.list)
				var width=liobj.outerWidth()
				var margin=parseInt(liobj.css("margin-left"))+parseInt(liobj.css("margin-right"));
				width+=margin
				self.css({"margin":"0 auto","width":width*options.visible})
			}
			self.css("overflow","visible");
			
			if (self.find(items).is("div"))
			{
				self.find(items).wrap("<li></li>");
				self.find(items).parent().wrapAll("<ul class='templist'></ul>");		
				items=".templist li"
			}
			self.find(items).parent().wrapAll('<div class="jCarouselLite"></div>').parent().wrapAll('<div class="gundong"></div>');
			
			
			if (options.btn!=0)
			{
				self.find(".gundong").append('<span class="clear"></span><a href="javascript:;"  class="move_right"><span></span></a><a href="javascript:;" class="move_left disabled" ><span></span></a>')
			}
			
			self.find(".gundong").each(function(index){
				
				config={
							btnPrev: $(this).find(".move_left:eq("+index+")"),
							btnNext: $(this).find(".move_right:eq("+index+")"),
							visible:1,
							auto: 2500 ,
							speed: 300
						}	
				if (options.btn==0)		
				{
					$.extend(config, {btnPrev:null,btnNext:null});							
				}
				$.extend(config, options);
				$(this).find(".jCarouselLite:eq("+index+")").jCarouselLite(config);	
			})
		}
		
		
		//悬停效果
	$.fn.GameHover=function(bordercolors,width,margin,jiaocuo){
		var time_delay=null;
		var self=$(this)
		if (self.length==0) return false;
		
		var writehtml="<span class='line_top'></span><span class='line_right'></span><span class='line_bom'></span><span class='line_left'></span>"
		self.each(function(index, element) {
            $(this).append(writehtml)
			var line_top=$(this).find(".line_top");
			var line_right=$(this).find(".line_right");
			var line_bom=$(this).find(".line_bom");
			var line_left=$(this).find(".line_left");
			var bordercolor=bordercolors
			if (jiaocuo==1)
			{
				jiaocuo=margin;
			}
			else
			{
				jiaocuo=0;
			}
			line_top.css({"position":"absolute","left":jiaocuo,"top":margin,"height":width+"px",width:0,"overflow":"hidden","line-height":0,"font-size":0,"background":"#b9b9b9"});
			line_right.css({"position":"absolute","right":margin,"top":jiaocuo,"width":width+"px",height:0,"overflow":"hidden","line-height":0,"font-size":0,"background":"#a8a8a8"});
			line_bom.css({"position":"absolute","right":jiaocuo,"bottom":margin,"height":width+"px",width:0,"overflow":"hidden","line-height":0,"font-size":0,"background":"#929292"});
			line_left.css({"position":"absolute","left":margin,"bottom":jiaocuo,"width":width+"px",height:0,"overflow":"hidden","line-height":0,"font-size":0,"background":"#7f7f7f"});
        });
		
	
		var line_top,line_right,line_bom,line_left,txt_right;
		self.bind('mouseenter',function(){
					var selfs=$(this);
					line_top=selfs.find(".line_top");
					line_right=selfs.find(".line_right");
					line_bom=selfs.find(".line_bom");
					line_left=selfs.find(".line_left");
					txt_right=selfs.find(".txt_right")
					
					time_delay=setTimeout(function(){
								if(!selfs.is(":animated"))
								{
									
									selfs.addClass("star_animate");
									var easing={ duration:500,easing:'easeInOutCirc' };
									line_top.stop(true,false).animate({"width":"100%"}, easing);
									line_bom.stop(true,false).animate({"width":"100%"}, easing);
									line_right.stop(true,false).animate({"height":"100%"}, easing);
									line_left.stop(true,false).animate({"height":"100%"}, easing);
									txt_right.stop(true,false).animate({"left":"250"}, 500);
								}
						
					},100)
				
			}).bind('mouseleave',function(){
				    clearTimeout(time_delay)	
							var selfs=$(this);
							if (selfs.is(".star_animate"))
							{		
									selfs.removeClass("star_animate");
								
									var easing={ duration:800,easing:'easeInOutCirc' };
									line_top.stop(true,false).animate({"width":"0%"}, easing);
									line_bom.stop(true,false).animate({"width":"0%"}, easing);
									line_right.stop(true,false).animate({"height":"0%"}, easing);
									line_left.stop(true,false).animate({"height":"0%"}, easing);
									txt_right.stop(true,false).animate({"left":"10"}, 500);
							}
			})	
	
		
		
	}
	

//弹窗口
function show(file,width,height)
{	
	$("#window").empty().remove();
	$("body").append('<div id="window"><div id="float_window"><iframe src="'+file+'" style="width:'+width+';height:'+height+';background-color:transparent;overflow:hidden;" scrolling="no" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe><span class="closewindow"></span></div></div>')
	$("#window").css("height",$(window).height()).show()
	$("#float_window").css({"width":width,"height":height,"margin-left":"-"+parseInt(width/2)+"px","margin-top":"-"+parseInt(height/2)+"px"})
	$(".closewindow").unbind("click");
	$(".closewindow").bind("click",function(){$("#window").empty().remove();})
}

//浮动条
$.fn.Floatingbar=function(){
			var self=$(this);
			if (self.length==0) return false;
			var w=self.outerWidth()
			var btn=self.find(".arrow")
		//显示
		if (self.attr("data-open")==1)
		{
			self.css("right",0)
		}
		//收起
		else
		{
			btn.addClass("btnclose")
			self.css("right",-w)
			
			
		}
		
		btn.bind("click",function(){
			if ($(this).is(".btnclose"))	
			{
				
				self.animate({"right":"0"},500)
				$(this).removeClass("btnclose")
			}
			else
			{
				
				self.animate({"right":-w},500)
				$(this).addClass("btnclose")
			}
			
		})
}


//关闭窗口
function closewindow(){$("#window").empty().remove();}					
					
	
	