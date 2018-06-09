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
    
    var arr = ["header.jpg" ,"1-1.jpg", "1-2.jpg", "1-3.jpg"];   // имена картинок
    var path = "../img/"; // каталог, где лежат картинки.
    var i = 0; // индекс текущего изображения.

    function next() {
        
        i = ++i%arr.length;
        $(".bacg-img img").fadeOut(500, function() {
            $(".bacg-img img").attr("src", path + arr[i]);
        });
        
        $(".bacg-img img").fadeIn(500);
        
    }

    setInterval(function(){next()},5000);
});
