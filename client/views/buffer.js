Template.job_building.helpers({
  output: function () {
    if (Session.get('output'))
      return Session.get('output');
    else
      return "nothing";
  }
})