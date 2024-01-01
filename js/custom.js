(function ($) {
    'use strict';

    // // Fullscreen Slider Active Code
    // $(window).on('resizeEnd', function () {
    //     $(".welcome_area, .drone_video, .welcome_slides .single_slide, .single_slide").height($(window).height());
    // });

    // $(window).on('resizeEnd', function () {
    //     $(".welcome_area, .drone_video, .welcome_slides .single_slide, .single_slide").height($(window).height());
    // });

    $(window).on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");

    // Welcome Slider Active Code
    if ($.fn.owlCarousel) {
        $(".welcome_slides, .single_advisor_profile").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="icofont icofont-swoosh-left"></i>', '<i class="icofont icofont-swoosh-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 10000 // 1s = 1000ms
        });
    }

    var owl = $('.welcome_slides');
    owl.owlCarousel();
    owl.on('translate.owl.carousel', function (event) {
        $('.owl-item .single_slide .slide_text h2').removeClass('animated').hide();
        $('.owl-item .single_slide .slide_text h3').removeClass('animated').hide();
        $('.owl-item .single_slide .slide_text .btn').removeClass('animated').hide();
    })
    owl.on('translated.owl.carousel', function (event) {
        $('.owl-item.active .single_slide .slide_text h2').addClass('animated custom_slideInUp').show();
        $('.owl-item.active .single_slide .slide_text h3').addClass('animated custom_slideInUp_2').show();
        $('.owl-item.active .single_slide .slide_text .btn').addClass('animated custom_slideInUp_btn_1').show();
    })

    // Text Slider Active Code 
    if ($.fn.owlCarousel) {
        $(".textslider").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            smartSpeed: 1500
        });
    }

    var owl = $('.textslider');
    owl.owlCarousel();
    owl.on('translate.owl.carousel', function (event) {
        $('.owl-item .single_slide .slide_text h2').removeClass('animated').hide();
        $('.owl-item .single_slide .slide_text h3').removeClass('animated').hide();
        $('.owl-item .single_slide .slide_text .btn').removeClass('animated').hide();
    })
    owl.on('translated.owl.carousel', function (event) {
        $('.owl-item.active .single_slide .slide_text h2').addClass('animated slideInRight').show();
        $('.owl-item.active .single_slide .slide_text h3').addClass('animated slideInLeft').show();
        $('.owl-item.active .single_slide .slide_text .btn').addClass('animated bounceInDown').show();
    })

    // Testimonials Slider Active code
    if ($.fn.owlCarousel) {
        $(".testimonials").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            smartSpeed: 800
        });
    }

    // Meanmenu active code
    $('.main_menu_area .mainmenu nav').meanmenu();

    // Onepage nav active code
    if ($.fn.onePageNav) {
        $('#nav').onePageNav({
            currentClass: 'current_page_item',
            easing: 'easeInOutQuart'
        });
    }

    // Magnific-popup Video active code
    if ($.fn.magnificPopup) {
        $('.video_btn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }
    // ScrollUp active code
    $.scrollUp({
        scrollName: 'scrollUp',
        scrollDistance: 450,
        easingType: 'easeInOutQuart',
        scrollText: '<i class="icofont icofont-swoosh-up"></i>',
        zIndex: 2147483647
    });

    // wow active code
    new WOW().init();

    // scrollUp active code
    if ($.fn.stellar) {
        $(window).stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });
    }
    
    // YouTube video active code
    if ($.fn.mb_YTPlayer) {
        $('.player').mb_YTPlayer();
    }

    // PreventDefault a click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // footer reveal active code
    if ($.fn.footerReveal) {
        $('.footer_area').footerReveal({
            shadowOpacity: 0.2
        });
    }

    // Sticky Active Code
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 350) {
            $('.main_header_area').addClass('sticky slideInDown');
            $('body').addClass('mobile_menu_on');

        } else {
            $('.main_header_area').removeClass('sticky slideInDown');
            $('body').removeClass('mobile_menu_on');
        }
    });

    // Preloader active code
    $(window).on('load', function () {
        $('body').css('overflow-y', 'visible');
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

})(jQuery);

// Infinite Grid

FWDRLUtils.onReady(function(){
    new FWDIGP({
        //main settings 
        rightClickContextMenu:"developer",
        instanceName:"myIGP",
        parentId:"myDiv",
        mainFolderPath:"content",
        skinPath:"modern-skin",
        playlistId:"myPlaylist",
        displayType:"fluidWidth",
        dragDirection:"both",
        autoScrollDirection:"left",
        thumbnailTransitionType:"opcacity",
        allCategoriesLabel:"All Categories (mixed)",
        showAllCategories:"yes",
        autoScale:"yes",
        autoScroll:"no",
        enableVisitedThumbnails:"no",
        keepThumbnailsOriginalSizeOnGridStart:"no",
        addZoomSupport:"yes",
        addDragAndSwipeSupport:"yes",
        disableThumbnailInteractivity:"no",
        randomizeAllCategories:"yes",
        randomizeCategories:"no",
        showThumbnailOverlay:"yes",
        showThumbnailIcon:"no",
        showHelpScreen:"yes",
        startAtCategory:1,
        maxWidth:940,
        maxHeight:660,
        thumbnailMaxWidth:210,
        thumbnailMaxHeight:190,
        maxScale:1.6,
        minScale:.8,
        autoScrollSpeed:0,
        thumbnailOverlayOpacity:.7,
        helpScreenOpacity:.3,
        backgroundColor:"#000000",
        thumbnailBackgroundColor:"#111111",
        thumbnailOverlayColor:"#000000",
        helpScreenBackgroundColor:"#FFFFFF",
        //combobox settings
        selectLabel:"SELECT CATEGORIES",
        comboBoxPosition:"topRight",
        showComboBox:"yes",
        comboBoxHorizontalMargins:12,
        comboBoxVerticalMargins:12,
        comboBoxCornerRadius:3,
        selctorBackgroundNormalColor:"#FFFFFF",
        selctorBackgroundSelectedColor:"#000000",
        selctorTextNormalColor:"#000000",
        selctorTextSelectedColor:"#FFFFFF",
        buttonBackgroundNormalColor:"#FFFFFF",
        buttonBackgroundSelectedColor:"#000000",
        buttonTextNormalColor:"#000000",
        buttonTextSelectedColor:"#FFFFFF",
        comboBoxShadowColor:"#000000",
        //ligtbox settings (optional)
        buttonsAlignment:"in",
        itemBoxShadow:"none",
        descriptionWindowAnimationType:"opacity",
        descriptionWindowPosition:"bottom",
        slideShowAutoPlay:"no",
        addKeyboardSupport:"yes",
        showCloseButton:"yes",
        showShareButton:"yes",
        showZoomButton:"yes",
        showSlideShowButton:"yes",
        showSlideShowAnimation:"yes",
        showNextAndPrevButtons:"yes",
        showNextAndPrevButtonsOnMobile:"yes",
        showDescriptionButton:"yes",
        showDescriptionByDefault:"no",
        videoShowFullScreenButton:"yes",
        videoAutoPlay:"yes",
        nextVideoOrAudioAutoPlay:"yes",
        videoLoop:"no",
        audioAutoPlay:"no",
        audioLoop:"no",
        backgroundOpacity:.9,
        descriptionWindowBackgroundOpacity:.95,
        buttonsHideDelay:3,
        slideShowDelay:4,
        defaultItemWidth:640,
        defaultItemHeight:480,
        itemOffsetHeight:50,
        spaceBetweenButtons:8,
        buttonsOffsetIn:5,
        buttonsOffsetOut:5,
        itemBorderSize:0,
        itemBorderRadius:0,
        itemBackgroundColor:"#333333",
        itemBorderColor:"#333333",
        lightBoxBackgroundColor:"#000000",
        descriptionWindowBackgroundColor:"#FFFFFF",
        videoPosterBackgroundColor:"#0099FF",
        videoControllerBackgroundColor:"#FFFFFF",
        audioControllerBackgroundColor:"#FFFFFF",
        timeColor:"#000000"
    });
});