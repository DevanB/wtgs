Template.editMarker.onCreated(function(){
  this.subscribe('find-marker', Router.current().params._id);
  this.subscribe('all-map-icons');
  this.subscribe('all-types');
});

Template.editMarker.helpers({
  mapIcons: function() {
    return MapIcons.find();
  },
  types: function() {
    return Types.find();
  },
  marker: function() {
    return Markers.findOne();
  }
});

Template.editMarker.events({
  'submit form': function(e) {
    e.preventDefault();

    var marker = {
      _id: Router.current().params._id,
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

    Meteor.call('markerUpdate', marker, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('markers');
    });
  }
});
