Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('page', function(id){
  check(id, String);
  return Pages.find({"_id": id});
});

Meteor.publish('about-page', function(){
  return Pages.find({"title": "About-WTGS"});
});

Meteor.publish('analytics', function(){
  return Analytics.find();
});
