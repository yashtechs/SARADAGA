var menuSwipe = (function(window, document) {

    var

    // objects
        openButton = $('.menu_icon'),
        container = $('.canvas_container'),
        cover = null,
        canvasOpen = "canvas_opened",

        // Browser checks
        hasTouch = testTouch(),
        offset = testOffset(),

        // Events
        resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize',

        menuSwipe = function(opts) {

            this.options = {
                menu: true,
                swipeToOpen: false,
                breakpoint: 1024,
                menuWidth: 265,
                headerHeight: 50,
                snapThreshold: 1,
                resize:function(){
						$('html').removeClass('canvas_opened');
						container.css({
							height: $(window).height(),
							'margin':'0'
						});
					},
                offsetMenuClass: '',
				animationSpeed: 500,
				direction: 'right',
            };


            // Options from user
            for (i in opts) this.options[i] = opts[i];

            this.resizeSite();

            // add required html
            cover = $('<div class="cover"/>');
            $('.canvas_container').find('.main_wrapper').append(cover);

            // resize listeners
            $(window).on(resizeEvent, this.resizeSite.bind(this));
            this._bindEvents();
        }

    menuSwipe.prototype = {

        info: {},

        x: 0, // starting point
        dx: 0, // distance moved
        ox: null, // original X
        tgt: null, // menu tap target
        desktop: false,
        isTouch: false, // check for touch in start events

        // returns page dimensions in array [ width, height ]
        dimensions: function() {
            return [this.info.docWidth, this.info.docHeight];
        },
        // returns the iOS header offset
        // read more about this further down the document
        offset: function() {
            return offset;
        },
        //returns true or false if the device has touch capabilites	
        hastouch: function() {
            return hasTouch;
        },


		moveDirection: function(){ 
			this.direction = 'margin-'+ this.options.direction;
		},
			
		
        // function to resize site
        resizeSite: function() {
			
            // get page sizes	
            this.info.docHeight = $(window).height();
            this.info.docWidth = $(window).width();
            this.layout();
            // snap
            this.snapThreshold = this.options.snapThreshold === null ?
                Math.round(this.info.docWidth * 0.25) :
                /%/.test(this.options.snapThreshold) ?
                Math.round(this.info.docWidth * this.options.snapThreshold.replace('%', '') / 100) :
                this.options.snapThreshold;
            // resize callback
            if (this.options.resize) {
                this.options.resize();
            }
        },

        // set layout sizes
        layout: function(x) {
            $(this.options.offsetMenuClass).css({
                height: this.info.docHeight
            });
            // mobile / tablet
            if (this.info.docWidth < this.options.breakpoint) {
                this.desktop = false;
                // desktop
            } else {
                this.desktop = true;
                // container
                container.css({
                    width: this.info.docWidth - this.options.menuWidth,
                    'height': 'auto',
                    'margin-left': '0'
                });
                container.find('.cover').css({
                    display: 'none'
                });
            }
            // hide address bar
            this.hideAddressBar();
        },

        // hide the ios address bar
        hideAddressBar: function() {
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 50);
        },

        /**
         * Pseudo private methods
         */

        _bindEvents: function() {
            var _this = this,
                $body = $('body');
            container.on('click', function(e) {
                _this._start(e);
                _this._move(e);
                _this._end(e);
            });
        },

        _start: function(e) {
            if (this.initiated) return; // if already started
            if (this.desktop || !this.options.menu) return; // if menu not applicable
            isTouch = /touch/.test(e.type);

            var point = isTouch ? e.originalEvent.touches[0] : e;
            var point = e;
            this.initiated = true;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this.stepsX = 0;
            this.stepsY = 0;
            this.directionLocked = false;
            this.x = container.offset().left;
            this.ox = -this.x + this.pointX;
            this.tgt = $(e.target);
			
			this.moveDirection();
			var direction = this.direction;
            container.css({ 
                direction: '0',
				'-webkit-transition-property': this.direction,
    			'-webkit-transition-duration': this.options.animationSpeed + 'ms',
            });
        },

        _move: function(e) {

            if (!this.initiated) return;
            if (isTouch !== /touch/.test(e.type)) return;
            if (this.desktop || !this.options.menu || !this.options.swipeToOpen) return; // if menu not applicable

            var point = isTouch ? e.originalEvent.touches[0] : e;
            var point = e;
            this.stepsX += Math.abs(point.pageX - this.pointX);
            this.stepsY += Math.abs(point.pageY - this.pointY);

            // We take a 10px buffer to figure out the direction of the swipe
            if (this.stepsX < 10 && this.stepsY < 10) {
                this.initiated = false;
                return;
            }

            // We are scrolling vertically, so skip SwipeView and give the control back to the browser


            e.preventDefault();
            this.directionLocked = true;

            if (this.ox) {
                var nx = parseInt(point.pageX) - this.ox;
                this.dx = nx - this.x;
                this.x = nx;

                this._moveContainer(nx);
            }

        },

        _end: function(e) {
            if (!this.initiated) return;
            if (isTouch !== /touch/.test(e.type)) return;
            if (this.desktop || !this.options.menu) return; // if menu not applicable

            //var point = isTouch ? e.originalEvent.changedTouches[0] : e,
            var point = e,
                nx = parseInt(point.pageX) - this.ox;

            // choose direction based on dx	
            if (this.dx <= 0) {
                this._animateTo(nx, 0);
            } else {
                this._animateTo(nx, this.options.menuWidth);
            }

            // open button
            if (this.dx === 0 && nx === 0 && this.tgt.is('.menu_icon')) {
                this._animateTo(this.options.menuWidth, this.options.menuWidth);
            }

            this.ox = null;
            this.dx = 0;
            this.initiated = false;

        },

        _animateTo: function(x, to) {
            container.css({
                'margin-left': to + 'px',
				'-webkit-transition-property': 'margin-left',
    			'-webkit-transition-duration': this.options.animationSpeed + 'ms',
            });
            this._toggleCover(to);
        },

        _moveContainer: function(x) {
            container.css({
                    'margin-left': x + 'px',
					'-webkit-transition-property': 'margin-left',
    				'-webkit-transition-duration': this.options.animationSpeed + 'ms',
                })
                //$('body').addClass('canvas_opened');
        },

        _toggleCover: function(to) {
            this.info.docHeight = $(window).height();
            this.info.docWidth = $(window).width();
            if (to > this.options.menuWidth - 50) {
                cover.show();
                $('html').addClass('canvas_opened');
                container.css({
                    width: this.info.docHeight,
                    height: this.info.docHeight
                });

            } else {
                cover.hide();
                $('html').removeClass('canvas_opened');
                container.css({
                    width: 'auto',
                    height: '100%'
                });
            }

            
        }

    };

    /**
     * Feature Tests
     */

    // test for touch deveices - from Modernizr
    function testTouch() {
        var bool = false;
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            bool = true;
            $('html').addClass('touch');
        } else {
            $('html').addClass('pointer');
        }
        return bool;
    }

    // if mobile safari - figure out thee address bar height offset
    // read the Question here: http://forum.jquery.com/topic/window-height-mobile-safari-and-the-iphone-address-bar
    // this is the answer to the issue
    function testOffset() {
        var offset = 0;
        // if safari on ios or ipod but not chrome
        if (navigator.userAgent.match(/(iPhone|iPod)/i)) {
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('CriOS') == -1) {
                offset = 60;
            }
        }
        // if in safari fullscreen mode
        if (("standalone" in window.navigator) && window.navigator.standalone) {
            offset = 0;
        }
        return offset;
    }
    return menuSwipe;

})(window, document);