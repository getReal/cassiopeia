Replies = new Mongo.Collection('replies');


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to terminal.";
  };

  Template.hello.events({
    'click #button': function () {
      console.log("clicking");
      var cmd = $("input#command").val();
      console.log("command", cmd);
      var replyId = Meteor.call('command', cmd);
      Session.set('replyId', replyId);
    }
  });
}

if (Meteor.isServer) {
  exec = Npm.require('child_process').exec;
  Meteor.methods({
    'command' : function(line) {
      console.log("In command method", line);
      Fiber = Npm.require('fibers');
      exec(line, function(error, stdout, stderr) {
        console.log('Command Method', error, stdout, stderr);
        Fiber(function() {
          Replies.remove({});
          var replyId = Replies.insert({message: stdout ? stdout : stderr});
          return replyId;  
        }).run();
      }); 
    }
  });
}