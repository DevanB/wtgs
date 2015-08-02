Meteor.startup(function () {
    Roles.addUsersToRoles(
      Meteor.users.find({$or: [ {"emails.address": "devan@wheretogoscouting.org"}, {"emails.address": "chris@wheretogoscouting.org"} ]}, { "_id":1 })
      .map(function (user) { console.log(user._id); return user._id; }), ["admin"]);
});
