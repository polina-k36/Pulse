//$-библиотека джейквери
$(document).ready(function () {
    $('.carousel__slider').slick({
        speed: 1200,
        /* adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right_arrow.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(link) {
        $(link).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Модальные окна

    $('[data-btn=consultation-btn]').on('click', function () {
        $('#consultate, .overlay').fadeIn();

    });

    $('.modal__close').on('click', function () {
        $(' .overlay, #consultate, #order, #thanks').fadeOut();
    });

    $('.btn_buy').each(function (i) {
        $(this).on('click', function () {
            $('.modal__descr_order').text($('.catalog-item__subtitle').eq(i).text());
            $('#order, .overlay').fadeIn();

        });
    });

    function validationForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    validationForms('#consultation-form');
    validationForms('#consultate form');
    validationForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };

        $.ajax({
            type: "POST", //отдаем данные
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultate, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');

        });
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn('fast');
        }
        else {
            $('.pageup').fadeOut('fast');
        }
    });

    $("a[href^='#']").click(function () {
        var _href = $this.attr("href")
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    new WOW().init();

})