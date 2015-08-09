Types = new Mongo.Collection('types');

Meteor.methods({
  typeCreate: function(typeAttributes){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(Meteor.userId(), String);
    check(typeAttributes, Object);
    check(typeAttributes, {
      type: NonEmptyString
    });

    var typeWithSameValues = Types.findOne({
      type: typeAttributes.type,
    });
    if (typeWithSameValues) {
      return {
        typeExists: true,
        _id: typeWithSameValues._id
      }
    }

    var user = Meteor.user();
    var type = _.extend(typeAttributes, {
      createdAt: new Date(),
      createdBy: user._id
    });

    var typeId = Types.insert(type);

    return {
      _id: typeId
    };
  },
  typeUpdate: function(typeAttributes){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

    NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(Meteor.userId(), String);
    check(typeAttributes, Object);
    check(typeAttributes, {
      _id: String,
      type: NonEmptyString
    });

    var user = Meteor.user();
    var type = _.extend(typeAttributes, {
      updatedAt: new Date(),
      updatedBy: user._id
    });

    var typeId = typeAttributes._id;
    delete typeAttributes._id;

    try {
			var typeId = Types.update(typeId, {
				$set: type
			});
			return typeId;
		} catch(exception) {
			console.log("exception in typeUpdate");
      console.dir(exception);
			return exception;
		}
  }
});
