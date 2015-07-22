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

                // default maps
                var default_OpenStreetMaps = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);

                // optional maps #1
                var Thunderforest_OpenCycleMap = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
                	attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                });

                // optional maps #2
                var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                });

                //default_OpenStreetMaps.addTo(this.map);
                //Thunderforest_OpenCycleMap.addTo(this.map);
                Esri_WorldTopoMap.addTo(this.map);

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
