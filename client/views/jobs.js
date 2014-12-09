////////// Lists //////////
Template.jobs_list.helpers({
  jobs: function () {
    return Jobs.find({owner: Meteor.userId()});
  }
})

Template.addJob.events({
  'submit #add-job-form': function (evt, tpl) { // select list
    // Router.setList(this._id);
    // Session.set('listname', this._name);
    var title = document.getElementById('addJobTitle').value;
    var cur = Jobs.insert({
      owner: Meteor.userId(),
      title: title
    })
    Session.set('job_view', cur);
    Router.go('/job/' + cur);
    // Don't really submit.
    return false;
  }
});

Template.job.helpers({
  editing: function () {
    // Session.set('job_view', null);
    return Session.get('job_conf') === this._id;
  }
});

Template.job_sidebar.helpers({
  viewing: function () {
    // Session.set('job_conf', null);
    return Session.get('job_view');
  }
});

Template.job_sidebar.events({
  'click #jconf': function (evt, tpl) { // select list
    var $link = $(evt.target);
    var attr = $link.attr('data-target');
    Session.set('job_conf', attr);
    $('.list-group-item').removeClass('active');
    $link.toggleClass('active');
  },
  'click #jbuild': function (evt, tpl) { // select list
    var $link = $(evt.target)
    var attr = $link.attr('data-target');
    Session.set('job_build', attr);
    $('.list-group-item').removeClass('active');
    $link.toggleClass('active');
  },
  'click #jview': function (evt, tpl) { // select list
    var $link = $(evt.target)
    var attr = $link.attr('data-target');
    Session.set('job_conf', null);
    Session.set('job_view', attr);
    $('.list-group-item').removeClass('active');
    $link.toggleClass('active');
  }
});