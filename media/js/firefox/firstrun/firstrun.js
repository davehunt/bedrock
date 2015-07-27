;(function($) {
    'use strict';

    var $video = $('#firstrun-video');

    $video.on('play', function() {

        window.dataLayer.push({
            'event': 'video-play',
            'videoTitle': 'First Run Video'
        });
    }).on('pause', function() {
        // is video over?
        // 'pause' event fires just before 'ended', so
        // using 'ended' results in extra pause tracking.
        window.dataLayer.push({
            'event': 'video-' + $video[0].currentTime === $video[0].duration ? 'complete' : 'pause',
            'videoTitle': 'First Run Video'
        });

    });
})(window.jQuery);
