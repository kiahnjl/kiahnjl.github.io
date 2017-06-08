
var setupTabHandlers = function() {
    var $tabsNav = $('.info-nav .tab');
    var $leftNav = $('.info-nav .nav-arrow-left');
    var $rightNav = $('.info-nav .nav-arrow-right');
    var $boxes = $('.info-boxes .info-box');

    var toggle = function ($tab) {
        if($tabsNav.index($tab) >= 0) {
            toggleTabs($tab);
            toggleLeftRight($tab);
            toggleBoxes($tab);
        }
    };

    var toggleTabs = function($tab) {
        $tabsNav.removeClass('active');
        $tab.addClass('active');
    };

    var toggleBoxes = function($tab) {
        $boxes.hide();
        $boxes.filter('.' + $tab.data('infobox')).show();
    };

    var toggleLeftRight = function($tab) {
        $leftNav.removeClass('hide');
        $rightNav.removeClass('hide');
        if($tabsNav.index($tab) === 0) {
            $leftNav.addClass('hide');
        } else if($tabsNav.index($tab) === ($tabsNav.length - 1)) {
            $rightNav.addClass('hide');
        }
    };

    $tabsNav.on('click', function(e) {
        toggle($(e.target));
    });

    $leftNav.on('click', function() {
        toggle($tabsNav.filter('.active').prev());
    });

    $rightNav.on('click', function() {
        toggle($tabsNav.filter('.active').next());
    });

    toggle($tabsNav.filter('.active'));
};


var setupContactClassHandler = function() {
    var $window = $(window);
    var $contactBoxes = $('.contact .info-box');
    var $inlines = $contactBoxes.filter('.inline');
    var $notFills = $contactBoxes.filter(function(i, e) { return !$(e).hasClass('fill-width'); });

    var checkContact = function(e) {
        if($window.width() < 600) {
            $contactBoxes.removeClass('inline').removeClass('left').removeClass('right');
            $contactBoxes.addClass('fill-width');
        } else {
            $inlines.addClass('inline');
            $notFills.removeClass('fill-width');
        }
    };

    $window.on('resize', checkContact);
    checkContact();
};

var contactSubmitHandler = function() {
    var $contactForm = $('form.contact');
    var $fields = $('.contact .info-box > textarea, input');

    var checkFields = function(e) {
        var invalidCount = 0;
        $fields.each(function(i, e) {
            var $input = $(e);
            if($input.val().length === 0) {
                $input.parent().addClass('invalid');
                invalidCount++;
            } else {
                $input.parent().addClass('valid');
            }
        });

        if(invalidCount > 0) {
            e.preventDefault();
        } else {
            this.submit();
        }
    };

    var removeAllValidaity = function() {
        $fields.removeClass('valid').removeClass('invalid');
    };

    var removeValidaityView = function(e) {
        $(e.target).parent().removeClass('valid').removeClass('invalid');
    };

    $fields.on('keydown', removeValidaityView);
    $contactForm.submit(checkFields);
};


$(document).ready(function() {
    setupTabHandlers();
    setupContactClassHandler();
    contactSubmitHandler();
});

