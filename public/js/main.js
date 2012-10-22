$(function () {

  // Initialize the qTip tooltip plugin, but dont bother if it's a mobile/touchscreen device
  // if (!navigator.userAgent.match(/Android/i) &&
  //   !navigator.userAgent.match(/webOS/i) &&
  //   !navigator.userAgent.match(/iPhone/i) &&
  //   !navigator.userAgent.match(/iPod/i) &&
  //   !navigator.userAgent.match(/iPad/i) &&
  //   !navigator.userAgent.match(/Blackberry/i)) {
  //   // Mobile browser not detected, enable tooltips
  //   $('body').tooltip({
  //     selector: '[rel=tooltip]'
  //   });
  // }

  /******************************************/
  /* HTML Templates                         */
  /******************************************/

  var wineResultsHeader = '<hr class="soften"><div id="wine-list-header-container" class="container"><h2 class="results-header">Hooray! We\'ve found some wines just for you:</h2><a id="back-to-search" style="float:right" href="#">Modify search</a></div>';
  var wineNoResultsHeader = '<hr class="soften"><div id="wine-list-header-container" class="container"><h2 class="results-header">Sorry, we couldn\'t find any wines that match your choices.</h2><a id="back-to-search" style="float:right" href="#">Modify search</a><div>';
  var wineRow = '<div class="container well">' +
                  '<div class="bottle-img-container"><img class="bottle-img img-polaroid"></div>' +
                  '<div class="wine-info-box">' +
                    '<h1 class="wine-price"></h1>' +
                    '<h4 class="wine-alc"></h4>' +
                    '<h3 class="wine-title"></h3>' +
                    '<h5 class="wine-location"></h5>' +
                    '<h5 class="wine-type"></h5><hr class="soften wine-row-line"></hr>' +
                    '<p class="wine-desc"></p>' +
                  '</div>' +
                '</div>';
  var resetBtn = '<div class="container" style="text-align:center;"><button id="resetsearch" class="btn btn-info btn-large bigbutton">Start A New Search</button></div>';

  /******************************************/
  /* Global Helper Functions                */
  /******************************************/

  function goToByScroll(id) {
    var extra = 0;
    if (!navigator.userAgent.match(/Android/i) &&
      !navigator.userAgent.match(/webOS/i) &&
      !navigator.userAgent.match(/iPhone/i) &&
      !navigator.userAgent.match(/iPod/i) &&
      !navigator.userAgent.match(/iPad/i) &&
      !navigator.userAgent.match(/Blackberry/i)) {
      // Mobile browser not detected, enable tooltips
      extra = $('.navbar').height();
    }
    if (id === '') {
      $(jQuery.browser.webkit ? 'body': 'html').animate({scrollTop: 0}, 'fast');
    } else {
      $(jQuery.browser.webkit ? 'body': 'html').animate({scrollTop: $("#"+id).offset().top - extra});
    }
  }

  function swapChoice(button, categoryName) {
    $('.'+categoryName+'-btn').removeClass('btn-info');
    $('.'+categoryName+'-text').removeClass('chosen');
    $('.'+categoryName+'-caption').removeClass('chosen');
    button.addClass('btn-info');
    button.siblings('.'+categoryName+'-text').addClass('chosen');
    button.siblings('.'+categoryName+'-caption').addClass('chosen');
  }

  /******************************************/
  /* Initializations and Event Listeners    */
  /******************************************/

  $('#getstarted, #nav-wine-search').on('click', function(e) {
    e.preventDefault();
    goToByScroll("search-start");
  });

  $("#search-start").on({
    mouseenter: function() {
      $(this).siblings('h2').css('font-weight', 'bold');
    },
    mouseleave: function() {
      $(this).siblings('h2').css('font-weight', '');
    }
  }, 'button');

  $('.price-btn').on('click', function(e) {
    var $this = $(this);
    swapChoice($this, 'price');
    setTimeout(function(){goToByScroll('top-style')},300);;
  });

  $('.style-btn').on('click', function(e) {
    var $this = $(this);
    swapChoice($this, 'style');
    setTimeout(function(){goToByScroll('top-color')},300);
  });

  $('.type-btn').on('click', function(e) {
    var $this = $(this);
    swapChoice($this, 'type');
  });

  $('#submitsearch').on('click', function(e) {
    e.preventDefault();

    $('#loading-text').show();
    var wineList = $('#wine-list');
    wineList.empty();

    $.getJSON('/getwinelist', {
      price : $('.price-btn.active').val() || '',
      style : $('.style-btn.active').val() || '',
      type : $('.type-btn.active').val() || ''
    }, function(data) {
      if (data.length > 0) {
        wineList.append(wineResultsHeader)
      } else {
        wineList.append(wineNoResultsHeader)
      }
      for(var i = 0; i <= data.length; i++) {
        var wine = data[i];
        if (wine) {
          var wineRowHTML = $(wineRow);
          wineRowHTML.find('.bottle-img')
            .attr('src', '/public/img/wines/' + wine.image)
            .attr('alt', wine.image)
            .end()
          .find('.wine-title')
            .text(wine.name)
            .end()
          .find('.wine-price')
            .text('$' + wine.price)
            .end()
          .find('.wine-location')
            .html('<i class="icon-globe"></i> ' + wine.location)
            .end()
          .find('.wine-type')
            .html('<i class="icon-glass"></i> ' + wine.type)
            .end()
          .find('.wine-alc')
            .text(wine.alc + '% alc.')
            .end()
          .find('.wine-desc')
            .text(wine.description);

          wineList.append(wineRowHTML.get(0).outerHTML);
        }
      }
      if (data.length > 0) {
        wineList.append(resetBtn)
      }
      $('#loading-text').hide();
      if (wineList.is(':hidden')) {
        wineList.fadeIn(function() {
          goToByScroll('wine-list-header-container');
        });
      } else {
        goToByScroll('wine-list-header-container');
      }
    });
  });

  $('#wine-list').on('click', '#back-to-search', function(e) {
    e.preventDefault();
    goToByScroll('search-start');
  });

  $('#wine-list').on('click', '#resetsearch', function(e) {
    e.preventDefault();
    goToByScroll("search-start");
    $('#wine-list').fadeOut('fast', function() {
    });
  });

  $('#back-to-top').on('click', function(e) {
    e.preventDefault();
    goToByScroll('');
  });

});