Jobs = new Mongo.Collection('jobs');

Jobs.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  // Router.go('/job/' + doc._id);
});

Jobs.after.insert(function (userId, doc) {

});