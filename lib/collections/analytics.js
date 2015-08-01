Analytics = new Mongo.Collection('analytics');

Meteor.methods({
  pageviewIncrement: function(path){
    check(path, String);

    var path = path;
    var date = moment().format('MM DD YYYY');

    var pathExists = Analytics.findOne({ "path": path, "date": date});
    console.dir(pathExists);

    try {
      if (_.isUndefined(pathExists)) {
        var analyticId = Analytics.insert({ "path": path, "date": date, "pageCount": 1});
        return analyticId;
      } else {
        var analyticId = Analytics.update( {"path": path, "date": date}, { $set: { path: path, date: date }, $inc: { pageCount : 1 } }, { upsert: true } );
        return analyticId;
      }
    } catch (exception) {
      return exception;
    }
  }
});
