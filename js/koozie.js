var DEBUG = {
    'log':function(result) {
        console.log(result);
    }
}

var GALLERY = {
    'get':function(properties, success, fail, debug) {
        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/gallery/get.jsonp",
            context: document.body,
            success: function(output){ 
                if (typeof success=== "function") {
                    success(output);
                }
                if (debug === "true") {
                    DEBUG.log(output);
                }
            },
            data: properties,   
            dataType: 'jsonp',
        });
    }
};

var TRACK = {
    'click':function(properties, success, fail, debug) {
        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/track/click.jsonp",
            context: document.body,
            success: function(data){ 
                if (typeof success=== "function") {
                    success(output);
                }
                if (debug === "true") {
                    DEBUG.log(output);
                }
            },
            data: properties,    
            dataType: 'jsonp',
        });
    },
    'share':function(properties) {
        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/track/share.jsonp",
            context: document.body,
            success: function(data){ 
            },
            data: {
                site: properties.site, 
                url: KOOZIE.setup.BASE_URL+properties.url, 
                content_id: properties.content_id, 
            },   
            dataType: 'jsonp',
        });
    },
    'view':function(properties) {
        var _post;
        switch(properties.type) {
            case 'text':
                // content will only work when it doesn't have a piece of media associated to it / only meant for tracking text
                _post = {
                    content_id:properties.content_id
                    };
                break;
            case 'media':
                // only meant for tracking media
                _post = {
                    media_id:properties.media_id
                    };
                break;
        }

        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/track/view.jsonp",
            context: document.body,
            success: function(data){ 
            },
            data: _post,
            dataType: 'jsonp',
        });
    },
    'impression':function(properties) {
        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/track/impression.jsonp",
            context: document.body,
            success: function(data){ 
            },
            data: {
                page_id: properties.page_id,
            },
            dataType: 'jsonp',
        });
    }
}



var CONTENT = {
    'get':function(properties) {
        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/content/get.jsonp",
            context: document.body,
            success: function(data){ 
                console.log(data);
                var img = data.results[0].media[0].large;
                $('#content').html('');
                $('#content').append('<img src='+img+'></div>') 
            },
            data: {
                content_id: properties.content_id,
                environment: 'youtube',
            },   
            dataType: 'jsonp',
        });
    }
}

var STREAM = {
    'get':function(properties) {
        $.ajax({
            url: KOOZIE.setup.BASE_URL+"/v4/api/stream/get.jsonp",
            context: document.body,
            success: function(data){ 
                var len = data.results.length;
                for (var i = 0; i < len; i++) {                
                    var title = data.results[i].content_name;
                    var img = data.results[i].attribution_avatar;
                    var author = data.results[i].attribution_author;
                    $('#stream').append('<li><img src="'+img+'"><span class="author">'+author+'</span><span class="comment">'+title+'</span></li>');
                }
            },
            data: {
                stream_id: properties.stream_id, 
            },   
            dataType: 'jsonp',
        });
    }
}

/** 
* KOOZIE Controller
*/
var _taq = _taq || [];

var KOOZIE =  {
   'init': function(window, d, _taq) {
         var tmaBaseURL = (("https:" == d.location.protocol) ? "https://analytics.thismoment.com/" : "http://analytics.thismoment.com/");
         _taq.push(['getTracker', tmaBaseURL, KOOZIE.setup.SIGNAL_SITE_ID]);
         _taq.push(['setGoogleAccount', KOOZIE.setup.GA_BEACON]);
         _taq.push(['setCustomVar', 1, 'page_id', KOOZIE.setup.PAGE_ID, 1]);
         _taq.push(['trackPageView']);
         _taq.push(['enableLinkTracking']);
         _taq.push(['trackHrefChange']);
    },
    'setup': {
        'BASE_URL':'',
        'GA_BEACON':'',
        'SIGNAL_SITE_ID':'',
        'PAGE_ID':'',
    },
    'track':function(action, properties, success, fail) {
        switch(action) {
            case 'click':
                TRACK.click(properties);
                break;
            case 'share':
                TRACK.share(properties);
                break;
            case 'view':
                TRACK.view(properties);
                break;
            case 'impression':
                TRACK.impression(properties);
                break;
        }
    },
    'gallery':function(action, properties, success, fail, debug) {
        switch(action) {
            case 'get':
                GALLERY.get(properties, success, fail, true);
                break;
        }
    },
    'content':function(action, properties) {
        switch(action) {
            case 'get':
                CONTENT.get(properties);
                break;
        }
    },
    'stream':function(action, properties) {
        switch(action) {
            case 'get':
                STREAM.get(properties);
                break;
        }
    },
}

/**
 * ANALYTICS 
 * status: not working
 */

/* 
var _taq = _taq || [];
(function(w, d, _taq) {
     var tmaBaseURL = (("https:" == d.location.protocol) ? "https://analytics.thismoment.com/" : "http://analytics.thismoment.com/");
     var bind_exit_event = ((w.hasOwnProperty('onbeforeunload') || (typeof w.onbeforeunload != 'undefined')) && !/\b(iPhone|iP[ao]d)/.exec(w.navigator.userAgent)) ? 'beforeunload' : 'unload';
     _taq.push(['addEventListener', window, bind_exit_event, ['trackEvent', 'exit', 'exit', 'exit']]);

     var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
     var j=d.createElement('script');j.type='text/javascript';j.async=true;j.src='<?= $dec_cdn ?>/js/tm_analytics.js';
     var s=document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(ga, s);
     s.parentNode.insertBefore(j, s);
})(window, document, _taq);
*/
