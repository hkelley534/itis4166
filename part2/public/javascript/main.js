$( document ).ready(function() {
  console.log( "ready!" );
  buildMobileNav();
});

function buildMobileNav() {
  // Hides mobile navigation menu
  $("#mobileNav").hide();
  $("#navClose").hide();
  
  // Toggles mobile navigation and buttons on click
  $(".nav-button").click((event)=>{
    $("#mobileNav").toggle();
    $(".nav-button").toggle();
  });
};