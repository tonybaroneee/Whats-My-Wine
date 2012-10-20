$(function () {

  /******************************************/
  /* HTML Templates                         */
  /******************************************/

  var wineResultsHeader = '<h2 class="results-header">Hooray! We\'ve found some wines just for you:</h2>';
  var wineNoResultsHeader = '<h2 class="results-header">Sorry, we couldn\'t find any wines that match your choices.</h2>';
  var wineRow = '<div class="container well">' +
                  '<img class="bottle-img img-polaroid">' +
                  '<div class="wine-info-box">' +
                    '<h1 class="wine-price"></h1>' +
                    '<h3 class="wine-title"></h3>' +
                    '<h5 class="wine-location"></h5>' +
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

  /******************************************/
  /* Initializations and Event Listeners    */
  /******************************************/

  $('#getstarted, #nav-wine-search').on('click', function(e) {
    e.preventDefault();
    goToByScroll("search-start");
  });

  $('.price-btn').on('click', function(e) {
    var $this = $(this);
    $('.price-btn').removeClass('btn-success');
    $('.price-text').removeClass('chosen');
    $this.addClass('btn-success');
    $this.siblings('.price-text').addClass('chosen');
  });

  $('#submitsearch').on('click', function(e) {
    e.preventDefault();
    $(this).fadeOut();

    var wineList = $('#wine-list');
    wineList.empty();

    $.getJSON('/getwinelist', {
      price : $('.price-btn.active').val() || ''
    }, function(data) {
      console.log(data)
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
            .html('<i class="icon-globe"></i> ' + wine.location);

          wineList.append(wineRowHTML.get(0).outerHTML);
        }
      }
      wineList.append(resetBtn);
      wineList.fadeIn(function() {
        goToByScroll('wine-list');
      });
    });
  });

  $('#wine-list').on('click', '#resetsearch', function(e) {
    e.preventDefault();
    goToByScroll("search-start");
    $('#wine-list').fadeOut('fast', function() {
      $('#submitsearch').fadeIn('fast');
    });
  });

  $('#back-to-top').on('click', function(e) {
    e.preventDefault();
    goToByScroll('');
  });

});