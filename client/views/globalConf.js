Template.globalConf.helpers({
  name: function() {
  	console.log(Meteor.user().profile)
    return Meteor.user().profile.name;
  }
})