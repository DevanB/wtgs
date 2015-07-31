Meteor.publish('markers', function () {
  return Markers.find();
});

Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('page', function(id){
  return Pages.findOne({"_id": id});
})
