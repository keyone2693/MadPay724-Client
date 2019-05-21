jQuery(document).ready(function() {
    
    jQuery('body').on('click', '.jm-post-like', function(event) {
        event.preventDefault();
        
        var lk = jQuery(this).parent().find('.lk').text(),
            unlk = jQuery(this).parent().find('.unlk').text();

        var heart = jQuery(this);
        post_id = heart.data("post_id");
        heart.html("<i class='fa fa-heart main-color'></i>");
        jQuery.ajax({
            type: "post",
            url: ajax_var.url,
            data: "action=jm-post-like&nonce=" + ajax_var.nonce + "&jm_post_like=&post_id=" + post_id,
            success: function(count) {
                if (count.indexOf("already") !== -1) {
                    var lecount = count.replace("already", "");
                    if (lecount === "0") {
                        lecount = lk
                    }
                    heart.prop('title', lk);
                    heart.removeClass("liked");
                    heart.html("<i class='fa fa-heart-o main-color'></i>" + '<span>'+lecount+'</span>')
                } else {
                    heart.prop('title', unlk);
                    heart.addClass("liked");
                    heart.html("<i class='fa fa-heart main-color'></i>" + '<span>'+count+'</span>')
                }
                jQuery('.jm-post-like i').each(function(){
                    var contt = window.getComputedStyle(this,':before').content.replace(/\'/g, "").replace(/\"/g, "");
                    jQuery(this).attr('data-hover',contt);
                });
            }

        })
    })
});