Meteor.startup(function () {
    if ((!Session.get('userLat')) && (!Session.get('userLon'))) {
        navigator.geolocation.getCurrentPosition(function (position) {
            Session.set('userLat', position.coords.latitude);
            Session.set('userLon', position.coords.longitude);
        });
    }

    GoogleMaps.load();
});