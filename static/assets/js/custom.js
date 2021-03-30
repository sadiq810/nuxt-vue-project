// Custom Scripts
// -----------------------------------------------------------------------------------------
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// if( isMobile.iOS() ){
//     alert('iOS');
// }

if( isMobile.Android() ){
    $('body').removeClass('ios').addClass('android');
}




// this for nav hidden

$(document).ready(function () {

    'use strict';

    var c, currentScrollTop = 0,
        navbar = $('header');

    $(window).scroll(function () {
        var a = $(window).scrollTop();
        var b = navbar.height();

        currentScrollTop = a;

        if (c < currentScrollTop && a > b + b) {
            navbar.addClass("scrollUp");
        } else if (c > currentScrollTop && !(a <= b)) {
            navbar.removeClass("scrollUp");
        }
        c = currentScrollTop;
    });

    $('.SearchInBooks').click(function() {
        if( $(this).is(':checked')) {
            $(".SearchInBooks-wrap").show();
        } else {
            $(".SearchInBooks-wrap").hide();
        }
    });


});



$(window).scroll(function() {
    if ($(this).scrollTop()>100){
        $('.PcHeader').addClass('PcHeader-sticked');
    }else{
        $('.PcHeader').removeClass('PcHeader-sticked');
    }
});


$(function () {
    $('[data-toggle="popover"]').popover()
    $('.WithTooltip').tooltip()
});





$(document).ready(function() {

    // $('.MenuHover').hover(function() {
    //     $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
    // }, function() {
    //     $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(100);
    // });

    $('.TabsHover > li > a').hover(function() {
        $(this).tab('show');
    });


    //
    //
    // setTimeout(function() {
    //     $('body').removeClass('loading');
    // }, 750);


    // SearchTriggerPc


    // Search Header
    $('#search').focus(function () {
        $('body').addClass('mainSearch-visible');
    });
    $('a.mainSearchTrigger').click(function () {
        $('body').addClass('mainSearch-visible');
        $("#search").focus();
    });

    $('.PcSearch-Toggle a').click(function () {
        $('body').addClass('mainSearch-visible');
        $("#search-pc").focus();
    });


    $('.backFromSearch a').click(function () {
        $('body').removeClass('mainSearch-visible');
        return false;
    });
    $('a.header-pup').click(function () {
        $("html").attr("dir", "ltr");
        return false;
    });

    $('.ForgetPassTrigger').click(function () {
        $('#LoginBox, #ForgetBox').slideToggle('fast');
        return false;
    });

    $('.MainAlert-close').click(function () {
        $(this).closest('.MainAlert').fadeOut();
        return false;
    });

    $('.foot-list-title').click(function () {
        $(this).closest('.foot-col').toggleClass('active');
        return false;
    });

    $('.FilterTrigger').click(function () {
        $(this).closest('.CategoryWithFilter').toggleClass('active');
        return false;
    });


    // max height
    $('.MaxH-trigger').click(function () {
        $(this).parent('.MaxH').toggleClass('FullH');
        $(this).text(function(i, text){
            return text === "Read More" ? "Read Less" : "Read More";
        })
    });

    $('.FilterList-trigger').click(function () {
        $(this).parent('.FilterList').toggleClass('FullH');
        $(this).text(function(i, text){
            return text === "More" ? "Less" : "More";
        })
    });


    // sticky
    $(".MobHeaderFixed").sticky({topSpacing:0});
    $(".SticThis").sticky({topSpacing:0});


    // main list switch style
    $('#listSwitchTrigger').on('click', function(e) {
        $(this).find('i').toggleClass("ico-view-list ico-view-grid");
        $('#MainListing').toggleClass("thumbnail-items side-thumbnail-items");
        e.preventDefault();
    });

    // line expand
    $('.LinesExpand').click(function () {
        $(this).toggleClass('TwoLines');
    });


// DropDown Fix
    $('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });


// Parallax Effect =====================================================
    $window = $(window);
    $('.parallax').each(function () {
        var $bgobj = $(this); // assigning the object
        $(window).scroll(function () {
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        }); // window scroll Ends
    });


// parallax
    $(document).scroll(function () {
        var scrollPos = $(this).scrollTop();
        $('.parallax-over').css({
            'top': (scrollPos / 3) + 'px',
            'opacity': 1 - (scrollPos / 500)
        });
        $('.ProductSlider').css({
            'bottom': 1 - (scrollPos / 3) + 'px',
            'opacity': 1 - (scrollPos / 500)
        });
        $('.post-head-inner').css({
            'bottom': 1 - (scrollPos / 4) + 'px',
            'opacity': 1 - (scrollPos / 200)
        });
        $('.image-banner').css({
            'background-position': 'center ' + (-scrollPos / 4) + 'px'
        });
    });



    $('.ChangableList input').click(function(){
        var val = $(this).next("label").html();
        $(this).closest('.ChangableList').find('.ChangableTitle').html(val);
    });

    $('.ProductOption-block input').click(function(){
        var val = $(this).val();
        $(this).closest('.ProductOption-block').find('.ProductOption-title span').html(val);
    });


});

// this for shopping cart
$(function () {

    var CartParent = $('.SCart-items');
    if(CartParent.find('li').length === 0) {
        $('.CartEmptyMessage').show();
        $('.CartItemsCount, .SCart-action, .SCart-content').fadeOut(100);
        $('.EditCart').addClass('disabled');
        $('.scart-menu').addClass('empty-cart');
    }

    CartParent.on('click','.ItemDel', function () {

        $(this).closest('li').fadeOut(500, function () {
            $(this).remove();

            localStorage.setItem('item', CartParent.find('.SCart-items').html());

            if(CartParent.find('li').length === 0) {
                localStorage.clear();
                $('.CartEmptyMessage').fadeIn(100);
                $('.CartItemsCount, .SCart-action, .SCart-content').fadeOut(100);
                $('.EditCart').addClass('disabled');
                $('.scart-menu').addClass('empty-cart');
            }
        });
    });

    $('.EditCart a').click(function() {
        $('#SCart').toggleClass('list-editing');
        $(this).text(function(i, text){
            return text === "Edit" ? "Done" : "Edit";
        })
    });


    // $('a.LoaderButton').click(function () {
    //     $(this).toggleClass('active');
    // });


    $('.LoaderButton').on('click', function() {
        var $this = $(this);
        var loadingText = '<span class="loading-ico"></span><span class="loading-text">Loading</span>';
        if ($(this).html() !== loadingText) {
            $this.data('original-text', $(this).html());
            $this.html(loadingText);
        }
        setTimeout(function() {
            $this.html($this.data('original-text'));
            $this.toggleClass('active');
            $this.removeClass('waves-effect');
        }, 1000);
    });



});


// Login / Register page
$(document).ready(function(){
    $("form").submit(function(e) {
        e.preventDefault();
    });

    var clogin = $("#content-login");
    var cregister = $("#content-register");

    /* display the register page */
    $("#showregister").on("click", function(e){
        e.preventDefault();
        var newheight = cregister.height();

        $('.LogRegister').removeClass('login-page').addClass('register-page');

    });

    /* display the login page */
    $("#showlogin").on("click", function(e){
        e.preventDefault();
        var newheight = clogin.height();

        $('.LogRegister').removeClass('register-page').addClass('login-page');

    });
});


// Main Nav
jQuery(document).ready(function($) {

    var c_rtl = document.dir == "rtl" ? 'right' : 'left';
    // var c_rtl = ($('body').hasClass('is-rtl')) ? 'right' : 'left';


    var $toggle = $('.toggle');

    $('#main-nav').hcOffcanvasNav({
        maxWidth: false,
        customToggle: $toggle,
        levelTitles: true,
        insertClose: 2,
        levelOpen:'overlap',
        closeOnClick:true,

        //navTitle: 'All Categories',
        //pushContent: '#MainContent',

        position:c_rtl,
        labelClose:	'إغلاق القائمة',
        labelBack:	'رجوع'

    });
});



// lazy loading
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll(".lazy");
    var lazyloadThrottleTimeout;

    function lazyload () {
        if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.classList.remove('lazy');
                }
            });
            if(lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});


// Sticky
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=Array.prototype.slice,i=Array.prototype.splice,n={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:"",widthFromWrapper:!0,responsiveWidth:!1,zIndex:"auto"},r=t(window),s=t(document),o=[],c=r.height(),a=function(){for(var e=r.scrollTop(),i=s.height(),n=i-c,a=e>n?n-e:0,p=0,d=o.length;p<d;p++){var l=o[p],u=l.stickyWrapper.offset().top,h=u-l.topSpacing-a;if(l.stickyWrapper.css("height",l.stickyElement.outerHeight()),e<=h)null!==l.currentTop&&(l.stickyElement.css({width:"",position:"",top:"","z-index":""}),l.stickyElement.parent().removeClass(l.className),l.stickyElement.trigger("sticky-end",[l]),l.currentTop=null);else{var g=i-l.stickyElement.outerHeight()-l.topSpacing-l.bottomSpacing-e-a;if(g<0?g+=l.topSpacing:g=l.topSpacing,l.currentTop!==g){var m;l.getWidthFrom?m=t(l.getWidthFrom).width()||null:l.widthFromWrapper&&(m=l.stickyWrapper.width()),null==m&&(m=l.stickyElement.width()),l.stickyElement.css("width",m).css("position","fixed").css("top",g).css("z-index",l.zIndex),l.stickyElement.parent().addClass(l.className),null===l.currentTop?l.stickyElement.trigger("sticky-start",[l]):l.stickyElement.trigger("sticky-update",[l]),l.currentTop===l.topSpacing&&l.currentTop>g||null===l.currentTop&&g<l.topSpacing?l.stickyElement.trigger("sticky-bottom-reached",[l]):null!==l.currentTop&&g===l.topSpacing&&l.currentTop<g&&l.stickyElement.trigger("sticky-bottom-unreached",[l]),l.currentTop=g}var y=l.stickyWrapper.parent(),f=l.stickyElement.offset().top+l.stickyElement.outerHeight()>=y.offset().top+y.outerHeight()&&l.stickyElement.offset().top<=l.topSpacing;f?l.stickyElement.css("position","absolute").css("top","").css("bottom",0).css("z-index",""):l.stickyElement.css("position","fixed").css("top",g).css("bottom","").css("z-index",l.zIndex)}}},p=function(){c=r.height();for(var e=0,i=o.length;e<i;e++){var n=o[e],s=null;n.getWidthFrom?n.responsiveWidth&&(s=t(n.getWidthFrom).width()):n.widthFromWrapper&&(s=n.stickyWrapper.width()),null!=s&&n.stickyElement.css("width",s)}},d={init:function(e){return this.each(function(){var i=t.extend({},n,e),r=t(this),s=r.attr("id"),c=s?s+"-"+n.wrapperClassName:n.wrapperClassName,a=t("<div></div>").attr("id",c).addClass(i.wrapperClassName);r.wrapAll(function(){if(0==t(this).parent("#"+c).length)return a});var p=r.parent();i.center&&p.css({width:r.outerWidth(),marginLeft:"auto",marginRight:"auto"}),"right"===r.css("float")&&r.css({float:"none"}).parent().css({float:"right"}),i.stickyElement=r,i.stickyWrapper=p,i.currentTop=null,o.push(i),d.setWrapperHeight(this),d.setupChangeListeners(this)})},setWrapperHeight:function(e){var i=t(e),n=i.parent();n&&n.css("height",i.outerHeight())},setupChangeListeners:function(t){if(window.MutationObserver){var e=new window.MutationObserver(function(e){(e[0].addedNodes.length||e[0].removedNodes.length)&&d.setWrapperHeight(t)});e.observe(t,{subtree:!0,childList:!0})}else window.addEventListener?(t.addEventListener("DOMNodeInserted",function(){d.setWrapperHeight(t)},!1),t.addEventListener("DOMNodeRemoved",function(){d.setWrapperHeight(t)},!1)):window.attachEvent&&(t.attachEvent("onDOMNodeInserted",function(){d.setWrapperHeight(t)}),t.attachEvent("onDOMNodeRemoved",function(){d.setWrapperHeight(t)}))},update:a,unstick:function(e){return this.each(function(){for(var e=this,n=t(e),r=-1,s=o.length;s-- >0;)o[s].stickyElement.get(0)===e&&(i.call(o,s,1),r=s);r!==-1&&(n.unwrap(),n.css({width:"",position:"",top:"",float:"","z-index":""}))})}};window.addEventListener?(window.addEventListener("scroll",a,!1),window.addEventListener("resize",p,!1)):window.attachEvent&&(window.attachEvent("onscroll",a),window.attachEvent("onresize",p)),t.fn.sticky=function(i){return d[i]?d[i].apply(this,e.call(arguments,1)):"object"!=typeof i&&i?void t.error("Method "+i+" does not exist on jQuery.sticky"):d.init.apply(this,arguments)},t.fn.unstick=function(i){return d[i]?d[i].apply(this,e.call(arguments,1)):"object"!=typeof i&&i?void t.error("Method "+i+" does not exist on jQuery.sticky"):d.unstick.apply(this,arguments)},t(function(){setTimeout(a,0)})});
