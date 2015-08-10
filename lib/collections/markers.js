Markers = new Mongo.Collection('markers');

Meteor.methods({
  markerCreate: function(markerAttributes){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(markerAttributes.name, NonEmptyString);
    check(markerAttributes.latitude, NonEmptyString);
    check(markerAttributes.longitude, NonEmptyString);
    markerAttributes.tags = markerAttributes.tags.split(',');

    markerAttributes.coords = [
      parseFloat(markerAttributes.longitude),
      parseFloat(markerAttributes.latitude)
    ];
    delete markerAttributes.latitude;
    delete markerAttributes.longitude;

    check(Meteor.userId(), String);
    check(markerAttributes, Object);
    check(markerAttributes, {
      name: String,
      coords: [Number],
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
      needsReview: Match.Optional(Boolean),
      photo: Match.Optional(String)
    });

    var markerWithSameValues = Markers.findOne({
      name: markerAttributes.name,
      coords: markerAttributes.coords
    });
    if (markerWithSameValues) {
      return {
        markerExists: true,
        _id: markerWithSameValues._id
      }
    }

    var user = Meteor.user();
    var marker = _.extend(markerAttributes, {
      createdAt: new Date(),
      createdBy: user._id
    });

    var markerId = Markers.insert(marker);

    return {
      _id: markerId
    };
  },
  markerUpdate: function(markerAttributes){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(markerAttributes.name, NonEmptyString);
    check(markerAttributes.latitude, NonEmptyString);
    check(markerAttributes.longitude, NonEmptyString);
    markerAttributes.tags = markerAttributes.tags.split(',');

    markerAttributes.coords = [
      parseFloat(markerAttributes.longitude),
      parseFloat(markerAttributes.latitude)
    ];
    delete markerAttributes.latitude;
    delete markerAttributes.longitude;

    check(Meteor.userId(), String);
    check(markerAttributes, Object);
    check(markerAttributes, {
      _id: String,
      name: String,
      coords: [Number],
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
      needsReview: Match.Optional(Boolean),
      photo: Match.Optional(String)
    });

    var user = Meteor.user();
    var marker = _.extend(markerAttributes, {
      updatedAt: new Date(),
      updatedBy: user._id
    });

    var markerId = markerAttributes._id;
    delete markerAttributes._id;

    try {
			var savedMarker = Markers.update(markerId, {
				$set: marker
			});
			return savedMarker;
		} catch(exception) {
			console.log("exception in mapIconUpdate");
      console.dir(exception);
			return exception;
		}
  }
});
