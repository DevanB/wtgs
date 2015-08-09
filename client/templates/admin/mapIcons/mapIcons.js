Template.mapIcons.onCreated(function(){
  this.subscribe('map-icons');
});

Template.mapIcons.helpers({
  mapIcons: function(){
    return MapIcons.find();
  }
});
