import Config from './data/config';
import Detector from './utils/detector';
import Main from './app/main';



// Check environment and set the Config helper
if (__ENV__ === 'dev') {
    console.log('----- RUNNING IN DEV ENVIRONMENT! -----');

    Config.isDev = true;
}

var threeapp;
var tl = new TimelineLite();

function initThree() {
    // Check for webGL capabilities
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    } else {
        const container = document.getElementById('appContainer');
        threeapp = new Main(container);

    }
}

function showIntro() {
   // console.log('show reveal')
    $('#selector').addClass('reveal')
}



initThree();

window.location.hash = '#';







$(function() {

    $(document).keypress(function(e) {
       // console.log(e.key)
        if (e.key == 'p') {
            alert("Primary use case - you're not subscribed at all");
            $('#wrapper').removeClass()
            $('#wrapper').addClass('primary');
        } else if (e.key == 's') {
            alert("Secondary use case - you're subscribed to Market Landscape and your company subscribes");
            $('#wrapper').removeClass()
            $('#wrapper').addClass('secondary');

        } else if (e.key == 't') {
            alert("Tertiary use case - your company is subscribed to Market Landscape, but you aren't");
            $('#wrapper').removeClass()
            $('#wrapper').addClass('tertiary');
        }
    });

   setTimeout(showIntro, 3000)


    $('#product-dropdown').click(function() {
       $(this).toggleClass('expand');
    });

    $('.home-btn').click(function() {
        
        $('#gpa-title').hide();
        $('body').removeClass();

        var want = $('#want');
        var uline = $('#underline');
        var bkgd = $('.bkgd');

        var tl2 = new TimelineLite();
        tl2.to(bkgd, 1, {left: "0px", 
                        ease: Power4.easeOut,
                        onComplete: function(){
                            threeapp.showBoxes();
                            $('#selector').addClass('reveal')
                            $('#category-list').removeClass('slideOut');
                        }
        }, 1)
        .to(want, 0.4, {opacity:1, ease: Expo.easeInOut}, 1.5)

        
        txt.hide('fx7');
    });



    function showName(name){

       txt.hide('fx7', function(){
          //console.log('hide complete')

          $('#underline').html(name);
          txt._init();

          txt.show('fx7');
        });
       
        
    }


    var txt = new TextFx(document.getElementById("underline"));
    txt.hide('fx7');


    $("#category-list li a").click(function() {

        var selection = $(this).text();
        $("#category-list").addClass('slideOut')

        showName(selection);
        threeapp.hideBoxes();
        $('#underline').addClass('clicked');
       
        transitionStates()
    });


    $("#sidebar li a").click(function() {

        $(".cat-label.selected").fadeOut(100, function(){
            $(this).removeClass('selected') 
        }).fadeIn(500)


        $(this).parent().fadeOut(100, function(){
            $(this).addClass('selected') 
        }).fadeIn(500)
    });


    $('.snapshot')
      .scrollie({
        scrollOffset : -50,
        scrollingInView : function(elem) {
                   
          var id = elem.attr('id');
         // console.log(id)
          
          $('#sidebar ul').removeClass().addClass(id)
          
        }
      });

    function transitionStates(){
            var want = $('#want');
            var uline = $('#underline');
            var bkgd = $('.bkgd');
            var sidebar_width = 300 - $(window).width();

            tl.to(want, 0.4, {left:"0px", opacity:0, ease: Expo.easeInOut}, 1.5)
             .to(bkgd, 1, {left: sidebar_width +"px", 
                            ease: Power4.easeOut,
                            onComplete: toSnapshots
            }, "-=.5")
    }

    function toSnapshots(){
        
         $('body').addClass('state2')
         $('#sidebar').addClass('reveal')

    }

});


$(window).on('hashchange', function() {
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        switch (hash) {
            case 'growth':
                $('#sidebar .category-menu li:nth-child(1) .cat-label').addClass('selected');
                $('#product-snapshots').fadeOut(100).fadeIn(500);

                $('#growth-snapshot').fadeIn(100);
                $('#acquire-snapshot').fadeOut(100);
                $('#sidebar ul').addClass('product-landscape')
                $('html, body').animate({scrollTop:0},500);
        
                break;

            case 'acquire':
                $('#sidebar .category-menu li:nth-child(3) .cat-label').addClass('selected');
                $('#product-snapshots').fadeOut(100).fadeIn(500);
                $('#growth-snapshot').fadeOut(100);
                $('#acquire-snapshot').fadeIn(100);
                $('#sidebar ul').addClass('product-stance');
                $('html, body').animate({scrollTop:0},500);

                break;
            
            default:
                //   $('body').removeClass();
        }

       // console.log(hash);
        
    } 
});
