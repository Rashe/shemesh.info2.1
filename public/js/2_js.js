(function () {
    var shmsh = function () {
        var _that = this;
        this.settings = {

            degug: false,
            selectors: {
                placeholder: 'input[placeholder]',
                search_button: '.search_btn',
                message: '.message',
                eban: '#eban',
                search_form: '.search_form',
                fuck: '.fuck',
                here: '.here',
                nav_outside: '#outside',
                top_list: '.top_list',
                nav_text: '.nav_text',
                login: '#login',
                clopener: '.clopener',
                nav_inside: '#inside',
                aside_nav: '#aside_nav',
                services: '#services',
                turn_reg_but: '.turn_reg button',
                blogeg: '#blogeg',
                blogeg_article: '#blogeg_article',
                gen_rss: '.gen_rss',
                rss_callback: '.rss_callback'

            },
            classes: {
                nav_text_wide: 'nav_text_wide',
                hidden: 'hidden',
                clops: 'clopener_pos',
                clopener_ser: 'clopener_ser'
            }

        };

        this.init = function (settings) {
            this.main.clopener();
            this.main.submit_sendForm();
        };

        this.main = {
            placeholder: function (placeholder) {
                var $placeholder = $(placeholder);
                if ($placeholder.length > 0) {
                    var attrPh = $placeholder.attr('placeholder');
                    $placeholder.attr('value', attrPh)
                        .bind('focus', function () {
                            var $this = $(this);
                            if ($this.val() === attrPh)
                                $this.val('').css('color', '#fff');
                        }).bind('blur', function () {
                            var $this = $(this);
                            if ($this.val() === '')
                                $this.val(attrPh).css('color', '#fff');
                        });
                }
            },
            search_shit: function () {
                var _selectors = _that.settings.selectors,
                    search_btn = $(_selectors.search_button),
                    message = $(_selectors.message),
                    eban = $(_selectors.eban),
                    search_form = $(_selectors.search_form),
                    fuck = $(_selectors.fuck),
                    here = $(_selectors.here);

                search_btn.attr("disabled", true);
                message.show().delay(5000).fadeOut();

                eban.stop().animate({
                    top: 0
                }, 1500, 'easeOutBounce').delay(5000).animate({
                    top: -500
                }, 1500, 'easeOutBounce');

                search_form.stop().delay(6000).animate({
                    left: -9999
                }, 1500, 'easeOutBounce');
                setTimeout(function () {
                    fuck.fadeIn(500);
                }, 8000);
                setTimeout(function () {
                    here.fadeIn(500);
                }, 10000);

            },
            nav_hover: function () {
                var _selectors = _that.settings.selectors,
                    nav = $(_selectors.nav_outside),
                    top_list = $(_selectors.top_list),
                    nav_text = $(_selectors.nav_text),
                    nav_text_wide = _that.settings.classes.nav_text_wide;
                nav.hover(
                    function () {
                        top_list.slideDown('medium');
                        nav_text.addClass(nav_text_wide);
                        var _width = nav.width();
                        $('.nav_image img').width(_width);
                    },
                    function () {
                        top_list.stop();
                        top_list.slideUp('medium');
                        nav_text.removeClass(nav_text_wide);
                    }
                );
            },
            clopener: function () {
                var _selectors = _that.settings.selectors,
                    _classes = _that.settings.classes,
                    nav = $(_selectors.aside_nav),
                    clopener = $(_selectors.clopener),
                    hidden = _classes.hidden,
                    clops = _classes.clops,
                    services = $(_selectors.services),
                    clopener_ser = _classes.clopener_ser,
                    blogeg = $(_selectors.blogeg),
                    blogeg_article = $(_selectors.blogeg_article);
                clopener.on("click", function () {
                    if (nav.hasClass(hidden)) {
                        nav.removeClass(hidden);
                        clopener.removeClass(clops);
                        services.removeClass(clopener_ser);
                        blogeg.removeClass(clopener_ser);
                        blogeg_article.removeClass(clopener_ser);
                    }
                    else {
                        nav.addClass(hidden);
                        clopener.addClass(clops);
                        services.addClass(clopener_ser);
                        blogeg.addClass(clopener_ser);
                        blogeg_article.addClass(clopener_ser);
                    }
                });
            },
            send_ajax: function (ajax_data, where) {
                $.ajax({
                    url: where,
                    method: "POST",
                    data: ajax_data,
                    complete: function () {
                    }
                });
                return false;
            },
            send_rss_generator: function (ajax_data, where) {
                $(_that.settings.selectors.gen_rss).addClass('disabled waiting').prop("disabled", true);
                $.ajax({
                    url: where,
                    method: "POST",
                    data: ajax_data,
                    complete: function () {
                        },
                        statusCode: {
                            200: function () {
                                _that.main.rss_callback_notify(1, 'RSS generated');
                                $(_that.settings.selectors.gen_rss).removeClass('disabled waiting').prop("disabled", false);
                            },
                            403: function () {
                                _that.main.rss_callback_notify(0, 'RSS file generation error');
                                $(_that.settings.selectors.gen_rss).removeClass('disabled waiting').prop("disabled", false);
                            }
                        }
                });
                return false;
            },
            rss_callback_notify: function (type, text){
                if(type){
                     $(_that.settings.selectors.rss_callback).append(text).addClass('green');
                }else{
                     $(_that.settings.selectors.rss_callback).append(text).addClass('red');
                }
            },
            turn_reg_text: function () {
                var _selectors = _that.settings.selectors,
                    _turn_reg_but = $(_selectors.turn_reg_but),
                    s_text = 'Turn off registration',
                    s_text2 = 'Turn on registration',
                    cur_text = _turn_reg_but.text();
                if (cur_text == s_text) {
                    cur_text = s_text2;
                }
                else {
                    cur_text = s_text;
                }
                _turn_reg_but.text(cur_text);
            },
            submit_sendForm: function (form_name, post, href) {
                $(document.forms[form_name]).on('submit', function () {
                    var form = $(this);
                    $('.error', form).html('');
                    $.ajax({
                        url: post,
                        method: "POST",
                        data: form.serialize(),
                        complete: function () {
                        },
                        statusCode: {
                            200: function () {
                                window.location.href = href;
                            },
                            403: function (jqXHR) {
                                //var error = JSON.parse(jqXHR.responseText);
                                var error = jqXHR.responseText;
                                _that.main.error_disp(error);
                                //$('.error', form).html(error.message);
                            }
                        }
                    });
                    return false;
                });
            },
            error_disp: function (error_message) {
                $(_that.settings.selectors.error_id).show();
                $(_that.settings.selectors.error_id + ' p').text(error_message);
            }
        }
    };
    window.shmsh = new shmsh();
}());


$(document).ready(function () {
    shmsh.init({debug: false});

    $('.search_btn').on('click', function () {
        shmsh.main.search_shit()
    });
    $('.close').on('click', function () {
        $(this).parent().hide();
    });
    $(shmsh.settings.selectors.turn_reg_but).on('click', function () {
        shmsh.main.send_ajax({huj: "givi"}, '/reg_onOff');
        shmsh.main.turn_reg_text();
    });
    $(shmsh.settings.selectors.gen_rss).on('click', function () {
        shmsh.main.send_rss_generator({rss: "gen"}, '/create_rss');
    });
    if ($('#make_post_id').length > 0) {
        shmsh.main.submit_sendForm('make_post', '/blog_make', '/blog_admin');
    }
    if ($('#edit_post_id').length > 0) {
        shmsh.main.submit_sendForm('edit_post', '/post_edit', '/blog_admin');
    }
    if ($('#edit_user_info').length > 0) {
        shmsh.main.submit_sendForm('edit_user_info', '/user_info', '/user_info');
    }
});
