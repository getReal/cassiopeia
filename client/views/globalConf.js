Template.globalConf.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
})