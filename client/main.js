Meteor.startup(function () {
    if ((!Session.get('userLat')) && (!Session.get('userLon'))) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                Session.set('location', {latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, function (error) {
                handleNoGeolocation(true);
            });
        } else {
            handleNoGeolocation(true);
        }
    }
});

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        //@TODO: Prompt user to enter zip code or address
        $('#searchModal').modal();
    }
}