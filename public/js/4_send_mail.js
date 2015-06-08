(function () {
    var send_mail = function () {
        var _that = this;
        this.settings = {
            degug: true,
            selectors: {
                form: '.some_form_haha',
                error_id: '#error_disp',
                for_bots: '#for_bots',
                success: '.success_message'
            },
            classes: {}
        };

        this.init = function (settings) {
            var _selectors = _that.settings.selectors;
            this.main.send_mail_sendForm();
            this.main.hidden_input();
        };

        this.main = {
            send_mail_sendForm: function (form_name, post, href) {
                $(document.forms[form_name]).on('submit', function () {
                    var input_check = _that.main.hidden_input();
                    if(input_check == false){
                        window.location.href = '/';
                    }
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
                                _that.main.success();
                            },
                            403: function (jqXHR) {}
                        }
                    });
                    return false;
                });
            },
            error_disp: function (error_message) {
                $(_that.settings.selectors.error_id).show();
                $(_that.settings.selectors.error_id + ' p').text(error_message);
            },
            hidden_input: function(){
                var _for_bots = $(_that.settings.selectors.for_bots),
                    _button = $(_that.settings.selectors.regi_button);
                if(_for_bots.length < 1){
                    return;
                }
                if(_for_bots.val() != ''){
                    return false;
                }
            },
            success: function(){
                var _selectors = _that.settings.selectors;
                $(_selectors.form).hide();
                $(_selectors.success).show();
            }
        }
    };
    window.send_mail = new send_mail();
}());


$(document).ready(function () {
    send_mail.init({debug: true});
    if ($('#about').length > 0) {
        send_mail.main.send_mail_sendForm('form_send_ek', '/send_me_mail', '/about');
    }
});