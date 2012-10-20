$(function () {

  // Hide the address bar in mobile safari (iOS5)
  if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
    setTimeout(function(){
      window.scrollTo(0, 1);
    }, 1000);
  }

  // Initialize the qTip tooltip plugin, but dont bother if it's a mobile/touchscreen device
  if (!navigator.userAgent.match(/Android/i) &&
    !navigator.userAgent.match(/webOS/i) &&
    !navigator.userAgent.match(/iPhone/i) &&
    !navigator.userAgent.match(/iPod/i) &&
    !navigator.userAgent.match(/iPad/i) &&
    !navigator.userAgent.match(/Blackberry/i)) {
    // Mobile browser not detected, enable tooltips
    $('body').tooltip({
      selector: '[rel=tooltip]'
    });
  }

  /******************************************/
  /* HTML Templates                         */
  /******************************************/

  var wineResultsHeader = '<div id="wine-list-header-container" class="container"><h2 class="results-header">Hooray! We\'ve found some wines just for you:</h2><a id="back-to-search" style="float:right" href="#">Modify your search</a></div>';
  var wineNoResultsHeader = '<div id="wine-list-header-container" class="container"><h2 class="results-header">Sorry, we couldn\'t find any wines that match your choices.</h2><a id="back-to-search" style="float:right" href="#">Modify your search</a><div>';
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
  var resetBtn = '<div class="container" style="text-align:center;"><button id="resetsearch" class="btn btn-primary btn-large bigbutton">Start A New Search</button></div>';

  /******************************************/
  /* Global Helper Functions                */
  /******************************************/

  function goToByScroll(id) {
    if (id === '') {
      $('html,body').animate({scrollTop: 0}, 'fast');
    } else {
      $('html,body').animate({scrollTop: $("#"+id).offset().top - 41});
    }
  }

  function swapChoice(button, categoryName) {
    $('.'+categoryName+'-btn').removeClass('btn-success');
    $('.'+categoryName+'-text').removeClass('chosen');
    $('.'+categoryName+'-caption').removeClass('chosen');
    button.addClass('btn-success');
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

  $('.price-btn').on('click', function(e) {
    var $this = $(this);
    swapChoice($this, 'price');
  });

  $('.style-btn').on('click', function(e) {
    var $this = $(this);
    swapChoice($this, 'style');
  });

  $('#submitsearch').on('click', function(e) {
    e.preventDefault();

    var wineList = $('#wine-list');
    wineList.empty();

    $.getJSON('/getwinelist', {
      price : $('.price-btn.active').val() || '',
      style : $('.style-btn.active').val() || ''
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
      wineList.append(resetBtn);
      if (wineList.is(':hidden')) {
        wineList.fadeIn(function() {
          goToByScroll('wine-list');
        });
      } else {
        goToByScroll('wine-list');
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