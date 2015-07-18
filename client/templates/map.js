Template.map.onCreated(function () {
    GoogleMaps.ready('map', function (map) {

        Tracker.autorun(function () {
            if (Session.get('userLat') && Session.get('userLon')) {
                var relocate = new google.maps.LatLng(Session.get('userLat'), Session.get('userLon'));
                map.instance.setCenter(relocate);
            }
        });


        google.maps.event.addListener(map.instance, 'click', function (event) {
            Markers.insert({lat: event.latLng.lat(), lng: event.latLng.lng()});
        });

        var markers = {};

        Markers.find().observe({
            added: function (document) {
                var marker = new google.maps.Marker({
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.lat, document.lng),
                    map: map.instance,
                    id: document._id
                });

                google.maps.event.addListener(marker, 'dragend', function (event) {
                    Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
                });

                markers[document._id] = marker;
            },
            changed: function (newDocument, oldDocument) {
                markers[newDocument._id].setPosition({lat: newDocument.lat, lng: newDocument.lng});
            },
            removed: function (oldDocument) {
                markers[oldDocument._id].setMap(null);
                google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                delete markers[oldDocument._id];
            }
        });
    });
});

Template.map.helpers({
    mapOptions: function () {
        if (GoogleMaps.loaded()) {
            var userLat = Session.get('userLat') || "-37.8136";
            var userLon = Session.get('userLon') || "144.9631";

            return {
                center: new google.maps.LatLng(userLat, userLon),
                zoom: 10
            };
        }
    }
});