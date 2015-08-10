Template.analyticsList.onCreated(function(){
  this.subscribe('all-analytics')
});

Template.analyticsList.helpers({
  analytics: function() {
    return Analytics.find();
  }
});
