/*

Script  : Contact Form
Version : 1.0
Author  : Surjith S M
URI     : http://themeforest.net/user/surjithctly

Copyright © All rights Reserved
Surjith S M / @surjithctly

*/

$(function() {

    "use strict";


    /* ================================================
    jQuery Validate - Reset Defaults
    ================================================ */

    $.validator.setDefaults({
        ignore: [],
        highlight: function(element) {
            $(element).addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('has-error');
        },
        errorPlacement: function(error, element) {
            return false;
        }
    });

    /* 
    VALIDATE
    -------- */

    $("#contact_form").submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function(form) {

            $("#js-contact-btn").attr("disabled", true);

            /* 
            CHECK PAGE FOR REDIRECT (Thank you page)
            ---------------------------------------- */

            var redirect = $('#contact_form').data('redirect');
            var phpurl = $('#contact_form').attr('action');

            var noredirect = false;
            if (redirect == 'none' || redirect == "" || redirect == null) {
                noredirect = true;
            }

            $("#js-contact-btn").attr("disabled", true);
            $('#js-contact-result').fadeIn('slow').html('<div class="error-msg">Please wait</div>');

            /* 
            FETCH SUCCESS / ERROR MSG FROM HTML DATA-ATTR
            --------------------------------------------- */

            var success_msg = $('#js-contact-result').data('success-msg');
            var error_msg = $('#js-contact-result').data('error-msg');

            var dataString = $(form).serialize();

            /* 
             AJAX POST
             --------- */

            $.ajax({
                type: "POST",
                data: dataString,
                url: phpurl,
                cache: false,
                success: function(d) {
                    $(".form-group").removeClass("has-success");
                    if (d == 'success') {
                        if (noredirect) {
                            $('#js-contact-result').fadeIn('slow').html('<div class="alert alert-success error-msg">' + success_msg + '</div>').delay(3000).fadeOut('slow');
                            $('#contact_form')[0].reset();
                        } else {
                            window.location.href = redirect;
                        }
                    } else {
                        $('#js-contact-result').fadeIn('slow').html('<div class="alert alert-danger error-msg">' + error_msg + '</div>').delay(3000).fadeOut('slow');

                    }
                    setTimeout(function() {
                        $("#js-contact-btn").attr("disabled", false);
                    }, 1000);
                },
                error: function(d) {
                    $('#js-contact-result').fadeIn('slow').html('<div class="alert alert-danger error-msg"> Cannot access Server </div>').delay(3000).fadeOut('slow');
                    setTimeout(function() {
                        $("#js-contact-btn").attr("disabled", false);
                    }, 1000);

                }
            });
            return false;

        }
    });

})
