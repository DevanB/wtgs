Template.users.onCreated(function(){
  this.subscribe('all-users');
});

Template.users.helpers({
  users: function() {
    return Meteor.users.find();
  }
});
