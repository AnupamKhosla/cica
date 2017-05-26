    //global module to be used for all other modules
    var global = function() {

        // Module starts: For user agent device details
        var userAgent = function() {
            var yesIfTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            var yesIfRatina = (window.devicePixelRatio > 1);

            function isTouchDevice() {
                return yesIfTouchDevice;
            }

            function isRatina() {
                return yesIfRatina;
            }

            function width() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            }

            function lightboxRatina() {
                var lightboxLink = $("a[data-lightbox]:not(.l-loaded)"); //.l-loaded will revalidate only new ajaxy image pop ups
                var src = (width() > 767) ? 'data-src' : 'data-src-small';

                if (isRatina()) {
                    lightboxLink.each(function(index, ele) {
                        var dataSrc = $(ele).attr(src);
                        if (!!dataSrc) {
                            if (dataSrc.split("|")[1]) {
                                $(ele).attr("href", dataSrc.split("|")[1]);
                            } else {
                                // if high res ratina src is unavailable then fallback to normal src.
                                $(ele).attr("href", dataSrc.split("|")[0]);
                            }
                            $(ele).addClass("l-loaded");
                        } else if (!dataSrc) {
                            if (src == 'data-src-small') {
                                //if small src is unavailable fallback to big src
                                if (!!$(ele).attr("data-src")) {
                                    $(ele).attr("href", $(ele).attr("data-src").split("|")[0]);
                                    console.warn("Custom ERROR: ", ele, " data-small-src is not defined or empty; fallbacked to data-src");
                                } else {
                                    console.warn("Custom ERROR: ", ele, " data-src is not defined or empty");
                                }
                                $(ele).addClass("l-loaded");
                            }
                        }
                    });
                } else if (!isRatina()) {
                    lightboxLink.each(function(index, ele) {
                        var dataSrc = $(ele).attr(src);
                        if (!!dataSrc) {
                            $(ele).attr("href", dataSrc.split("|")[0]);
                            $(ele).addClass("l-loaded");
                        } else if (!dataSrc) {
                            if (src == 'data-src-small') {
                                //if small src is unavailable fallback to big src
                                if (!!$(ele).attr("data-src")) {
                                    $(ele).attr("href", $(ele).attr("data-src").split("|")[0]);
                                    console.warn("Custom ERROR: ", ele, " data-small-src is not defined or empty; fallbacked to data-src");
                                } else {
                                    console.warn("Custom ERROR: ", ele, " data-src is not defined or empty");
                                }
                                $(ele).addClass("l-loaded");
                            }
                        }
                    });
                }
            }
            lightboxRatina(); // calling here to initiate ratina on lightbox
            /* MODULE finishes: Ratina images in lightbox  */

            return {
                isTouchDevice: isTouchDevice,
                isRatina: isRatina,
                width: width,
                lightboxRatina: lightboxRatina
            }
        }();
        // Module finishes: User Agent



        var bLazy = new Blazy({

            breakpoints: [{
                width: 767, //max-width
                src: 'data-src-small'
            }],

            success: function(ele) {
                $(ele).closest('.image-wrapper').addClass('image-loaded');
            },
            error: function(ele, msg) {

                var image = $(ele)[0];
                if (msg === 'missing') {
                    console.warn("Custom ERROR: ", image, " data-src is missing\n");
                } else if (msg === 'invalid') {
                    console.warn("Custom ERROR: ", image, " data-src is invalid\n");
                }
            }
        });

        return {
            userAgent: userAgent,
            bLazy: bLazy
        }
    }();


    (function($) {
        $(document).ready(function() {

            // MODULE starts Global rules Module for touch devices and js enabled starts
            ! function() {
                $("body").addClass("js-enabled");

                if (global.userAgent.isTouchDevice()) {
                    $("body").addClass("touch-device");
                } else if (!global.userAgent.isTouchDevice()) {
                    $("body").addClass("not-touch-device");
                }
            }();
            // MODULE finishes: Global rules Module for touch devices and js enabled starts









            /* MODULE starts Toggle places in the footer */
            if (!global.userAgent.isTouchDevice()) {
                $(".collapsiblock.collapsiblockCollapsed > h2.menu-item").on('mouseenter', function() {
                    if (!$(this).parent(".collapsiblock.collapsiblockCollapsed").hasClass("open")) {
                        $("#block-block-7 .content").slideDown(1000);
                        $('html, body').animate({
                            scrollTop: $(this).offset().top
                        }, 700);
                        $(this).parent(".collapsiblock.collapsiblockCollapsed").addClass("open ing").delay(1000).queue(function() {
                            $(this).removeClass("ing").dequeue();
                        });
                        $(".all-places .closeIcon").show();
                    }
                });

            } else if (global.userAgent.isTouchDevice()) {
                $(".collapsiblock.collapsiblockCollapsed > h2.menu-item").on('click', function() {
                    if (!$(this).parent(".collapsiblock.collapsiblockCollapsed").hasClass("open")) {
                        $("#block-block-7 .content").slideDown(1000);
                        $('html, body').animate({
                            scrollTop: $(this).offset().top
                        }, 700);
                        $(this).parent(".collapsiblock.collapsiblockCollapsed").addClass("open ing").delay(1000).queue(function() {
                            $(this).removeClass("ing").dequeue();
                        });
                        $(".all-places .closeIcon").show();
                    }
                });
            }

            $(".collapsiblock.collapsiblockCollapsed").on('click', function() {
                if ($(this).hasClass("open") && !$(this).hasClass("ing")) {
                    $(this).addClass("ing");
                    $("#block-block-7 .content").css({ 'height': $(window).height() })
                    $("#block-block-7 .content").slideUp(700);
                    $(this).delay(800).queue(function() {
                        $(".all-places .closeIcon").hide();
                        $("#block-block-7 .content").css("height", "auto");
                        $(this).removeClass("open ing");
                        $(this).dequeue();
                    });
                }
            });
            /* MODULE finsihes: Toggle places  */






            /* MODULE starts: B-Lazy Plugin, Bootstrap tabs and carousel customization with responsive version  */
            (function() {

                if (!global.userAgent.isTouchDevice()) {
                    // Touch screen devices should work with bootstrap default functionality.

                    //The below two events will add hovered class so that next arrow icon work only
                    // after mouseleave has been perfprmed.

                    function changeTab() {
                        if ($(this).closest(".nav-tabs").hasClass("nav-tabs-responsive2") && global.userAgent.width() > 991) {
                            //Above 991 px the middle tab section should work normally
                            $(this).tab('show');
                        } else if ($(this).closest("li").hasClass("next") && !$(this).closest("li").hasClass("hovered")) {
                            $(this).closest(".nav-tabs").children("li").removeClass("hovered");
                            $(this).tab('show');
                        } else if ($(this).closest("li").hasClass("prev") && !$(this).closest("li").hasClass("hovered")) {
                            $(this).closest(".nav-tabs").children("li").removeClass("hovered");
                            $(this).tab('show');
                        }
                    }

                    function outOfHover() {
                        if ($(this).closest("li").hasClass("hovered")) {
                            $(this).closest(".nav-tabs").children("li").removeClass("hovered");
                        }
                    }

                    $('[data-toggle="tab"], [data-toggle="pill"]').on('mouseleave', outOfHover); //removes class hovered
                    $('[data-toggle="tab"], [data-toggle="pill"]').on('mouseenter', changeTab); //runs bootstrap tabs like slider

                    var triggerClickTab;
                    var triggerClickCarousel;

                    function triggerClick(that) {
                        $(that).trigger("click");
                    }

                    function triggerClickNext(that) {
                        $(that).closest(".nav-tabs").children("li.next").children("a").trigger("click");
                    }

                    function triggerClickPrev(that) {
                        $(that).closest(".nav-tabs").children("li.prev").children("a").trigger("click");
                    }

                    $('[data-toggle="tab"], [data-toggle="pill"]').on('mouseenter', function() {
                        var that = this;

                        //chrome browsr bug: mouseleave/mouseout isn't fired on [li.next > a] and [li.prev > a] on tab.show event
                        // when use keeps hovering. This bug is fixed with below if-else condition
                        if ($(that).closest("li").hasClass("prev")) {
                            //if the first mouseover was on prev arrow icon then keep cycling previous slides.                     
                            triggerClickTab = setInterval(triggerClickPrev, 1650, that);
                        } else if ($(that).closest("li").hasClass("next")) {
                            //if the first mouseover was on next arrow icon then keep cycling next slides.                   
                            triggerClickTab = setInterval(triggerClickNext, 1650, that);
                        }
                    });

                    $('[data-toggle="tab"], [data-toggle="pill"]').on('mouseleave', function() {
                        clearInterval(triggerClickTab);
                    });



                    $("#myCarousel .carousel-control").on('mouseenter', function() {

                        if ($(this).hasClass("left")) {
                            $("#myCarousel").carousel('prev');
                        } else if ($(this).hasClass("right")) {
                            $("#myCarousel").carousel('next');
                        }

                        var that = this;
                        triggerClickCarousel = setInterval(triggerClick, 1650, that);
                    });

                    $("#myCarousel .carousel-control").on('click', function() {

                        clearInterval(triggerClickCarousel);

                        var that = this;
                        triggerClickCarousel = setInterval(triggerClick, 1650, that)
                    });

                    $("#myCarousel .carousel-control").on('mouseleave', function() {
                        clearInterval(triggerClickCarousel);
                    });
                }
                /* end if Condition for non-touch device finsihes here */

                $(document).on('show.bs.tab', '.nav-tabs [data-toggle="pill"], .nav-tabs [data-toggle="tab"]', function(e) {
                    var $target = $(e.target);
                    var $tabs = $target.closest('.nav-tabs');
                    var $current = $target.closest('li');
                    var $parent = $current.closest('li.dropdown');
                    $current = $parent.length > 0 ? $parent : $current;
                    var $next = $current.next();
                    var $prev = $current.prev();

                    var updateDropdownMenu = function($el, position) {
                        $el
                            .find('.dropdown-menu')
                            .removeClass('pull-left pull-center pull-right')
                            .addClass('pull-' + position);
                    };

                    $tabs.find('>li').removeClass('hovered');

                    if ($current.hasClass("next")) {
                        $next.addClass('hovered');

                    } else if ($current.hasClass("prev")) {
                        $prev.addClass('hovered');
                    }

                    $tabs.find('>li').removeClass('next prev');
                    $prev.addClass('prev');
                    $next.addClass('next');

                    updateDropdownMenu($prev, 'left');
                    updateDropdownMenu($current, 'center');
                    updateDropdownMenu($next, 'right');
                });

                $(document).on('shown.bs.tab', '.nav-tabs [data-toggle="pill"], .nav-tabs [data-toggle="tab"]', function(e) {
                    /*global.bLazy Revalidated to check for new images in newly shown tab*/
                    global.bLazy.revalidate();
                });


                $("#myCarousel .carousel-inner").css("overflow", "visible");
                // Applied overflow visible so that otherbox shado of images show up.


                /*global.bLazy Revalidated to check for new images in newly shown slide*/
                $('#myCarousel').on('slid.bs.carousel', function() {
                    global.bLazy.revalidate();
                    $("#myCarousel .carousel-inner").css("overflow", "visible");
                    // Reverted overflow back to normal after slide moved.
                });

                $('#myCarousel').on('slide.bs.carousel', function() {

                        $("#myCarousel .carousel-inner").css("overflow", "hidden");
                        // Removed overflow visible so that other slides content don't show.

                    })
                    /* IMPORTANT: I don't remeber why I needed to triggere global.blazy on window.resize. It might be needed so if anything goes wrong try uncommenting this.
                    $(window).resize(function() {
                        global.bLazy.revalidate();
                    });
                    */
            }());
            /* MODULE finishes: Bootstrap tabs and carousel customization with responsive version */



            //MODULE starts: Two paragraphs in footer slide effect
            ! function() {
                if (!global.userAgent.isTouchDevice()) {

                    var alreadyHovered = 0;

                    function heightadjuster() {
                        $("footer .message").css({
                            height: $(".about-me.active").height()
                        });
                    }
                    heightadjuster();

                    $(".brqx-flags .flag-wrapper").on('mouseenter', function() {

                        if (!alreadyHovered) {
                            alreadyHovered = 1;
                            $(this).addClass("active");
                            var position = $(this).index(".brqx-flags .flag-wrapper");

                            $(".brqx-flags").addClass("animate");
                            $("footer .about-me.active").removeClass("active");
                            $("footer .message").addClass("animate");
                            $("footer .about-me").eq(position).addClass("active").delay(500).queue(function() {
                                $("footer .about-me").eq(position).addClass("showing").dequeue();
                            }).delay(3000).queue(function() {
                                $("footer .about-me").eq(position).addClass('shown').dequeue();
                            });

                            heightadjuster()

                        } else {

                            if (!$(this).hasClass("active")) {
                                $(".brqx-flags .flag-wrapper.active, footer .about-me.active").removeClass("active");
                                $(this).addClass("active");
                                $("footer .about-me").removeClass("showing shown");
                                $("footer .about-me").clearQueue();
                                var position = $(this).index(".brqx-flags .flag-wrapper");

                                $("footer .about-me").eq(position).addClass("active").delay(10).queue(function() {
                                    $("footer .about-me").eq(position).addClass("showing").dequeue();
                                }).delay(3000).queue(function() {
                                    $("footer .about-me").eq(position).addClass('shown').dequeue();
                                });

                                heightadjuster();

                            }
                        }

                    });


                    function winHeightAdj() {
                        $(window).off("resize.flagmotion");
                        var throttle = setTimeout(function() {
                            $(window).on("resize.flagmotion", winHeightAdj);
                            heightadjuster();
                        }, 60);
                    }
                    $(window).on("resize.flagmotion", winHeightAdj);

                }
            }();
            //MODULE finishes: Two paragraphs in footer slide effect


            //MODULE starts: working of recuerdo-rose like pop up on all links
            ! function() {
                $("a.pop-link span.link-description").each(function() {

                    var str = $(this).text().trim();
                    if (str.length < 25) {
                        $(this).addClass("dont-wrap");
                    } else if (str.length > 60) {
                        $(this).css("width", "300px");
                    }
                });
            }();
            //MODULE finishes: working of recuerdo-rose like pop up on all links


            //Module starts: Language select-box in top 
            ! function() {
                $(".not-touch-device #lang_select").mouseenter(function(e) {
                    $(this).children(".options").toggleClass("shown");
                    if ($(this).children(".options").hasClass("shown")) {
                        $(".not-touch-device #lang_select").one("mouseleave", function(event) {
                            $("#lang_select .options").removeClass("shown");
                        });
                    }
                });

                $(".touch-device #lang_select").click(function(e) {
                    $(this).children(".options").toggleClass("shown");
                    if ($(this).children(".options").hasClass("shown")) {
                        $(document).one("click", function(event) {
                            if ($(event.target).closest('#lang_select').length === 0) {
                                $("#lang_select .options").removeClass("shown");
                            }
                        });
                    }
                    e.stopPropagation();
                });

                $("#lang_select .option").click(function(e) {
                    $("#lang_select #lang_selected").html($(this).html());
                    $(this).siblings(".option").removeClass("active");
                    $(this).addClass("active");
                    e.stopPropagation();
                });

                $(".touch-device #lang_select").one("click", function() {
                    global.bLazy.revalidate();
                });

                $(".not-touch-device #lang_select").one("mouseover", function() {
                    global.bLazy.revalidate();
                });


            }();
            //MODULE finishes: Language select-box in top  

            //MODULE STARTS: Bootstrap PI modal show on hover
            ! function() {
                $(".not-touch-device .right-menu .PI").mouseenter(function() {
                    $(".not-touch-device .PI .modal").modal('show');
                });
            }();
            //MODULE Finishes: Bootstrap PI modal show on hover


            //MODULE STARTS: Flexslider V or H type
            ! function() {

                var slideSize;
                var initialized = 0;
                var gridSize;

                $('#myCarousel').on('slide.bs.carousel', function(e) {

                    if (!initialized && $(e.relatedTarget).hasClass("flex-slider")) {

                        initialized = 1;

                        function sizer() {
                            if (global.userAgent.width() < 1200) {
                                slideSize = ($("#myCarousel").width() - 15) / 3;
                                gridSize = 3;
                            } else {
                                slideSize = ($("#myCarousel").width() - 20) / 4;
                                gridSize = 4;
                            }
                        }
                        sizer();

                        var src = (global.userAgent.width() > 767) ? 'data-flex-src' : 'data-flex-src-small';

                        function flexLazy(index, ele) {
                            var flexSrc = $(ele).attr(src);

                            if (src == "data-flex-src-small" && !!flexSrc) {
                                $(ele).attr("data-src-small", flexSrc);
                            } else if (src == "data-flex-src-small" && !flexSrc) {
                                if (!!$(ele).attr("data-flex-src")) {
                                    $(ele).attr("data-src-small", $(ele).attr("data-flex-src"));
                                    console.warn("Custom ERROR: ", ele, " data-flex-src-small is not defined or empty; fallbacked to data-flex-src");
                                } else {
                                    console.warn("Custom ERROR: ", ele, " data-flex-src-small is not defined or empty");
                                }
                            } else if (src == "data-flex-src" && !!flexSrc) {
                                $(ele).attr("data-src", flexSrc);
                            } else if (src == "data-flex-src" && !flexSrc) {
                                console.warn("Custom ERROR: ", ele, " data-flex-src is not defined or empty");
                            }

                            $(ele).addClass("b-lazy");
                        }

                        function downloadValue(id) {
                            $(id + " .low-quality").attr("href", "download.php?image_path=" + $(id + " .flex-active-slide > img").attr("data-flex-src").split("|")[0]);
                            $(id + " .high-quality").attr("href", "download.php?image_path=" + $(id + " .flex-active-slide > img").attr("data-flex-src").split("|")[1]);
                        }

                        /* This code was problemetic with window.resize 
                        function aspectRatio() {                                
                            $(this).height(0.75 * $(this).width());
                            //Adjsuting aspect ratio so that flexslider don't streach vertically before lazy loading
                        }
                        */


                        $("#flex-carousel-H img").slice(0, 8).each(flexLazy);
                        $("#flex-slider-H img").slice(0, 2).each(flexLazy);
                        $("#flex-carousel-V img").slice(0, 8).each(flexLazy);
                        $("#flex-slider-V img").slice(0, 2).each(flexLazy);


                        // The slider being synced must be initialized first
                        $('#flex-carousel-H').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            itemWidth: slideSize,
                            itemMargin: 5,
                            maxItems: gridSize,
                            minItems: gridSize,
                            asNavFor: '#flex-slider-H',
                            after: function(slider) {
                                if (global.userAgent.width() >= 1200) {
                                    $("#flex-carousel-H .slides img").slice(((slider.currentSlide - 1) * 4), (((slider.currentSlide + 2) * 4) + 1)).each(flexLazy);
                                } else if (global.userAgent.width() < 1200) {
                                    $("#flex-carousel-H .slides img").slice(((slider.currentSlide - 1) * 3), (((slider.currentSlide + 2) * 3) + 1)).each(flexLazy);
                                }

                                global.bLazy.revalidate();
                            },
                            start: function() {
                                    global.bLazy.revalidate();
                                }
                                /* This code was problemetic with window.resize 
                                start: function() {
                                    $(".flexslider .slides > li").each(aspectRatio);
                                }
                                */
                        });

                        $('#flex-slider-H').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            sync: "#flex-carousel-H",
                            after: function(slider) {
                                if (!!slider.currentSlide) {
                                    $("#flex-slider-H .slides img").slice((slider.currentSlide - 1), (slider.currentSlide + 2)).each(flexLazy);
                                    global.bLazy.revalidate();
                                }
                                downloadValue('#flex-slider-H');
                            },
                            start: function() {
                                downloadValue('#flex-slider-H');
                            }

                        });

                        // The slider being synced must be initialized first
                        $('#flex-carousel-V').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            itemWidth: slideSize,
                            itemMargin: 5,
                            maxItems: gridSize,
                            minItems: gridSize,
                            asNavFor: '#flex-slider-V',
                            after: function(slider) {
                                if (global.userAgent.width() >= 1200) {
                                    $("#flex-carousel-V .slides img").slice(((slider.currentSlide - 1) * 4), (((slider.currentSlide + 2) * 4) + 1)).each(flexLazy);
                                } else if (global.userAgent.width() < 1200) {
                                    $("#flex-carousel-V .slides img").slice(((slider.currentSlide - 1) * 3), (((slider.currentSlide + 2) * 3) + 1)).each(flexLazy);
                                }
                                global.bLazy.revalidate();
                            },
                            /* This code was problemetic with window.resize 
                            start: function() {
                                $(".flexslider .slides > li").each(aspectRatio);
                            }
                            */
                            start: function(slider) {

                            }
                        });

                        $('#flex-slider-V').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            sync: "#flex-carousel-V",
                            after: function(slider) {
                                if (!!slider.currentSlide) {
                                    $("#flex-slider-V .slides img").slice((slider.currentSlide - 1), (slider.currentSlide + 2)).each(flexLazy);
                                    global.bLazy.revalidate();
                                }
                                downloadValue('#flex-slider-V');
                            },
                            start: function(slider) {
                                downloadValue('#flex-slider-V');
                            }

                        });




                        //Trigger clicks on hover
                        $(".flex-direction-nav .flex-next, .flex-direction-nav .flex-prev, .flexcarousel .slides > li").mouseenter(function() {
                            $(this).trigger("click");
                        });


                        function flexSizer() {
                            $(window).off("resize", flexSizer);
                            sizer();
                            $('#flex-carousel-H').data('flexslider').vars.minItems = gridSize;
                            $('#flex-carousel-H').data('flexslider').vars.maxItems = gridSize;
                            $('#flex-carousel-V').data('flexslider').vars.minItems = gridSize;
                            $('#flex-carousel-V').data('flexslider').vars.maxItems = gridSize;

                            setTimeout(function() {
                                var slider1 = $('#flex-carousel-H').data('flexslider');
                                var slider2 = $('#flex-carousel-V').data('flexslider');

                                slider1.resize();
                                slider2.resize();

                                $(window).on("resize", flexSizer);

                            }, 100);
                        }

                        if (!global.userAgent.isTouchDevice()) {
                            $(window).on("resize", flexSizer);
                        }




                    }
                });


            }();
            //MODULE FINISHES: Flexslider V or H type



            //MODULE STARTS: Flexslider download icon

            ! function() {
                $(".touch-device .flex-download .download-icon").click(function(e) {
                    $(".touch-device .flex-download").toggleClass("expanded");
                    if ($(".touch-device .flex-download").hasClass("expanded")) {
                        $(document).one("click", function(e) {
                            $(".touch-device .flex-download").removeClass("expanded");
                        });
                    }

                });

                $(".touch-device .flex-download").click(function(e) {
                    e.stopPropagation();
                });

            }();

            //MODULE FINISHES: Flexslider download icon









            //MODULE STARTS: Table-view functionality starts
            ! function() {
                $(".not-touch-device .table-view").on("mouseenter", ".info", function() {
                    $(this).addClass("expanded");
                });
                $(".not-touch-device .table-view").on("mouseleave", "figure", function() {
                    $(this).children(".info").removeClass("expanded download-shown");
                });

                $(".table-view").on("click", ".download-icon", function() {
                    $(this).parent(".info").toggleClass("download-shown");
                });

                $(".touch-device .table-view").on("click", ".info-icon", function() {
                    $(this).parent(".info").toggleClass("expanded").removeClass("download-shown");
                    $(this).closest("figure").toggleClass("Texpanded");
                });

                $(document).on("click", function(event) {
                    var figure = $(".touch-device .table-view figure");

                    if ($(event.target).closest(figure).length === 0) {
                        figure.removeClass("Texpanded");
                        figure.children(".info").removeClass("expanded download-shown");
                    }
                });
            }();
            //MODULE Finishes: Table-view functionality finishes

            //MOdule for ajaxy stuff  
            ! function() {

                //This will append the image names with thier size suffixes
                //This is global to both tableView and listView
                function nameFixer(name, suffix) {
                    var temp = name.split(".");
                    var extention = temp[temp.length - 1];
                    temp.pop();
                    return temp.join(".") + suffix + "." + extention;
                }


                //MODULE STARTS: Table view infinite loading
                ! function() {
                    $.fn.tableView = function(options) {
                        var that = "#" + $(this).attr("id");
                        var tab = $(this).attr("href");
                        $(document).one('shown.bs.tab', that, function() {
                            $.ajax({
                                url: options.url,
                                type: "GET",
                                contentType: "application/json",
                                dataType: "json",
                                success: function(data) {

                                    //object is made so as to pass by reference in function calls
                                    var image = {
                                        shown: 0 //current amount of images added to the dom
                                    }
                                    var isJsonSame = false; // checks if all arrays of json data has same length
                                    var firstPropertyLength = false; // The first random propery's length of json data
                                    var image_name, image_description, aspect_ratio, image_alt; // image characterstics taken from json data
                                    var template; //template to hold image and its html
                                    var lazyGif; //These will hold base64 gif images    
                                    var image_link = "" // link to be added in image_description.
                                    var default_images = (data.image_name.length > 50) ? 50 : data.image_name.length;
                                    // number of images to be shown before scroll event infinite loadings 

                                    var lightbox_R1, lightbox_R2; //lightbox sources to hold different loacations if H or V.
                                    var download_heights = []; // height of random image to be shown in download option

                                    var suffix1, suffix2; // dynamic suffixes to be added to image name as per V or H type


                                    function template() {
                                        var template = '<figure class="image-wrapper">' + '\n' +
                                            '<img class="b-lazy" data-src="' + options.rimg_W_0320 + nameFixer(image_name, "_0320x0240") + '|' + options.rimg_W_0640 + nameFixer(image_name, "_0640x0480") + '" data-src-small="' + options.rimg_W_0442 + nameFixer(image_name, "_0442x0332") + '|' + options.rimg_W_0884 + nameFixer(image_name, "_0884x0663") + '" src=' + lazyGif + ' alt="' + image_alt + '">' + '\n' +
                                            '<figcaption>' + '\n' +
                                            image_description + image_link + '\n' +
                                            '</figcaption>' + '\n' +
                                            '<div class="info">' + '\n' +
                                            '<div class="info-icon image-wrapper">' + '\n' +
                                            '<img class="b-lazy img-responsive" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="http://cica.dbrqx.com/rimg/cica/images/info_white_icon.png" alt="cica white info icon for table view">' + '\n' +
                                            '</div>' + '\n' +
                                            '<div class="zoom-icon image-wrapper">' + '\n' +
                                            '<a data-src="' + lightbox_R1 + nameFixer(image_name, suffix1) + '|' + lightbox_R2 + nameFixer(image_name, suffix2) + '" data-src-small="' + options.rimg_W_0442 + nameFixer(image_name, "_0442x0332") + '|' + options.rimg_W_0884 + nameFixer(image_name, "_0884x0663") + '" data-lightbox="table-view" data-title="' + image_description.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\//g, "&#x2F;").replace(/`/g, "&#x60;").replace(/=/g, "&#x3D;") + '">' + '\n' +
                                            '<img class="b-lazy img-responsive" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="http://cica.dbrqx.com/rimg/cica/images/zoom_white.png" alt="cica table view zoom icon lightbox">' + '\n' +
                                            '</a>' + '\n' +
                                            '</div>' + '\n' +
                                            '<div class="download-icon image-wrapper">' + '\n' +
                                            '<img class="b-lazy img-responsive" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="  data-src="http://cica.dbrqx.com/rimg/cica/images/download2-256.png" alt="cica table view download icon">' + '\n' +
                                            '</div>' + '\n' +
                                            '</div>' + '\n' +
                                            '<div class="download-wrapper">' + '\n' +
                                            '<div class="quality">' + '\n' +
                                            '<a href="download.php?image_path=' + options.rimg_W_1280 + nameFixer(image_name, "_1280x0960") + '" > <span class="size">1280px &times;' + download_heights[0] + '</span></a><br/>' + '\n' +
                                            '<a href="download.php?image_path=' + options.rimg_W_2560 + nameFixer(image_name, "_2560x1920") + '" > <span class="size">2560px &times;' + download_heights[1] + '</span></a><br/>' + '\n' +
                                            '<a href="download.php?image_path=' + options.rimg_W_6100 + nameFixer(image_name, "_6100x4575") + '" > <span class="size">6100px &times;' + download_heights[2] + '</span></a><br/>' + '\n' +
                                            '</div>' + '\n' +
                                            '</div>' + '\n' +
                                            '</figure>';
                                        return template;
                                    }

                                    function smallestTable(element) {
                                        var min = $(element).eq(0).height();
                                        var smallestChild = $(element).eq(0);
                                        $(element).each(function(index, value) {
                                            if (min > $(this).height()) {
                                                min = $(this).height();
                                                smallestChild = $(this);
                                            }
                                        });
                                        return smallestChild;
                                    }

                                    function Appender(image, max, data, ele) {
                                        for (; image.shown < max; ++image.shown) {
                                            image_name = data.image_name[image.shown];
                                            if ($.isArray(data.image_description[image.shown])) {
                                                image_description = data.image_description[image.shown][0];
                                                image_link = ' <a href="' + data.image_description[image.shown][1] + '"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span><span class="sr-only">external link</span></a>';
                                            } else {
                                                image_description = data.image_description[image.shown];
                                                image_link = "";
                                            }

                                            image_alt = data.image_alt[image.shown];
                                            if (data.aspect_ratio[image.shown] > 1) {
                                                lazyGif = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=';
                                                lightbox_R1 = options.rimg_W_1280;
                                                suffix1 = "_1280x0960";
                                                lightbox_R2 = options.rimg_W_2560;
                                                suffix2 = "_2560x1920";
                                                download_heights = [960, 1920, 4575];
                                            } else if (data.aspect_ratio[image.shown] < 1) {
                                                lazyGif = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAQAAADhJE2MAAAADklEQVR42mNkAANGbBQAAGIABUN3+8IAAAAASUVORK5CYII=';
                                                lightbox_R1 = options.rimg_W_0640;
                                                suffix1 = "_0640x0480";
                                                lightbox_R2 = options.rimg_W_1280;
                                                suffix2 = "_1280x0960";
                                                download_heights = [1707, 3414, 8134];
                                            }
                                            smallestTable(ele).append(template());
                                        }
                                        global.userAgent.lightboxRatina(); //configure ratina images lightbox on each ajaxy image set
                                    }

                                    function scrollLoad() {
                                        $(window).off("scroll.table", scrollLoad);
                                        var throttle = setTimeout(function() {
                                            $(window).on('scroll.table', scrollLoad);
                                            if ($(window).scrollTop() > ($(".countries-container").offset().top - $(window).height())) {
                                                if (image.shown < data.image_name.length) {
                                                    if (image.shown < (data.image_name.length - 50)) {
                                                        var max = image.shown + 30;
                                                    } else {
                                                        max = data.image_name.length;
                                                    }
                                                    if (global.userAgent.width() > 1199) {
                                                        Appender(image, max, data, tab + " .mosaic-table .td");
                                                    } else if ((global.userAgent.width() < 1200) && (global.userAgent.width() > 767)) {
                                                        Appender(image, max, data, tab + " .mosaic-table-small .td");
                                                    } else if ((global.userAgent.width() < 768)) {
                                                        Appender(image, max, data, tab + " .mosaic-table-xs .td");
                                                    }

                                                } else {
                                                    $(window).off('scroll.table', scrollLoad);
                                                }
                                                global.bLazy.revalidate();
                                            }
                                        }, 50);
                                    }

                                    function appendOnResize() {
                                        $(window).off("resize.table", appendOnResize);
                                        var throttle = setTimeout(function() {
                                            $(window).on("resize.table", appendOnResize);
                                            if (global.userAgent.width() > 1199) {

                                                var temp = {
                                                    shown: $(tab + " .mosaic-table figure").length
                                                }
                                                if (temp.shown < (image.shown)) {
                                                    Appender(temp, image.shown, data, tab + " .mosaic-table .td");
                                                }
                                            } else if ((global.userAgent.width() < 1200) && (global.userAgent.width() > 767)) {
                                                var temp2 = {
                                                    shown: $(tab + " .mosaic-table-small figure").length
                                                }
                                                if (temp2.shown < (image.shown)) {
                                                    Appender(temp2, image.shown, data, tab + " .mosaic-table-small .td");
                                                }
                                            } else if ((global.userAgent.width() < 768)) {

                                                var temp3 = {
                                                    shown: $(tab + " .mosaic-table-xs figure").length
                                                }
                                                if (temp3.shown < (image.shown)) {
                                                    Appender(temp3, image.shown, data, tab + " .mosaic-table-xs .td");
                                                }
                                            }
                                            global.bLazy.revalidate();
                                        }, 50);
                                    }
                                    //this each will check if json data received is ok
                                    $.each(data, function(index, value) {

                                        if (firstPropertyLength == false) {
                                            firstPropertyLength = value.length;
                                            isJsonSame = true;
                                        } else if (value.length != firstPropertyLength) {
                                            isJsonSame = false;
                                            return false;
                                        }
                                    });

                                    if (isJsonSame) {
                                        $(tab + " .ajax-loading").hide();
                                        if (global.userAgent.width() > 1199) {
                                            Appender(image, default_images, data, tab + " .mosaic-table .td");
                                        } else if ((global.userAgent.width() < 1200) && (global.userAgent.width() > 767)) {
                                            Appender(image, default_images, data, tab + " .mosaic-table-small .td");
                                        } else if ((global.userAgent.width() < 768)) {
                                            Appender(image, default_images, data, tab + " .mosaic-table-xs .td");
                                        }
                                        global.bLazy.revalidate(); //revalidate 50 ajaxy images

                                        $(window).on("resize.table", appendOnResize);
                                        $(window).on("scroll.table", scrollLoad);
                                        $(document).on("hide.bs.tab", that, function() {
                                            $(window).off("scroll.table", scrollLoad);
                                            $(window).off("resize.table", appendOnResize);
                                            $('#myCarousel').off('slid.bs.carousel.fixTableScrollBug');
                                        });


                                        // if carousel move keeping table view open then
                                        // on scrolling down new ajaxy images are loaded in correctly
                                        // following code fixes this situation
                                        function fixTableScrollBug(e) {
                                            if ($(e.relatedTarget).find(".nav-tabs").hasClass("nav-tabs-responsive2")) {
                                                if ($(that).parent("li").hasClass("active")) {
                                                    //console.log("add events now");
                                                    $(window).on("scroll.table", scrollLoad);
                                                    appendOnResize();
                                                }
                                            } else {
                                                //console.log("remove events now");
                                                $(window).off("scroll.table", scrollLoad);
                                                $(window).off("resize.table", appendOnResize);
                                            }
                                        }

                                        $('#myCarousel').on('slid.bs.carousel.fixTablescrollBug', fixTableScrollBug);

                                        $(document).on("shown.bs.tab", that, function() {
                                            appendOnResize(); // triigerring reisze callback so that if table tab was hidden
                                            // then when shown it refill properly
                                            // appendonresize will automatically reassign windw.resize
                                            $(window).on("scroll.table", scrollLoad);
                                            $('#myCarousel').on('slid.bs.carousel.fixTablescrollBug', fixTableScrollBug);
                                        });



                                    } else {
                                        $(tab).prepend("SOME ERROR OCCURED!!! <br/> See the console");
                                        console.error("CUSTOM ERROR: The table view json data doesn't have same array lengths. Plz correct this from server side");
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.error(options.url, textStatus, errorThrown);
                                    $(tab).prepend("SOME ERROR OCCURED!!! <br/> See the console");
                                }
                            });
                        });

                    }
                }();
                //MODULE FINISHES: Table view infinite loading  



                //MODULE STARTS: List view infinite loading
                ! function() {
                    $.fn.listView = function(options) {
                        var that = "#" + $(this).attr("id");
                        var tab = $(this).attr("href");
                        $(document).one('shown.bs.tab', that, function() {
                            $.ajax({
                                url: options.url,
                                type: "GET",
                                contentType: "application/json",
                                dataType: "json",
                                success: function(data) {
                                    var isJsonSame = (data.Titulo.length == data.Fecha.length) &&
                                        (data.Fecha.length == data.Recuerdo.length) &&
                                        (data.Recuerdo.length == data["Recuerdo-alts"].length) &&
                                        (data["Recuerdo-alts"].length == data.aspect_ratios.length) &&
                                        (data.aspect_ratios.length == data.Acceso["Ir al Recuerdo"].length);
                                    // Manually checked if values have same length.                           

                                    if (isJsonSame) {
                                        //json data has all arrays of same length
                                        $(tab + " .ajax-loading").hide();
                                        $(tab).css("background-color", "transparent");

                                        var shown = 0;
                                        var default_nodes = (data.Recuerdo.length > 20) ? 20 : data.Recuerdo.length;
                                        //number of nodes to be shown beofore scroll event infinite loading 

                                        var lightbox_R1, lightbox_R2; // choose diff folder depending upon V or H type
                                        var small_R1, small_R2; // chhose diff folders for V or H, for small images
                                        var lazy_gif; // To hold V or H type transparent gif

                                        function appender(start, max) {
                                            for (var i = start; i < max; i++) {
                                                var images = "";
                                                if ($.isArray(data.Recuerdo[i])) {
                                                    $.each(data.Recuerdo[i], function(index, value) {

                                                        if (data.aspect_ratios[i][index] > 1) {
                                                            small_R1 = options.rimg_W_0082;
                                                            var suffix_S1 = "_0082x0062";
                                                            small_R2 = options.rimg_W_0145;
                                                            var suffix_S2 = "_0145x0109";
                                                            lightbox_R1 = options.rimg_W_1280;
                                                            var suffix_L1 = "_1280x0960";
                                                            lightbox_R2 = options.rimg_W_2560;
                                                            var suffix_L2 = "_2560x1920";
                                                            lazy_gif = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                                                        } else {
                                                            small_R1 = options.rimg_W_0041;
                                                            var suffix_S1 = "_0041x0031";
                                                            small_R2 = options.rimg_W_0082;
                                                            var suffix_S2 = "_0082x0062";
                                                            lightbox_R1 = options.rimg_W_0640;
                                                            var suffix_L1 = "_0640x0480";
                                                            lightbox_R2 = options.rimg_W_1280;
                                                            var suffix_L2 = "_1280x0960";
                                                            lazy_gif = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAQAAADhJE2MAAAADklEQVR42mNkAANGbBQAAGIABUN3+8IAAAAASUVORK5CYII=";
                                                        }


                                                        var image =
                                                            "<a class=\"image-wrapper\" data-src=\"" + lightbox_R1 + nameFixer(value, suffix_L1) + "|" + lightbox_R2 + nameFixer(value, suffix_L2) + "\" data-src-small=\"" + options.rimg_W_0442 + nameFixer(value, "_0442x0332") + "|" + options.rimg_W_0884 + nameFixer(value, "_0884x0663") + "\" data-lightbox=\"list" + i + "\">" + "\n" +
                                                            "<img class=\"shadow2 b-lazy img-responsive\" src=\"" + lazy_gif + " \" data-src=\"" + small_R1 + nameFixer(value, suffix_S1) + "|" + small_R2 + nameFixer(value, suffix_S2) + "\"" + " data-src-small=\"" + small_R1 + nameFixer(value, suffix_S1) + "|" + small_R2 + nameFixer(value, suffix_S2) + "\"" + ' alt="' + data["Recuerdo-alts"][i][index] + '"' + ">" + "\n" +
                                                            "</a>" + "\n";
                                                        images = image + images;
                                                    });
                                                } else {
                                                    if (data.aspect_ratios[i] > 1) {
                                                        small_R1 = options.rimg_W_0082;
                                                        var suffix_S1 = "_0082x0062";
                                                        small_R2 = options.rimg_W_0145;
                                                        var suffix_S2 = "_0145x0109";
                                                        lightbox_R1 = options.rimg_W_1280;
                                                        var suffix_L1 = "_1280x0960";
                                                        lightbox_R2 = options.rimg_W_2560;
                                                        var suffix_L2 = "_2560x1920";
                                                        lazy_gif = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                                                    } else {
                                                        small_R1 = options.rimg_W_0041;
                                                        var suffix_S1 = "_0041x0031";
                                                        small_R2 = options.rimg_W_0082;
                                                        var suffix_S2 = "_0082x0062";
                                                        lightbox_R1 = options.rimg_W_0640;
                                                        var suffix_L1 = "_0640x0480";
                                                        lightbox_R2 = options.rimg_W_1280;
                                                        var suffix_L2 = "_1280x0960";
                                                        lazy_gif = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAQAAADhJE2MAAAADklEQVR42mNkAANGbBQAAGIABUN3+8IAAAAASUVORK5CYII=";
                                                    }

                                                    images =
                                                        "<a class=\"image-wrapper\" data-src=\"" + lightbox_R1 + nameFixer(data.Recuerdo[i], suffix_L1) + "|" + lightbox_R2 + nameFixer(data.Recuerdo[i], suffix_L2) + "\" data-src-small=\"" + options.rimg_W_0442 + nameFixer(data.Recuerdo[i], "_0442x0332") + "|" + options.rimg_W_0884 + nameFixer(data.Recuerdo[i], "_0884x0663") + "\" data-lightbox=\"list" + i + "\">" + "\n" +
                                                        "<img class=\"shadow2 b-lazy img-responsive\" src=\"" + lazy_gif + "\" data-src=\"" + small_R1 + nameFixer(data.Recuerdo[i], suffix_S1) + "|" + small_R2 + nameFixer(data.Recuerdo[i], suffix_S2) + "\"" + " data-src-small=\"" + small_R1 + nameFixer(data.Recuerdo[i], suffix_S1) + "|" + small_R2 + nameFixer(data.Recuerdo[i], suffix_S2) + "\"" + ' alt="' + data["Recuerdo-alts"][i] + '"' + ">" + "\n" +
                                                        "</a>" + "\n";
                                                }

                                                $(tab).append(
                                                    "<div class=\"list-row clearfix\">" + "\n" +
                                                    "<div class=\"titulo-col\">" + data.Titulo[i] + "</div>" + "\n" +
                                                    "<div class=\"fecha-col\">" + data.Fecha[i] + "</div>" + "\n" +
                                                    "<div class=\"recuerdo-col\">" +
                                                    images +
                                                    "</div>" + "\n" +
                                                    "<div class=\"acceso-col\">" + "\n" +
                                                    '<a href="' + data.Acceso["Ir al Recuerdo"][i] + '">' + 'Ir al Recuerdo' + '</a>' + '\n' +
                                                    "</div>" + "\n" +
                                                    "</div>" + "\n"
                                                );

                                            }

                                            global.bLazy.revalidate();
                                            global.userAgent.lightboxRatina();
                                            $(tab + " .list-view .hot-zone").height($(tab + " .list-view").height());

                                        }


                                        function scrollLoad() {
                                            $(window).off("scroll.list", scrollLoad);
                                            var throttle = setTimeout(function() {
                                                $(window).on('scroll.list', scrollLoad);
                                                if ($(window).scrollTop() > ($(".countries-container").offset().top - $(window).height())) {
                                                    if (shown <= data.Recuerdo.length) {
                                                        if (shown < (data.Recuerdo.length - 20)) {
                                                            appender(shown, shown + 20);
                                                            shown = shown + 20;
                                                        } else {
                                                            appender(shown, data.Recuerdo.length);
                                                            shown = data.Recuerdo.length;
                                                        }

                                                    } else {
                                                        $(window).off('scroll.list', scrollLoad);
                                                    }
                                                }
                                            }, 50);
                                        }

                                        if (!global.userAgent.isTouchDevice()) {

                                            var inLeft = false,
                                                inRight = false;
                                            var $view = $(tab);

                                            //auto scroll functionality 
                                            var now_scrollable;
                                            var max_scrollable = $(tab).prop("scrollWidth") - $(tab).outerWidth();
                                            var one_scroll = 2.5;

                                            function resetautoscroll() {
                                                inLeft = false,
                                                    inRight = false;
                                                max_scrollable = $(tab).prop("scrollWidth") - $(tab).outerWidth();
                                            }

                                            function autoscroll(e) {

                                                var x = e.pageX - $view.offset().left;
                                                var y = e.pageY - $view.offset().top - 30;
                                                var outside = (((x > 65) && (x < ($view.width() - 65))) || (x < 0) || (x > $view.width())) || (y < 0) || (y > $view.height());
                                                if (outside) {
                                                    inLeft = false;
                                                    inRight = false;
                                                    $(tab).stop();
                                                } else if ((x > 0) && (x < 65) && (y > 0) && (y < $view.height())) {
                                                    if (!inLeft) {
                                                        inLeft = true;
                                                        $(tab).stop().animate({
                                                            scrollLeft: 0
                                                        }, one_scroll * $(tab).scrollLeft());
                                                    }
                                                } else if ((x > ($view.width() - 65) && (x < $view.width())) && (y > 0) && (y < $view.height())) {
                                                    if (!inRight) {
                                                        inRight = true;
                                                        now_scrollable = max_scrollable - $(tab).scrollLeft();
                                                        $(tab).stop().animate({
                                                            scrollLeft: max_scrollable
                                                        }, one_scroll * now_scrollable);
                                                    }
                                                }
                                            }

                                            $("body").on("mousemove.list", autoscroll);
                                            $(document).on("hide.bs.tab", that, function() {
                                                $("body").off("mousemove.list", autoscroll);
                                            });
                                            $(document).on("shown.bs.tab", that, function() {
                                                $("body").on("mousemove.list", autoscroll);
                                            });

                                        }



                                        function appendOnResize() {
                                            $(window).off("resize.list", appendOnResize);
                                            var throttle = setTimeout(function() {
                                                $(window).on("resize.list", appendOnResize);
                                                if (!global.userAgent.isTouchDevice()) {
                                                    resetautoscroll();
                                                }
                                            }, 50);
                                        }

                                        appender(shown, shown + default_nodes);
                                        shown = shown + 20;

                                        $(window).on("scroll.list", scrollLoad);
                                        $(window).on("resize.list", appendOnResize);

                                        function fixListScrollBug(e) {
                                            if ($(e.relatedTarget).find(".nav-tabs").hasClass("nav-tabs-responsive2")) {
                                                //console.log("add events now");
                                                $(window).on("scroll.list", scrollLoad);
                                                $(window).on("resize.list", appendOnResize);
                                                if (!global.userAgent.isTouchDevice()) {
                                                    $("body").on("mousemove.list", autoscroll);
                                                }
                                            } else {
                                                //console.log("remove events now");
                                                $(window).off("scroll.list", scrollLoad);
                                                $(window).off("resize.list", appendOnResize);
                                                if (!global.userAgent.isTouchDevice()) {
                                                    $("body").off("mousemove.list", autoscroll);
                                                }
                                            }
                                        }

                                        $('#myCarousel').on('slid.bs.carousel.fixListScrollBug', fixListScrollBug);

                                        $(document).on("hide.bs.tab", that, function() {
                                            $(window).off("scroll.list", scrollLoad);
                                            $(window).off("resize.list", appendOnResize);
                                            $('#myCarousel').off('slid.bs.carousel.fixListScrollBug');
                                        });
                                        $(document).on("shown.bs.tab", that, function() {
                                            $(window).on("scroll.list", scrollLoad);
                                            $(window).on("resize.list", appendOnResize);
                                            $('#myCarousel').on('slid.bs.carousel.fixListScrollBug');
                                        });


                                    } else {
                                        $(tab).prepend("SOME ERROR OCCURED!!! <br/> See the console");
                                        console.error("CUSTOM ERROR: The list view json data doesn't have same array lengths. Plz correct this from server side");
                                    }
                                },

                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.error("list_view.json", textStatus, errorThrown);
                                    $(tab).prepend("SOME ERROR OCCURED!!! <br/> See the console");
                                }

                            });

                        });

                    }
                }();

            }();
            //ajaxy stuff finishes


        });
    })(jQuery);









    // Facebook root sdk starts. This is completely independent of other plugins(even jquery)
    // Because it is heavy(around 250kB) it is at last of everthing.
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // facebook root sdk finishes here
