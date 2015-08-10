Template.createMarker.onCreated(function(){
  this.subscribe("all-types");
  this.subscribe("all-map-icons");
});

Template.createMarker.helpers({
  types: function(){
    return Types.find();
  },
  mapIcons: function(){
    return MapIcons.find();
  }
});

Template.createMarker.events({
  'submit form': function(e) {
    e.preventDefault();

    var marker = {
      name: e.target.name.value,
      latitude: e.target.latitude.value,
      longitude: e.target.longitude.value,
      mapIconType: e.target.mapIconType.value,
      type: e.target.type.value,
      street: e.target.street.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zipCode: e.target.zipCode.value,
      description: e.target.description.value,
      url: e.target.url.value,
      adminNotes: e.target.adminNotes.value,
      tags: e.target.tags.value,
      needsReview: e.target.needsReview.checked
      // photo: e.target.photo.value
    };

    Meteor.call('markerCreate', marker, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      if (result.markerExists) {
        return throwError('This marker already exists');
      }

      Router.go('markers');
    });
  }
});
