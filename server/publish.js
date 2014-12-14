Meteor.publish('jobs-per-user', function(){
    return Jobs.find({owner: this.userId});
});

Meteor.publish('commands-per-job', function(jobId){
    return Commands.find(); //TODO
});

Jobs.allow({
	insert: function (userId, job) {
		return (job.owner === userId)
	},
	update:function(userId, doc, fields, modifier){
		return (doc.owner === userId);
	},
	remove:function(userId, doc){
		return (doc.owner === userId);
	},
});
Commands.allow({
  insert: function (userId, command) {
  	if (userId)
    return true;
  }
});