Template.applayout.rendered = function () {
  $('[data-toggle="offcanvas"]').click(function (e) {
    $('.row-offcanvas').toggleClass('active')
  });
};