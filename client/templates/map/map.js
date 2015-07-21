Template.map.onCreated(function () {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    this.mapRendered = false;
});

Template.map.onRendered(function () {
    var currentLocationType = L.icon({
        iconUrl: 'TrackingDot.png',
        shadowUrl: 'TrackingDot.png',
        iconSize: [21, 23], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor: [10, 0] // point from which the popup should open relative to the iconAnchor
    });
    this.autorun(function () {
        if (Session.get('location') && Session.get('location').latitude) {
            latitude = Session.get('location').latitude;
            longitude = Session.get('location').longitude;
            if (!this.mapRendered) {
                this.map = L.map('map').setView([latitude, longitude], 15);
                this.map.spin(true);
                this.mapRendered = true;
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);

                $currentLocation = L.marker([latitude, longitude], {icon: currentLocationType}).addTo(this.map);
                $currentLocation.bindPopup("<b>Current Location:</b><br>" + latitude + ", " + longitude);
                this.map.spin(false);
            }
            if (this.mapRendered) {
                this.map.removeLayer($currentLocation);
                var latitude = Session.get('location').latitude;
                var longitude = Session.get('location').longitude;
                $currentLocation = L.marker([latitude, longitude], {icon: currentLocationType}).addTo(this.map);
                $currentLocation.bindPopup("<b>Current Location:</b><br>" + latitude + ", " + longitude);
                this.map.panTo(new L.LatLng(latitude, longitude));
            }
        }
    });
});

Template.geocodeLocation.events({
    'click #searchGeocodeLocationBtn': function(e){
        e.preventDefault();
        var searchValue = $("#location").val();
        var googleGeocodeProvider = new L.GeoSearch.Provider.Google();
        googleGeocodeProvider.GetLocations(searchValue, function (data) {
            Session.set('location', {latitude: data[0].Y, longitude: data[0].X});
        });
        //Until session is set, keep searching.
    }
})