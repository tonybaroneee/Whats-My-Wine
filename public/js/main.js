$(function () {

  /******************************************/
  /* Global Helper Functions                */
  /******************************************/

  function goToByScroll(id) {
    $('html,body').animate({scrollTop: $("#"+id).offset().top});
  }

  /******************************************/
  /* Initializations and Event Listeners    */
  /******************************************/

  $('#getstarted, #nav-wine-search').on('click', function(e) {
    e.preventDefault();
    goToByScroll("search-start");
  });

});