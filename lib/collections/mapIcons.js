MapIcons = new Mongo.Collection('map-icons');

Meteor.methods({
  mapIconCreate: function(mapIconAttributes){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(Meteor.userId(), String);
    check(mapIconAttributes, Object);
    check(mapIconAttributes, {
      type: NonEmptyString
    });

    var mapIconWithSameValues = MapIcons.findOne({
      type: mapIconAttributes.type,
    });
    if (mapIconWithSameValues) {
      return {
        mapIconExists: true,
        _id: mapIconWithSameValues._id
      }
    }

    var user = Meteor.user();
    var mapIcon = _.extend(mapIconAttributes, {
      createdAt: new Date(),
      createdBy: user._id
    });

    var mapIconId = MapIcons.insert(mapIcon);

    return {
      _id: mapIconId
    };
  },
  mapIconUpdate: function(mapIconAttributes){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(Meteor.userId(), String);
    check(mapIconAttributes, Object);
    check(mapIconAttributes, {
      _id: String,
      type: NonEmptyString
    });

    var user = Meteor.user();
    var mapIcon = _.extend(mapIconAttributes, {
      updatedAt: new Date(),
      updatedBy: user._id
    });

    var mapIconId = mapIconAttributes._id;
    delete mapIconAttributes._id;

    try {
			var mapIconId = MapIcons.update(mapIconId, {
				$set: mapIcon
			});
			return mapIconId;
		} catch(exception) {
			console.log("exception in mapIconUpdate");
      console.dir(exception);
			return exception;
		}
  }
});
