Template.map.onCreated(function () {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    this.mapRendered = false;
});

Template.map.onRendered(function () {
    this.autorun(function () {
        // if (Session.get('location') && Session.get('location').latitude) {
            // latitude = Session.get('location').latitude;
            // longitude = Session.get('location').longitude;
            if (!this.mapRendered) {
                this.map = L.map('map').setView([33.246873, -86.784219], 7);
                this.mapRendered = true;

                var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                }).addTo(this.map);
                var geoJsonLayer = L.geoJson($mapData, {
                  style: function (feature) {
                    return feature.properties.style;
                  },
                  onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name + "<br>More Info: <a href=" + feature.properties.popupContent + ">" + feature.properties.popupContent + "</a>");
                  }
                });
                this.map.addLayer(geoJsonLayer);
                L.control.locate({
                  follow: false,
                  showPopup: true,
                  locateOptions: {maxZoom: 12}
                }).addTo(this.map);
                $('.subscribeModal').modal();
            }
            // if (this.mapRendered) {
            //     this.map.panTo(new L.LatLng(latitude, longitude));
            // }
        // }
    });
});
