//AJAX для отправки данных с квиза
jQuery(document).ready(function($) {

    $(".ajax-contact-form").submit(function(e) {
        // e.preventDefault();
        const responses = quiz.responses;
        const inputs = $(this).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var $self = $(this);

        $.ajax({

            type: "POST",
            url: $(this).attr('action'),
            data: {
                data: responses.map((item, i) => `${i + 1}. ${item}`).join('<br/>'),
                ...inputs
            },

            success: function(msg) {
                // СОЗДАЛИ ПЕРЕМЕННУЮ, КОТОРАЯ ПО DOM ИЩЕТ БЛИЖАЙШЕГО РОДИТЕЛЯ, А ИМЕННО js-popup-block
                var $cond = $self.closest('.js-popup-block');

                // ОКНО ФОРМЫ ОБР.СВЯЗИ ЗАМЕНЯЕТСЯ НА "СПАСИБО"
                if ($cond.length > 0) {
                    $('.js-popup').fadeOut(function () {
                        $('.thanks__popup').clone(true)
                            .appendTo('.js-popup-block')
                            .fadeIn();
                    });
                }

                // ОТКРЫВАЕТСЯ ОКНО СПАСИБО В ПОПАПЕ, КОТОРЫЙ НАХОДИТСЯ В ЗАТЕМНЕННОМ БЛОКЕ. При нахождении формы на сайт, вне попапа.
                else {
                    $('.js-popup-block').fadeIn();
                    $('.thanks__popup').clone(true)
                        .appendTo('.js-popup-block')
                        .fadeIn();
                    $('.popup').fadeOut();

                }
            }
        });
        return false;
    });
});
