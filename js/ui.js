var DEMO = {
    'theater':function(output) {
        // Do something here
        var len = output.results.length;
        for (var i = 0; i < len; i++) {                
            var title = output.results[i].title;
            $('#gallery').append('<div class=\'gallery_element\'>'+title+'</div>');
        }
    },
};


$(document).ready(function() {
    /* Debug/console logging disabled by default */
    DEBUG.enable();

   // KOOZIE.init(window, document, _taq);

   /* 
   * GALLERY.get
   * status: working
   */
   KOOZIE.gallery("get", {"gallery_id":"2", "start":"0", "total":"2", "environment":"youtube"}, DEMO.theater);

   /* 
   * TRACK.click
   * status: working
   * description: page must already be created and page_id REQUIRED
   */
   $("#gallery").delegate(".gallery_element", "click", function(){
      var desc = $(this).html();
      KOOZIE.track("click", {"description": desc, "page_id":"1"});
   });

   // if your tracking content that has been shared
   /*
   KOOZIE.track("share", {"site":"pinterest","content_id":"19007","region":"us","url":"http://google.com"});
   KOOZIE.track("share", {"site":"pinterest","url":"http://google.com"});
   */

   // needs a page, widget view, and widget_id 0
   /*
   KOOZIE.track("impression", {"page_id":"6"})
   KOOZIE.track("view", {"type":"text","content_id":"19007"});
   KOOZIE.track("view", {"type":"media","media_id":"20064"});
   */

   // in order to track views track impressions/modules must be called 
   // track modules needs widget_id set as 0 and page_id set as the page created
   // track view must have a page id set to the same page id that was created and has widget id 0 

   // CONTENT
   /*
   KOOZIE.content("get", {"content_id":"18980"});
   */

   // STREAM 
   /*
   KOOZIE.stream("get", {"stream_id":"1"});
   */

   // DELEGATES
   /*
   $('#gallery').delegate(".chicklets", "click", function() { CONTENT.get($(this).attr('rel'));});
   */
});
