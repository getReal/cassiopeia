////////// Lists //////////
Template.jobs_list.helpers({
  jobs: function () {
    return Jobs.find({owner: Meteor.userId()});
  },
  selected: function () {
  return Session.equals('job_id', this._id) ? 'active' : '';
  },
  // name_class: function () {
  //   return this.name ? '' : 'empty';
  // },
  // tems_count: function () {
  //   return Todos.find({list_id:this._id}).count();
  // },
  editing: function () {
    return Session.equals('adding_job', this._id);
  },
  adding: function () {
    return Session.equals('editing_job', this._id);
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

    Router.go('/job/' + cur);
    // Don't really submit.
    return false;
  }
});