Template.markers.onCreated(function(){
  this.subscribe("all-markers");
});

Template.markers.helpers({
  markers: function() {
    return Markers.find();
  }
});
