window.addEventListener('load', function() {
    document.body.classList.remove('page--loading');
    document.body.classList.add('page--loaded-enter');
    setTimeout(function() {
        document.body.classList.remove('page--loaded-enter');
        document.body.classList.add('page--loaded-active');
    }, 500);
});