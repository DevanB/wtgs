Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('page', function(id){
  check(id, String);
  return Pages.find({"_id": id});
});

Meteor.publish('find-page', function(title){
  check(title, String);
  return Pages.find({"title": title});
});

Meteor.publish('analytics', function(){
  return Analytics.find();
});
