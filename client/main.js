Meteor.startup(function () {
    if ((!Session.get('userLat')) && (!Session.get('userLon'))) {
        if (navigator.geolocation) {
            Tracker.autorun(function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    Session.set('location', {latitude: position.coords.latitude, longitude: position.coords.longitude});
                }, function (error) {
                    console.dir(error); //@TODO: Handle geolocation error
                });
            });
        } else {
            handleNoGeolocation(true); //@TODO: Write function to prompt for location
        }
    }
});
function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        //Geolocation failed.
    } else {
        //Browser doesn't support geolocation.
    }
}