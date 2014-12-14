Router.map(function() {
  this.route('/', {
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

  this.route('/dashboard', {
    yieldRegions: {
      'sidebar': {to: 'aside'}
    },
    action: function () {
      // render all templates and regions for this route
      Session.set('editing_job', null);
      Session.set('job_view', null);
      this.render();
    }
  });

  this.route('/dashboard/add', {
    yieldRegions: {
      'sidebar': {to: 'aside'}
    },
    action: function () {
      // render all templates and regions for this route
      this.render('addJob');
      this.render('sidebar', {to: 'aside'});
    }
  });

  this.route('/dashboard/config', {
    yieldRegions: {
      'sidebar': {to: 'aside'}
    },
    action: function () {
      // render all templates and regions for this route
      this.render('globalConf');
      this.render('sidebar', {to: 'aside'});
    }
  });

  this.route('/job/:_id/overview', {
    // yieldRegions: {
    //   'sidebar': {to: 'aside'}
    // },
    action: function () {
      Session.set('job_view', this.params._id);
      Session.set('editing_job', null);
      // var $this = this;
      this.render('job', {
        data: {
          job: Jobs.findOne({_id: this.params._id}),
          commands: Commands.find({parent_job: this.params._id})
        }
      });
      this.render('job_sidebar', {
        to: 'aside',
        data: this.params._id
      });
    }
  });

  this.route('/job/:_id/build', {
    action: function () {
      // var commands = Commands.find({parent_job: this.params._id}).fetch();
      // _.each(commands, function(el) {
      //   console.log(el)
      // })
      Session.set('job_building', this.params._id);
      Meteor.call('cmd', 'pwd', function (err, data) {
        Session.set('output', data );
      });
      // var $this = this;
      this.render('job_building', {
        data: function () {
          return Session.get('output');
        }
      });
      this.render('job_sidebar', {
        to: 'aside',
        data: this.params._id
      });
    },
    onAfterAction: function() {
      var commands = Commands.find({parent_job: this.params._id})

    }
  });

  this.route('/job/:_id/edit', {
    action: function () {
      Session.set('editing_job', this.params._id);
      // var $this = this;
      this.render('job', {
        data: {
          job: Jobs.findOne({_id: this.params._id}),
          commands: Commands.find({parent_job: this.params._id}),
          commandsCount: Commands.find({parent_job: this.params._id}).count()                           
        }
      });
      this.render('job_sidebar', {
        to: 'aside',
        data: this.params._id
      });
    }
  });
});