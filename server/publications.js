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

Meteor.publish('today-analytics', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Analytics.find({ "date": moment().format('MM DD YYYY'), "path": "map"}, {"pageCount": 1});
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

Meteor.publish('all-markers', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Markers.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('all-reviews', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Reviews.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('map-icons', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return MapIcons.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('find-type', function(id){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    check(id, String);
    return Types.find({"_id": id});
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('all-types', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Types.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('find-map-icon', function(id){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    check(id, String);
    return MapIcons.find({"_id": id});
  } else {
    this.stop();
    return;
  }
});
