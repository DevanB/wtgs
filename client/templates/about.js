Template.about.onCreated(function(){
  this.subscribe('about-page');
});

Template.about.onRendered(function(){
  Meteor.call("pageviewIncrement", "about", function(error, result) {
    if (error) {
      console.log(error.reason);
    } else {
      return;
    }
  });
});

Template.about.helpers({
  page: function() {
    return Pages.findOne();
  }
});
