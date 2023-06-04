$(function () {
    /* Inits */
    initLazy();
    initProgramsTabs();
    initshowAll();
    initSelect();
    /* Lazy */
    function initLazy() {

        let
            lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
            active = false,
            threshold = 200
            ;

        const lazyLoad = function (e) {
            if (active === false) {
                active = true;

                setTimeout(function () {
                    lazyArr.forEach(function (lazyObj) {
                        if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

                            if (lazyObj.dataset.src) {
                                let
                                    img = new Image(),
                                    src = lazyObj.dataset.src
                                    ;
                                img.src = src;
                                img.onload = function () {
                                    if (!!lazyObj.parent) {
                                        lazyObj.parent.replaceChild(img, lazyObj);
                                    } else {
                                        lazyObj.src = src;
                                    }
                                }
                                lazyObj.removeAttribute('data-src');
                            }

                            if (lazyObj.dataset.srcset) {
                                lazyObj.srcset = lazyObj.dataset.srcset;
                                lazyObj.removeAttribute('data-srcset');
                            }

                            lazyObj.classList.remove('lazy');
                            lazyObj.classList.add('lazy-loaded');

                            lazyArr = lazyArr.filter(function (obj) {
                                return obj !== lazyObj;
                            });

                            if (lazyArr.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        lazyLoad();

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }

    /* Program Модули */
    function initSelect() {

        let infoName = document.querySelector('.program__info-header-name');
        let infoDates = document.querySelector('.program__info-header-dates');
        let infoTxt = document.querySelector('.program__info-txt');
        var state = true;
        $('.filter__link').click(function () {

            if (state) {
                $(this).parents(".filter__drop").find("UL").fadeIn('fast');
                return false;
            }
            else {
                $(this).parents(".filter__drop").find("UL").fadeOut('fast');
            }
            state = !state;
        })
        $(this).find('.filter__drop LI')
        $(".filter__drop LI").click(function () {
            infoName.innerHTML = $(this).find('.program__items-item-name').text();
            infoDates.innerHTML = $(this).find('.program__items-item-dates').text();
            infoTxt.innerHTML = $(this).find('.program__items-item-txt').text();
            console.log($(this).find('.program__info-txt').text());
            var mycontent = $(this).html();
            $(this).parents('.filter__drop').find('.filter__link').html(mycontent);
            $(this).parents('.filter__drop').find("UL").fadeOut('fast');
            return false;
        });
    };

    function initProgramsTabs() {

        let clickElem = document.querySelectorAll('.program__items-item'),
            infoName = document.querySelector('.program__info-header-name'),
            infoDates = document.querySelector('.program__info-header-dates'),
            infoTxt = document.querySelector('.program__info-txt');

        for (let elem of clickElem) {

            elem.addEventListener('click', function () {

                let activeEl = document.querySelector('.active-program');
                activeEl.classList.remove('active-program');
                this.classList.add('active-program');

                infoName.innerHTML = this.querySelector('.program__items-item-name').innerHTML;
                infoDates.innerHTML = this.querySelector('.program__items-item-dates').innerHTML;
                infoTxt.innerHTML = this.querySelector('.program__items-item-txt').innerHTML;

            })
        }
    }

    function initshowAll() {

        if (document.querySelector('.program__showall')) {

            document.querySelector('.program__showall').addEventListener('click', function () {
                this.style.display = 'none';
                document.querySelectorAll('.program__items-item').forEach((elem) => {
                    $(elem).slideDown(500);
                });
            });
        }
    }
    /* Program Модули */


    /* Слайдеры */
    let $stage_slider = $('.stage__bloks'),
        settingsStage = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.227,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $stage_slider.slick(settingsStage);

    $(window).on('resize', function () {
        if (!$stage_slider.hasClass('slick-initialized')) {
            return $stage_slider.slick(settingsStage);
        }
    });

    let $partners_slider = $('.partners__blocks'),
        settingsPartners = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.227,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $partners_slider.slick(settingsPartners);

    $(window).on('resize', function () {
        if (!$partners_slider.hasClass('slick-initialized')) {
            return $partners_slider.slick(settingsPartners);
        }
    });



});