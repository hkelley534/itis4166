$( document ).ready(()=>{
  console.log( "ready!" );
  buildMobileNav();
});

buildMobileNav = () => {
  // Hides mobile navigation menu
  $("#mobileNav").hide();
  $("#navClose").hide();
  
  // Toggles mobile navigation and buttons on click
  $(".nav-button").click((event)=>{
    $("#mobileNav").toggle();
    $(".nav-button").toggle();
  });
};

// TODO toggle password visibility onclick
togglePassword = () => {

}

closeErr = () => {
  $(".error").hide();
}

closeSuc = () => {
  $(".success").hide();
}

