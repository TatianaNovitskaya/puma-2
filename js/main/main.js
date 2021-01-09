$(document).ready(function () {


    function tomorowDate() {
        var d = new Date();
        var mm = d.getMonth()+1;
        var dd = d.getDate()+1;
        var yy = d.getFullYear();
var tomorrowDay = roundZero(dd) + "."+ roundZero(mm) +"."+ yy;
        var currentDay = document.querySelectorAll('.js__tomorrow');
        currentDay.forEach(function(item){
            item.innerHTML = tomorrowDay;
        });

    }
    tomorowDate();

    function roundZero(num){
        return num < 10 ? "0"+num : num;
    }

});
document.addEventListener("DOMContentLoaded", function () {
    castomSelect.init();
});


var castomSelect = {
    objSelect: {
        man: ['Выберите размер', '40 (26.5 см)', '41 (27.5 см)', '42 (28 см)', '43 (28.5 см)', '44 (29 см)', '45 (29.5 см)']
    },
    init: function () {
        this.addSize()
    },

    addSize: function () {
        var self = this;
        var genderArray = document.querySelectorAll('.js__gender');
        genderArray.forEach(function (item) {
            var currentGenderValue = item.getAttribute('data-select');
            var currentInput = item.querySelector('[name="phone"]');
            self.createSelect(currentInput, self.objSelect[currentGenderValue])
        })


    },

    createSelect: function (itemPhone, arrayOptions) {
        var createFormGroup = document.createElement('div');
        createFormGroup.className = 'form-group';

        var createSelectDiv = document.createElement('div');
        createSelectDiv.className = 'select';

        var formSelect = document.createElement('select');
        formSelect.className = 'nice-select';
        formSelect.name = 'choose-size';
        arrayOptions.forEach(function (value, index) {
            var opt = document.createElement('option');
            if (index === 0) {
                opt.selected = 'selected';
                opt.disabled = 'disabled';
                opt.hidden = 'hidden'
            }
            opt.value = index;
            opt.innerHTML = value;
            formSelect.appendChild(opt);
        });
        createSelectDiv.appendChild(formSelect);
        createFormGroup.appendChild(createSelectDiv);

        this.addSelect(createFormGroup, itemPhone);
    },
    addSelect: function (createFormGroup, itemPhone) {
        var parentFormGroup = itemPhone.closest('.form-group');
        AppendElemenInDOM.insertAfter(createFormGroup, parentFormGroup)
        this.initSelect();

    },
    initSelect: function () {
        $('select').niceSelect();
    },
};
var AppendElemenInDOM = {
    insertAfter: function (elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if (next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    },
};
$(document).ready(function () {
    $("[data-fancybox]").fancybox({
        loop: true
    });


    var $window = $(window),
        win_height_padded = $window.height() * 1.1;
    if (window.innerWidth > 480) {
        $window.on('scroll', revealOnScroll);
    } else {
        $(".block_animated:not(.block_show)").each(function () {
            $(this).addClass('block_show');
        });
    }

    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() / 1.2;

        $(".block_animated:not(.block_show)").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded >= offsetTop) {
                $this.addClass('block_show');
            }
        });
    }

    if (window.innerWidth > 480) {
        revealOnScroll();
    }


    svg4everybody();

    objectFitImages();
});


document.addEventListener("DOMContentLoaded", function () {

    let elementDesktopScroll = document.getElementById('desktop-scroll');
    let btnCart = document.querySelector('.btn-cart');
    let last_known_scroll_position = 0;
    let ticking = false;



    if(window.innerWidth <= 1024) {
        function doSomething(scroll_pos) {
            var heightWindow = window.innerHeight;
            var delta = 1.1;
            var objectElementScroll = elementDesktopScroll.getBoundingClientRect();
            var elementOffsetTop = elementDesktopScroll.offsetTop;
            var bottomLine = objectElementScroll.height + elementOffsetTop;
            // Делаем что-нибудь с позицией скролла
            if (elementOffsetTop - (heightWindow/delta) >= scroll_pos || bottomLine - (heightWindow/delta) <= scroll_pos) {
                btnCart.style.display = "flex";
            }else{
                btnCart.style.display = "none";
            }
        }
        window.addEventListener('scroll', function(e) {
            last_known_scroll_position = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    doSomething(last_known_scroll_position);
                    ticking = false;
                });

                ticking = true;
            }
        });
    }



});

$ (document).ready (function () {
    var topMenu = $ (".header__menu"),
        topMenuHeight = $ ('.header').outerHeight (),
        menuItems = $('.js__scroll__to');

    // menuItems.on ('click',function (e) {
    //     e.preventDefault ();
    //     var $this = $ (this);
    //     var dataHref = $this.attr ("data-header");
    //     var offsetTop = (($ ('.' + dataHref).offset ().top)-50);
    //     if(window.innerWidth > 480){
    //         offsetTop = (($ ('.' + dataHref).offset ().top)/1.1);
    //     }
    //     $ ('html, body').stop ().animate ({
    //
    //         scrollTop: offsetTop
    //     }, 900);
    //     changeClassHeader (offsetTop);
    // });
    menuItems.on ('click',function (e) {
        e.preventDefault ();
        var mobileVersion = window.innerWidth <= 1024;

        var $this = $ (this);
        var dataHref = mobileVersion ? $this.attr ("data-header-mobile") : $this.attr ("data-header-desktop");

        var offsetTop = $ ('#' + dataHref).offset ().top;
        $ ('html, body').stop ().animate ({
            scrollTop: mobileVersion ? offsetTop -100 : offsetTop
        }, 900);
        changeClassHeader (offsetTop);

    });
    document.addEventListener ("mousewheel", onWheel);
    function onWheel (e) {
        changeClassHeader ($ (window).scrollTop ());
        changeClassOnScroll ()
    }
    $(window).on("keypress", onPress);
    function onPress (e) {
        changeClassHeader ($ (window).scrollTop ());
        changeClassOnScroll ()
    }

    changeClassHeader ($ (window).scrollTop ());
    function setActiveClassHeader (currentName, state) {
        $ ('.header a.active').removeClass ('active');
        state = state || false;
        if (state) {
            $ ('[data-header="' + currentName + '"]').addClass ('active');
        } else {
            currentName.addClass ('active');
        }
    }

    function changeClassHeader (offsetTop) {
        if (offsetTop > 0) {
            $ ('.header').addClass ('header_scroll');
        } else {
            $ ('.header').removeClass ('header_scroll');
        }
    }

    function changeClassOnScroll () {
        $ ('section').each (function () {
            var currentElement = $ (this).offset ().top;
            if (currentElement <= $ (window).scrollTop () && currentElement + $ (this).height () >= $ (window).scrollTop ()) {
                var currentClass = $ (this).attr ('class');
                setActiveClassHeader (currentClass, true)
            }
        });
    }


});


document.addEventListener("DOMContentLoaded", function () {
    VideoShow.init()
});

var VideoShow = {
    init: function () {
        this.playVideo();
    },

    playVideo: function () {
        var playButton = document.querySelector('.js__play');
        playButton.addEventListener('click', function () {
            playButton.parentElement.innerHTML = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/WtulWh_5_X0?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        });

    },

};

document.addEventListener("DOMContentLoaded", function () {
    sliderInit.init()
});

var sliderInit = {
    init: function () {
        this.reviewSlider();
    },

    reviewSlider: function () {
        var reviewSlider = new Swiper('.reviews__slider .swiper-container', {
            speed: 400,
            spaceBetween: 10,
            loop: true,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.review__button-next',
                prevEl: '.review__button-prev',
            },

        });

    },

};
