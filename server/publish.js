Meteor.publish('jobs-per-user', function(){
    return Jobs.find({owner: this.userId});
});

Meteor.publish('commands-per-job', function(jobId){
    return Commands.find(); //TODO
});

Jobs.allow({
  insert: function (userId, job) {
  	if (userId)
    return true;
  }
});
Commands.allow({
  insert: function (userId, command) {
  	if (userId)
    return true;
  }
});