var viewport = offcanvas = {
	left: {}
};

$(document).ready(function () {
	$('label[for]').on('click', function (e) {
		var target = window[this.htmlFor];
		target.checked = !target.checked;
		e.preventDefault();
	});
	//cover = $('<div class="cover"/>');
//	$('.canvas_container').find('.main_wrapper').append(cover);
//	
//	offcanvas.left.$trigger = $('.menu_icon');
//	offcanvas.$close = $('.cover');
//	
//	
//	// bind events
//	offcanvas.left.$trigger.click(function(e) {
//		e.preventDefault();
//		offcanvas.left.toggler();
//	});
//	offcanvas.$close.click(function(e) {
//		e.preventDefault();
//		$('body').removeClass('canvas_opened');
//		cover.hide();
//	});
//
//	offcanvas.left.toggler = function() {
//		$('body').toggleClass('canvas_opened');
//		cover.show();
//	};
//	
//	
	
	
	var offCanvas = $('.flexnav').html();
	$('.offcanvas_menu').html(offCanvas);
	//alert(document.getElementsByTagName("html")[0].className);
	 //require(['lib/rivetsconfig'], function(rivets) {
//					 var Tab = Backbone.Model.extend({
//			  defaults: {
//			      current: 1
//			  },
//			  initialize: function () {
//			      this.on("change:current", this.changetab);
//			  },
//			  changetab: function () {
//			      console.log(this.get("current"));
//			  }
//			});
//			var tab = new Tab();
//			var $el = $('.beneficiary');
//			rivets.bind($el, {
//			  tab: tab
//			});
//				 });

$('.fav_icon').click(function(){
	$('.fav_icon').toggleClass('fav_icon_select');
});
iCheck();
function iCheck(){
	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	if(isiPhone)
	{
	  $('.number-type').attr('type','number');
	  
	   $('.number-type').val('10.45');
	}
}	
	//new IScroll('.item_list', { mouseWheel:true, scrollbars:true, fadeScrollbars:true });
	//$('.select_message__structured input').mask('000 / 0000 / 00000')
	$('.yashraja').focus(function(){
		$('input').blur();
	});
	
	//alert($.browser.name);alert($.browser.version);alert($.browser.versionNumber);alert($.os.name); 
	
	$('.filter_period').click(function(){
			$('.option_period').toggleClass('show_active');
			$('.filter_values').css('position', 'initial');
		});
		
		$('.filter_transaction').click(function(){
			$('.option_transaction').toggleClass('show_active');
			$('.filter_values').css('position', 'initial');
		});
	customPrint =  function (event) {
		$('<div>').addClass('printbabes').appendTo('body');
		
		
		 var str = '<div class="print">' +

                '<div class="print_inner">' +

 

                '<div class="print_header">' +

                '<div class="print_col_left f_left">' +

                '<p class="">' +

                '</p>' +

                '</div>' +

                '<div class="print_col_right f_right">' +

                '<p class="print_head_date">';

            var today = new Date();

            var dd = today.getDate();

            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();

            if (dd < 10) {

                dd = '0' + dd;

            }

            if (mm < 10) {

                mm = '0' + mm;

            }

            today = mm + '.' + dd + '.' + yyyy;

            str = str+today;

            str = str+'</p>' +

                '</div>' +

                '</div>' +

                '<div class="print_body">' +

                '<div class="print_copy">' +

                '<div class="print_copy_inner">'+

            $('.module_header__inner').html()+

            

            '<div class="print_details_inner">';

            if ($(event.target).hasClass('global_print')) {

               str = str+ $(".booked_transaction").html();

            } else {

                str = str+$(event.target).parent().parent().parent().parent().html();

            }

            str = str+'</div>' +

                '</div>' +

                '</div>' +

                '</div>' +

                '<div class="print_footer">' +

                '<p>This Website and the information, tools and material contained in it (this "Site") are not directed to, or intended for distribution to or use by, any person or entity who is a citizen or resident of or located in any jurisdiction where such distribution, publication, availability or use would be contrary to law or regulation or which would subject Tata Consultancy Services Limited or its affiliates (collectively "TCS") to any registration or licensing requirement within such jurisdiction.</p>' +

                '</div>' +

                '</div>' +

                '</div>';
				$('.printbabes').html(str);
				$(".printbabes").print();
		
		}
	$('.printbabe').click(function(event){
		
		customPrint(event);
		//$("#steps").print();
	});
	
       
	
	
	
	
	
	
	updateButtons = function () {
      $scroller.width() + $scroller.scrollLeft() + 60 >= this.$(".menu_links").outerWidth() ? this.$(".scroll_btn.right").addClass("inactive") : this.$(".scroll_btn.right").removeClass("inactive"), 0 === $scroller.scrollLeft() ? this.$(".scroll_btn.left").addClass("inactive") : this.$(".scroll_btn.left").removeClass("inactive")
    }
	var $scroller = $(".scroll_container");
	var scrollContainerWidth = $(".scroll_container").width();
	var filterWidth=$('.filter_inner_block').width();
	if(scrollContainerWidth <= filterWidth){
		
		$('.scroll_menu').addClass('show_buttons');
		updateButtons();
	}
	$('.scroll_btn.left').click(function(event){
	
	onLeft(event);
	
	});
	
	$('.scroll_btn.right').click(function(event){
	onRight(event);
	
	});
	
	function onLeft(a) {
      slide(a, !0)
    };
    function onRight(a) {
      slide(a)
    };
    function slide(a, b) {
      var c = this,
        d =  $scroller.scrollLeft(),
        e =  $scroller.width(),
        f = b ? -e : e;
		f = f>0? 150: -150;
       $scroller.animate({
        scrollLeft: d + f
      }, 500, function () {
		  updateButtons();
      })
    };
	
	
	
	//$('.wcm-service-nav').stickyMojo({
//        footerID: '.footer',
//        contentID: '.content_col'
//    });
//    $('.widget').stickyMojo({
//        footerID: '.footer',
//        contentID: '.content_col'
//    });
	$('.faq').click(function (e) {
        e.preventDefault();
		$('.wcm-faq').addClass('faq_pointer');
        $('.widget').addClass('faq-widget');
        $('.faq').addClass('active');
		$('.wcm-messages').addClass('widget_open');
		$('.content_row').addClass('widget_open');
    });
    $('.icon_widget_close').click(function (e) {
        e.preventDefault();
		$('.wcm-faq').removeClass('faq_pointer');
		$('.wcm-faq').removeClass('yash');
        $('.widget').removeClass('faq-widget');
        $('.faq').removeClass('active');
		$('.wcm-messages').removeClass('widget_open');
		$('.content_row').removeClass('widget_open');

    });
  
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = 80;
	
 (function () {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
        document.createTextNode("@-ms-viewport{width:auto!important}")
      );
      document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }
  })();
  //if (Modernizr.touch) {
//    /* cache dom references */
//    var $body = $('body');
//    /* bind events */
//    $(document)
//      .on('focus', 'input', function (e) {
//        $body.addClass('fixfixed');
//      })
//      .on('blur', 'input', function (e) {
//        $body.removeClass('fixfixed');
//      });
//  }
  $(window).scroll(function (event) {
    didScroll = true;
    if ($(".navigation_control").hasClass("menu-show")) {
      $(".navigation_control").removeClass("menu-show");
    }
  });
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
      return;
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('.warning_area').css('top', '0');
      $('.site_header').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('.warning_area').css('top', '80px');
        $('.site_header').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }
  $('.widget .module_listitem').addClass('hide');
  //$('#' + sfNodeId).removeClass('hide');
  
});






$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  function redirectIfNecessary() {
    if ('text/html' == jqXHR.getResponseHeader('Content-Type')) {
      var results = /data-target-url="(.*?)"/.exec(jqXHR.responseText);
      if (results && results.length == 2) {
        window.top.location.replace(results[1]);
      }
    }
  }
  jqXHR.always(redirectIfNecessary);
});

