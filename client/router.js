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
  yieldRegions: {
    'sidebar': {to: 'aside'}
  },
  action: function () {
    // render all templates and regions for this route
    Session.set('job_conf', null);
    Session.set('job_view', null);
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

Router.route('/dashboard/config', {
  yieldRegions: {
    'sidebar': {to: 'aside'}
  },
  action: function () {
    // render all templates and regions for this route
    this.render('globalConf');
    this.render('sidebar', {to: 'aside'});
  }
});

Router.route('/job/:_id', {
  // yieldRegions: {
  //   'sidebar': {to: 'aside'}
  // },
  action: function () {
    Session.set('job_view', this.params._id);
    // var $this = this;
    this.render('job', {
      data: {
        job: Jobs.findOne({_id: this.params._id}),
        commands: Commands.find({parent_job: this.params._id})
      }
    });
    this.render('job_sidebar', {to: 'aside'});
  }
});