Meteor.startup(function () {
  L.GeoIP.getPosition('', function(data){
    Session.set('location', data);
  });
});
