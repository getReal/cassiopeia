Commands = new Mongo.Collection('commands');

Commands.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});