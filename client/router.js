Router.configure({
	layoutTemplate: 'applayout',
	notFoundTemplate: 'notFound',
  // yieldTemplates: {}
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      this.layout('homelayout');
      this.render('home');
      this.redirect('/');
      // this.go('home');
    } else {
      // this.go('dashboard');
      this.next();

    }
  }
});
