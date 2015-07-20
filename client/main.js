Meteor.startup(function () {
    if ((!Session.get('userLat')) && (!Session.get('userLon'))) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                Session.set('userLat', position.coords.latitude);
                Session.set('userLon', position.coords.longitude);
            }, function (error) {
                //@TODO: Respond to geolocation error
            });
        } else {
            handleNoGeolocation(true); //@TODO: Write function to prompt for location
        }
    }
    GoogleMaps.load();
});

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        //Geolocation failed.
    } else {
        //Browser doesn't support geolocation.
    }

}