if (Meteor.isServer) {
  var Future = Npm.require('fibers/future');

  Meteor.methods({

    cmd: function (command) {
      var explode = command.split(' ');
      var cmd = explode[0];
      var args = explode.splice(1, explode.length);
      console.log("e:"+cmd+JSON.stringify(args));

      var fut = new Future();

      var spawn = Npm.require('child_process').spawn;
      if (args.length == 0)
        ls    = spawn(cmd);
      else
        ls    = spawn(cmd , args);

      ls.stdout.on('data', function (data) {
        console.log(''+data);
        fut['return'](''+data);
      });

      ls.stderr.on('data', function (data) {
        console.log(''+data);
        fut['return'](''+data);
      });

      return fut.wait();
    }
  });
} // end server