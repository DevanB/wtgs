Template.stats.onCreated(function(){
  this.subscribe('all-users');
  this.subscribe('today-analytics');
  this.subscribe('all-markers');
  this.subscribe('all-reviews');
});

Template.stats.helpers({
  userCount: function() {
    return Meteor.users.find().count();
  },
  pageViews: function() {
    return Analytics.findOne().pageCount;
  },
  markerCount: function() {
    return Markers.find().count();
  },
  reviewCount: function() {
    return Reviews.find().count();
  }
});
