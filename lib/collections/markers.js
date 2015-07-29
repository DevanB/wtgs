Markers = new Mongo.Collection('markers');

Meteor.methods({
  markerCreate: function(markerAttributes){

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(markerAttributes.name, NonEmptyString);
    check(markerAttributes.latitude, NonEmptyString);
    check(markerAttributes.longitude, NonEmptyString);
    markerAttributes.latitude = parseFloat(markerAttributes.latitude);
    markerAttributes.longitude = parseFloat(markerAttributes.longitude);
    markerAttributes.tags = markerAttributes.tags.split(',');

    check(Meteor.userId(), String);
    check(markerAttributes, Object);
    check(markerAttributes, {
      name: String,
      latitude: Number,
      longitude: Number,
      mapIconType: Match.Optional(String),
      type: Match.Optional(String),
      street: Match.Optional(String),
      city: Match.Optional(String),
      state: Match.Optional(String),
      zipCode: Match.Optional(String),
      description: Match.Optional(String),
      url: Match.Optional(String),
      adminNotes: Match.Optional(String),
      tags: Match.Optional([String]),
      needsReview: Match.Optional(String),
      photo: Match.Optional(String)
    });

    var markerWithSameValues = Markers.findOne({
      name: markerAttributes.name,
      latitude: markerAttributes.latitude,
      longitude: markerAttributes.longitude
    });
    if (markerWithSameValues) {
      return {
        markerExists: true,
        _id: markerWithSameValues._id
      }
    }

    var user = Meteor.user();
    var marker = _.extend(markerAttributes, {
      added: new Date(),
      addedBy: user._id
    });

    var markerId = Markers.insert(marker);

    return {
      _id: markerId
    };
  }
});
