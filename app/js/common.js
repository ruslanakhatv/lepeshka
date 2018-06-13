$(function() {
    $('.cottage-slick').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('#menumobile').click(function () {
        $('nav>ul').slideToggle();
    });
    //
    // $("#gallery").unitegallery({
    //     theme_navigation_type:"arrows"
    // });
    /*$(".bacg-img").slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1
    })*/
    new WOW().init();
    /*var $carousel =  $('.bacg-img').flickity({
        // options
        on: {
            change: function() {
                //setTimeout('$(".bacg-img img").css("opacity","0")', 500);
            }
            },
        cellAlign: 'left',
        adaptiveHeight: false,
        contain: false,
        autoPlay: 3000,
        pageDots: false,
        prevNextButtons: false,
        resize: true,
        pauseAutoPlayOnHover: false
        //wrapAround: true
    });*/
    var arr = ["1-1.jpg", "1-2.jpg", "1-3.jpg"];   // имена картинок
    var path = "../img/"; // каталог, где лежат картинки.
    var i = 0; // индекс текущего изображения.
    function next() {

        $(".bacg-img img").hide("slow");//css("opacity", "0.0");

        $(".bacg-img img").attr("src", path + arr[i]);

        i = ++i%arr.length;
        $(".bacg-img img").show("slow");//css("opacity", "1.0");

    }

    setInterval(function(){next()},3000);
});
