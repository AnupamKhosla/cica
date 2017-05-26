
            //MODULE STARTS: List view infinite loading
            ! function() {
                $(document).one('shown.bs.tab', '#Tabulados-pill-middle-tab2', function() {
                    $.ajax({
                        url: "list_view_old.json",
                        type: "GET",
                        contentType: "application/json",
                        dataType: "json",
                        success: function(data) {
                            var isJsonSame = (data.Código.length == data.Titulo.length) &&
                                (data.Titulo.length == data.pais.Iceland_Islandia.length) &&
                                (data.pais.Iceland_Islandia.length == data.Ciudad.Reykjavik.length) &&
                                (data.Ciudad.Reykjavik.length == data.Ciudad["Reykjavik-city"].length) &&
                                (data.Ciudad["Reykjavik-city"].length == data.images.length) &&
                                (data.images.length == data["image-alts"].length) &&
                                (data["image-alts"].length == data.Ver.length);
                            // Manually checked if values have same length.                           

                            if (isJsonSame) {
                                //json data has all arrays of same length
                                $("#Tabulados-pill-middle .ajax-loading").hide();
                                var global_template = $("#list-template").clone();
                                global_template.removeAttr("style");
                                var local_template, local_anchor;
                                var shown = 0;
                                var single_image_height = 200;
                                var multi_image_height = 72;
                                var two_image_height = 110;

                                function ImageHeight() {
                                    if (global.userAgent.width() < 480) {
                                        single_image_height = 160;
                                        multi_image_height = 60;
                                        two_image_height = 90;
                                    } else if(global.userAgent.width() < 992) {
                                        single_image_height = 200;
                                        multi_image_height = 100;
                                        two_image_height = 100;
                                    } else if(global.userAgent.width() < 1200) {
                                        single_image_height = 150;
                                        multi_image_height = 70;
                                        two_image_height = 70;
                                    } else {
                                        single_image_height = 200;
                                        multi_image_height = 72;
                                        two_image_height = 110;
                                    }
                                }
                                ImageHeight();

                                function appender(start, max) {
                                    for (var i = start; i < max; i++) {

                                        local_template = global_template.clone();

                                        if ($.isArray(data.images[i]) && (data.images[i].length > 2)) {

                                            local_template.addClass("multi-images");

                                            for (var j = data.images[i].length - 1; j >= 0; j--) {
                                                local_template.children(".images").append(
                                                    "<a class=\"image-wrapper\" data-src=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/lightbox/" + data.images[i][j] +  "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/lightbox/" + data.images[i][j] + "\" data-src-small=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/lightbox/" + data.images[i][j] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/lightbox/" + data.images[i][j] + "\" data-lightbox=\"list" + i + "\">" + "\n" +
                                                    "<img class=\"shadow2 b-lazy img-responsive\" src=\"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=\" data-src=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/" +
                                                    data.images[i][j] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/" +
                                                    data.images[i][j] + "\" data-src-small=\"http://cica.dbrqx.com/rimg/cica/ratina1/Mobile/" +
                                                    data.images[i][j] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Mobile/" +
                                                    data.images[i][j] + "\" alt=\"" + data["image-alts"][i][j] + "\"\n" +
                                                    "style = \"width:" + multi_image_height * data["image-aspectRatios"][i][j] + "px\" " + "data-asp=\"" + data["image-aspectRatios"][i][j] + "\"" + ">" +
                                                    "</a>"
                                                );
                                            }
                                        } else if ($.isArray(data.images[i]) && (data.images[i].length == 2)) {
                                            local_template.addClass("two-images");

                                            for (var j = data.images[i].length - 1; j >= 0; j--) {
                                                local_template.children(".images").append(
                                                    "<a class=\"image-wrapper\" data-src=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/lightbox/" + data.images[i][j] +  "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/lightbox/" + data.images[i][j] + "\" data-src-small=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/lightbox/" + data.images[i][j] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/lightbox/" + data.images[i][j] + "\" data-lightbox=\"list" + i + "\">" + "\n" +
                                                    "<img class=\"shadow2 b-lazy img-responsive\" src=\"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=\" data-src=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/" +
                                                    data.images[i][j] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/" +
                                                    data.images[i][j] + "\" data-src-small=\"http://cica.dbrqx.com/rimg/cica/ratina1/Mobile/" +
                                                    data.images[i][j] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Mobile/" +
                                                    data.images[i][j] + "\" alt=\"" + data["image-alts"][i][j] + "\"\n" +
                                                    "style = \"width:" + two_image_height * data["image-aspectRatios"][i][j] + "px\" " + "data-asp=\"" + data["image-aspectRatios"][i][j] + "\"" + ">" +
                                                    "</a>"
                                                );
                                            }
                                        } else {
                                            local_template.addClass("single-image");
                                            local_template.children(".images").append(
                                                "<a class=\"image-wrapper\" data-src=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/lightbox/" + data.images[i] +  "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/lightbox/" + data.images[i] + "\" data-src-small=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/lightbox/" + data.images[i] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/lightbox/" + data.images[i] + "\" data-lightbox=\"list" + i + "\">" + "\n" +
                                                "<img class=\"shadow2 b-lazy img-responsive\" src=\"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=\" data-src=\"http://cica.dbrqx.com/rimg/cica/ratina1/Desktop/" +
                                                data.images[i] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Desktop/" +
                                                data.images[i] + "\" data-src-small=\"http://cica.dbrqx.com/rimg/cica/ratina1/Mobile/" +
                                                data.images[i] + "|http://cica.dbrqx.com/rimg/cica/ratina2/Mobile/" +
                                                data.images[i] + "\" alt=\"" + data["image-alts"][i] + "\"\n" +
                                                "style = \"width:" + single_image_height * data["image-aspectRatios"][i] + "px\" " + "data-asp=\"" + data["image-aspectRatios"][i] + "\"" + ">" +
                                                "</a>"
                                            );
                                            local_template.children(".images").html(local_anchor);
                                        }

                                        local_template.children(".desc").html(
                                            "<dl>" + "\n" +
                                            "<dt>" + "Código:" + "</dt>" + "\n" +
                                            "<dd>" + data.Código[i] + "</dd>" + "\n" +

                                            "<dt>" + "Titulo:" + "</dt>" + "\n" +
                                            "<dd>" + data.Titulo[i] + "</dd>" + "\n" +

                                            "<dt>" + "pais:" + "</dt>" + "\n" +
                                            "<dd> <a href=\"" + data.pais.Iceland_Islandia[i] + "\">Iceland_Islandia</a> </dd>" + "\n" +

                                            "<dt>" + "Ciudad:" + "</dt>" + "\n" +
                                            "<dd class=\"two-links\"><a href=\"" + data.Ciudad.Reykjavik[i] + "\">Reykjavik</a><a href=\"" + data.Ciudad["Reykjavik-city"][i] + "\">Reykjavik-city</a></dd>" + "\n" +

                                            "<div class=\"ver\">" + "\n" +
                                            "<a href=\"" + data.Ver[i] + "\">Ver</a>" + "\n" +
                                            "</div>" + "\n"
                                        );

                                        $("#Tabulados-pill-middle").append(local_template);
                                    }
                                    global.bLazy.revalidate();
                                    global.userAgent.lightboxRatina();
                                }

                                function scrollLoad() {
                                    $(window).off("scroll", scrollLoad);
                                    var throttle = setTimeout(function() {
                                        $(window).on('scroll', scrollLoad);
                                        if ($(window).scrollTop() > ($(".countries-container").offset().top - $(window).height())) {
                                            if (shown < data.Ver.length) {
                                                if (shown < (data.Ver.length - 20)) {
                                                    appender(shown, shown + 20);
                                                    shown = shown + 20;
                                                } else {
                                                    appender(shown, data.Ver.length);
                                                    shown = data.Ver.length;
                                                }

                                            } else {
                                                $(window).off('scroll', scrollLoad);
                                            }
                                        }
                                    }, 50);
                                }

                                function appendOnResize() {
                                    $(window).off("resize", appendOnResize);
                                    var throttle = setTimeout(function() {
                                        $(window).on("resize", appendOnResize);
                                        ImageHeight();
                                        $(".list-template.single-image .images img").width(function(){return single_image_height * $(this).attr("data-asp")} );                                        
                                        $(".list-template.two-images .images img").width(function(){ return two_image_height * $(this).attr("data-asp")});
                                        $(".list-template.multi-images .images img").width(function(){return multi_image_height * $(this).attr("data-asp");} );

                                    }, 50);
                                }

                                appender(shown, shown + 20);
                                shown = shown + 20;

                                $(window).on("scroll", scrollLoad);
                                $(window).on("resize", appendOnResize);

                                $(document).on("hide.bs.tab", '#Tabulados-pill-middle-tab2', function() {
                                    $(window).off("scroll", scrollLoad);
                                    $(window).off("resize", appendOnResize);

                                });
                                $(document).on("show.bs.tab", '#Tabulados-pill-middle-tab2', function() {
                                    $(window).on("scroll", scrollLoad);
                                    $(window).on("resize", appendOnResize);
                                });

                            } else {
                                $("#Tabulados-pill-middle").prepend("SOME ERROR OCCURED!!! <br/> See the console");
                                console.error("CUSTOM ERROR: The list view json data doesn't have same array lengths. Plz correct this from server side");
                            }
                        },

                        error: function(jqXHR, textStatus, errorThrown) {
                            console.error("list_view.json", textStatus, errorThrown);
                            $("#Tabulados-pill-middle").prepend("SOME ERROR OCCURED!!! <br/> See the console");
                        }

                    });

                });
            }();