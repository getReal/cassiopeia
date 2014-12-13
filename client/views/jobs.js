
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
    return Session.equals('editing_job', this.job._id);
  },
  adding_command: function () {
    return Session.equals('adding_command', this.job._id);
  },
  job_title: function () {
    return this.job.title;
  },
  commands: function () {
    return this.commands;
  },
  commandsCount: function () {
    return this.commands.count();
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
  },
  'click .deleteJob': function (evt, tpl) {
    Jobs.remove(this.job._id)
  },
  'click .editJob': function (evt, tpl) {
    Router.go('/job/' + this.job._id + '/edit');
  }
  // ,
  // 'click .deleteCommand': function (evt, tpl) {
  //   Jobs.remove(this.job._id)
  // },
  // 'click .editCommand': function (evt, tpl) {
  //   alert()
  //   Router.go('/job/' + this.job._id + '/edit');
  // }
});
Template.job_sidebar.helpers({
  id: function () {
    return this;
  }
});
