
// var jobsHandle = Meteor.subscribe('jobs', function () {
//     Jobs.find({admin: this.userId}, {fields: {secretInfo: 1}});
// });
// console.log(jobsHandle.ready());
////////// Lists //////////
Template.jobs_list.helpers({
  jobs: function () {
    return Jobs.find({owner: Meteor.userId()});
  },
  count: function () {
    return Jobs.find({owner: Meteor.userId()}).count();
  }
})
Template.jobs_list.events({
  'click .deleteJob': function (evt, tpl) {
    console.log(this._id)
    Jobs.remove(this._id)
  },
  'click .editJob': function (evt, tpl) {
    Session.set('editing_job', this._id);
    
    Router.go('/job/' + this._id + '/edit');
  }
});

Template.addJob.events({
  'submit #add-job-form': function (evt, tpl) { // select list
    var title = document.getElementById('addJobTitle').value;
    var cur = Jobs.insert({
      owner: Meteor.userId(),
      title: title
    })
    Session.set('job_view', cur);
    Router.go('/job/' + cur + '/overview');
    // Don't really submit.
    return false;
  }
});

Template.job.helpers({
  editing: function () {
    return Session.get('editing_job') === this._id;
  },
  adding_command: function () {
    return Session.get('adding_command') === this._id;
  },
  job_title: function () {
    return this.job.title;
  },
  commands: function () {
    return this.commands;
  },
  commandsCount: function () {
    return this.commandsCount;
  }


});

Template.job.events({
  'submit .add-command': function (evt, tpl) {
    // TODO in commands file
    var name = $(tpl.find('.command-title')).val();
    var body = $(tpl.find('.command-value')).val();
    Commands.insert({
      name: name,
      body: body,
      owner: Meteor.userId(),
      parent_job: this.job._id
    })

    return false;
  }
});
Template.job_sidebar.helpers({
  viewing: function () {
    // Session.set('job_conf', null);
    return Session.get('job_view');
  }
});

Template.job_sidebar.events({
  // 'click #jconf': function (evt, tpl) { // select list
  //   var $link = $(evt.target);
  //   var attr = $link.attr('data-target');
  //   Session.set('job_conf', attr);
  //   $('.list-group-item').removeClass('active');
  //   $link.toggleClass('active');
  // },
  // 'click #jbuild': function (evt, tpl) { // select list
  //   var $link = $(evt.target)
  //   var attr = $link.attr('data-target');
  //   Session.set('job_build', attr);
  //   $('.list-group-item').removeClass('active');
  //   $link.toggleClass('active');
  // },
  // 'click #jview': function (evt, tpl) { // select list
  //   var $link = $(evt.target)
  //   var attr = $link.attr('data-target');
  //   Session.set('job_conf', null);
  //   Session.set('job_view', attr);
  //   $('.list-group-item').removeClass('active');
  //   $link.toggleClass('active');
  // }
});