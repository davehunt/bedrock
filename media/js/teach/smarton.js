/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// create namespace
if (typeof window.Mozilla === 'undefined') {
    window.Mozilla = {};
}

;(function($) {
    'use strict';

    var $window = $(window);
    var $document = $(document);
    var $body = $('body');
    var $nav = $('.smarton-nav');
    if ($nav.length > 0) {
        var navTop = $nav.offset();
        var navHeight = $nav.height();
    }

    // Sticky navigation
    var fixed = false;
    var didScroll = false;

    $window.scroll(function() {
        didScroll = true;
    });

    if ($nav.length > 0) {
        $(document).ready(function() {
            var scrollTop = $window.scrollTop();
            if (scrollTop >= navTop.top) {
                didScroll = true;
            }
        });
    }

    function adjustScrollbar() {
        if (didScroll) {
            didScroll = false;
            var scrollTop = $window.scrollTop();
            if ($nav.length > 0) {
                if( scrollTop >= navTop.top ) {
                    if(!fixed) {
                        fixed = true;
                        $nav.addClass('fixed');
                        $('#ask').css({ paddingTop: navHeight });
                    }
                } else {
                    if(fixed) {
                        fixed = false;
                        $nav.removeClass('fixed');
                        $('#ask').removeAttr('style');
                        $nav.find('.nav-steps li').removeClass();
                    }
                }
            }
        }
    }

    // Check for an adjusted scrollbar every 100ms.
    setInterval(adjustScrollbar, 100);

    //Scroll to the linked section
    $document.on('click', '.nav-steps a[href^="#"]', function(e) {
        e.preventDefault();
        // Extract the target element's ID from the link's href.
        var elem = $(this).attr('href').replace( /.*?(#.*)/g, "$1" );
        $('html, body').animate({
            scrollTop: $(elem).offset().top - 83
        }, 1000, function() {
            $(elem).attr('tabindex','100').focus().removeAttr('tabindex');
        });
    });

    var $newsletter = $('#newsletter-signup');
    var newsHeight = $newsletter.height();
    var tallMode = false;
    var queryHeight = matchMedia('(min-height: 650px)');

    if (queryHeight.matches) {
        tallMode = true;
        stickyFooter();
    } else {
        tallMode = false;
        stickyFooter();
    }

    queryHeight.addListener(function(mq) {
        if (mq.matches) {
            tallMode = true;
            stickyFooter();
        } else {
            tallMode = false;
            stickyFooter();
        }
    });

    function stickyFooter() {
        if (tallMode) {
            $('#do').waypoint(function(direction) {
                if (direction === 'down') {
                    $newsletter.addClass('fixed').css({ bottom: '-' + $newsletter.height() + 'px' }).animate({ bottom: '0' }, 750);
                } else if (direction === 'up') {
                    $newsletter.animate({ bottom: '-' + newsHeight + 'px' }, 500, function(){
                        $newsletter.removeClass('fixed');
                    });
                }
            }, { offset: '50%' });

            $('#colophon').waypoint(function(direction) {
                if (direction === 'down') {
                    $newsletter.removeClass('fixed');
                } else if (direction === 'up') {
                    $newsletter.addClass('fixed');
                }
            }, { offset: '100%' });
        } else {
            $newsletter.removeClass('fixed');
        }
    }

    // Change the navbar color and current item to match the section waypoint
    function navState(current, previous) {
        return function(dir) {
            if (fixed) {
                if (dir === 'down') {
                    $nav.find('.nav-steps li').removeClass();
                    $('#nav-step-' + current).addClass('current');
                }
                else {
                    $nav.find('.nav-steps li').removeClass();
                    $('#nav-step-' + previous).addClass('current');
                }
            }
        };
    }

    if ($nav.length > 0) {
        //Fire the waypoints for each section, passing classes for the current and previous sections
        $('#ask').waypoint(navState('ask', 'ask'), { offset: $nav.height() });
        $('#know').waypoint(navState('know', 'ask'), { offset: $nav.height() });
        $('#do').waypoint(navState('do', 'know'), { offset: $nav.height() });
        $('#chat').waypoint(navState('chat', 'do'), { offset: $nav.height() });
    }

})(window.jQuery);

