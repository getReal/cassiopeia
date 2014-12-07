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
  // data: function () {
  //   return Jobs.find({owner: Meteor.userId()});
  // },

  // A declarative way of providing templates for each yield region
  // in the layout
  yieldRegions: {
    'sidebar': {to: 'aside'}
  },  
  action: function () {
    // render all templates and regions for this route
    this.render();
  }
});

Router.route('/dashboard/add', {
  yieldRegions: {
    'sidebar': {to: 'aside'}
  },  
  action: function () {
    // render all templates and regions for this route
    this.render('addJob');
    this.render('sidebar', {to: 'aside'});
  }
});

Router.route('/job/:_id', {
  // yieldRegions: {
  //   'sidebar': {to: 'aside'}
  // },  
  action: function () {
    this.render('job', {
      data: function () {
        return Jobs.findOne({_id: this.params._id});
      }
    });
    this.render('job_sidebar', {to: 'aside'});
  }
});