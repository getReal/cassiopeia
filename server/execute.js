if (Meteor.isServer) {

  Meteor.methods({
    cmd: function (commands) {
      var fut = new Future();
      var spawn, ls, answerBuffer;

      _.each(commands, function(el){
        var fut = new Future();
        console.log(el);
        exec = Npm.require('child_process').exec;
        // if (args.length == 0)
        ls = exec(el.body);
        // fut['return']('** Executing' + el.name);
        // else
        //   ls    = spawn(cmd , args);
        answerBuffer += 'Executing' + el.name;

        ls.stdout.on('data', function (data) {
          console.log(''+data);
          answerBuffer += data;
          // fut['return'](''+data);
        });

        ls.stderr.on('data', function (data) {
          console.log(''+data);
          answerBuffer += data;
          // fut['return'](''+data);
        });
        ls.on('close', function (code) {
          console.log(''+code);
          answerBuffer += 'child process exited with code ' + code;
          fut['return'](''+answerBuffer);
        });
      })
      // var explode = commands.split(' ');
      // var cmd = explode[0];
      // var args = explode.splice(1, explode.length);
      // console.log("e:"+cmd+JSON.stringify(args));


      return fut.wait();
    },
    parallelAsyncJob: function(commands) {
      var Future = Npm.require('fibers/future'); 
      var urls = [];
      // var arrayLength = message.length;
      // for (var i = 0; i < arrayLength; i++) {

      // }
      _.each(commands, function(el){
        urls.push(el.body);
      })    
      

      var futures = _.map(urls, function(url) {
        var future = new Future();
        var onComplete = future.resolver();
        var answerBuffer;
        // /// Make async http call
        // Meteor.http.get(url, function(error, result) {
        //   console.log(result)
        //   // Get the title if there was no error
        //   var title = (!error) && 'result';

        //   onComplete(error, title);
        // });
        answerBuffer += 'Executing' + url;
        exec = Npm.require('child_process').exec;
        // if (args.length == 0)
        ls = exec(url);
        ls.stdout.on('data', function (data) {
          console.log(''+data);
          answerBuffer += data;
          console.log(answerBuffer);
          // fut['return'](''+data);
          onComplete(data, answerBuffer);
        });

        ls.stderr.on('data', function (data) {
          console.log(''+data);
          answerBuffer += data;
          // fut['return'](''+data);
          onComplete(data, answerBuffer);
        });
        return future;
      });

      // wait for all futures to finish
      Future.wait(futures);

      // and grab the results out.
      return _.invoke(futures, 'get'); 
    }
  });
} // end server