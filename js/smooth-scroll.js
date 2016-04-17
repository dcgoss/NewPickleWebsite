// http://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000, "easeInOutCubic");
    return false;
});