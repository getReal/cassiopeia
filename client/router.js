Router.configure({
	layoutTemplate: 'applayout',
	notFoundTemplate: 'notFound'
});

Router.onAfterAction(function() {
  if (! Meteor.userId()) {
  	this.layout('homelayout');
    this.render('home');
    this.redirect('/');
    // this.go('home');
  } else {
  	// this.go('dashboard');
    this.next();

  }
});

Router.route('/', {
	onBeforeAction: function() {
	  if (! Meteor.userId()) {
	  	this.layout('homelayout');
	    this.render('home');
	    // this.go('home');
	  } else {
	  	this.redirect('dashboard');
	    // this.next();
	  }
	}

});

Router.route('/dashboard', {
  action: function () {
    // render all templates and regions for this route
    this.render();
  }
});