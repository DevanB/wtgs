Meteor.publish('find-page', function(title){
  check(title, String);
  return Pages.find({"title": title});
});

Meteor.publish('pages', function() {
  if (Roles.userIsInRole(this.userId, ['admin'])){
    return Pages.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('page', function(id){
  if (Roles.userIsInRole(this.userId, ['admin'])){
    check(id, String);
    return Pages.find({"_id": id});
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('analytics', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])){
    return Analytics.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('all-users', function() {
  if (Roles.userIsInRole(this.userId, ['admin'])){
    return Meteor.users.find();
  } else {
    this.stop();
    return;
  }
});
