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
        var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                }).addTo(this.map);

                var geojsonFeature = [ {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Horseshoe Bend",
                    "popupContent" : "http://www.nps.gov/hobe/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.736476
                , 32.985515 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Little River Canyon",
                    "popupContent" : "http://www.nps.gov/liri/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ 34.417112, 35967 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Muscle Shoals",
                    "popupContent" : "http://www.nps.gov/mush/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.562802
                , 34.768526 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Natchez Trace",
                    "popupContent" : "http://www.nps.gov/natr/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -88.672874
                , 34.281378 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Russell Cave",
                    "popupContent" : "http://www.nps.gov/ruca/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.71442
                , 34.94758 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Selma to Montgomery",
                    "popupContent" : "http://www.nps.gov/semo/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.024283
                , 32.423215 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Tuskeegee Airmen",
                    "popupContent" : "http://www.nps.gov/tuai/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.673536
                , 32.446838 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Tuskeegee Institute",
                    "popupContent" : "http://www.nps.gov/tuin/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.70828933
                , 32.42878047 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Bladon Springs State Park",
                    "popupContent" : "http://www.alapark.com/bladon-springs-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -88.19842169
                , 31.73309712 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Blue Springs State Park",
                    "popupContent" : "http://www.alapark.com/blue-springs-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.6105
                , 31.70878 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Buck's Pocket State Park",
                    "popupContent" : "http://www.alapark.com/bucks-pocket-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.038915
                , 34.435197 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Cathedral Caverns State Park",
                    "popupContent" : "http://www.alapark.com/cathedral-caverns-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.225842
                , 34.572002 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Cheaha State Park",
                    "popupContent" : "http://www.alapark.com/cheaha-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.856239
                , 33.449475 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Chewacla State Park",
                    "popupContent" : "http://www.alapark.com/chewacla-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.4820831
                , 32.55458676 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Chickasaw State Park",
                    "popupContent" : "http://www.alapark.com/chickasaw-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.77977346
                , 32.36203469 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "DeSoto State Park",
                    "popupContent" : "http://www.alapark.com/desoto-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.658319
                , 34.465218 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Florala State Park",
                    "popupContent" : "http://www.alapark.com/florala-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.172859
                , 31.074084 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Frank Jackson State Park",
                    "popupContent" : "http://www.alapark.com/frank-jackson-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.25551
                , 31.28267 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Gulf State Park",
                    "popupContent" : "http://www.alapark.com/gulf-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.750611
                , 30.269721 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Joe Wheeler State Park",
                    "popupContent" : "http://www.alapark.com/joe-wheeler-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.331403
                , 34.810403 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Lake Guntersville State Park",
                    "popupContent" : "http://www.alapark.com/lake-guntersville-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.20436835
                , 34.39447949 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Lake Lurleen State Park",
                    "popupContent" : "http://www.alapark.com/lake-lurleen-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.66975688
                , 33.30168672 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Lakepoint State Park",
                    "popupContent" : "http://www.alapark.com/lakepoint-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.11281008
                , 31.98731709 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Meaher State Park",
                    "popupContent" : "http://www.alapark.com/meaher-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.94017177
                , 30.67053771 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Monte Sano State Park",
                    "popupContent" : "http://www.alapark.com/monte-sano-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.51739764
                , 34.74450236 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Oak Mountain State Park",
                    "popupContent" : "http://www.alapark.com/oak-mountain-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.751615
                , 33.322653 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Paul M. Grist State Park",
                    "popupContent" : "http://www.alapark.com/paul-m-grist-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.9913
                , 32.597763 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Rickwood Caverns State Park",
                    "popupContent" : "http://www.alapark.com/rickwood-caverns-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.86218173
                , 33.87482633 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Roland Cooper State Park",
                    "popupContent" : "http://www.alapark.com/roland-cooper-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.24510043
                , 32.05544657 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Wind Creek State Park",
                    "popupContent" : "http://www.alapark.com/wind-creek-state-park"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.953268
                , 32.943719 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Hugh M. Comer Scout Reservation",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.578584
                , 34.556856 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Frank Spain Scout Reservation",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.711041
                , 33.418514 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Camp Westmoreland",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.568445
                , 34.880513 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Greater Alabama Council - Huntsville",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.686538
                , 33.476086 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Greater Alabama Council - Birmingham",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.60094542
                , 34.70159983 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "U.S. Space & Rocket Center",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.628864
                , 34.702327 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Cambrian Ridge",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.689094
                , 31.892975 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Capitol Hill",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.411667
                , 32.450265 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Grand National",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.72797504
                , 32.39688209 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Hampton Cove",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.469172
                , 34.65998651 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Highland Oaks",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.491359
                , 31.239648 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Lakewood Golf Club",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.888808
                , 30.523653 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Magnolia Grove",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -88.079876
                , 30.706822 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Oxmoor Valley",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.882474
                , 33.408189 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Ross Bridge",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.841727
                , 33.404626 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Silver Lakes",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.926611
                , 33.884819 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "The Shoals",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -87.562802
                , 34.768526 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Skymont Scout Reservatoin",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.836838
                , 35.438848 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Point Mallard Park",
                    "popupContent" : "MISSING"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -86.966374
                , 34.56042 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Atchafalaya Swamp Base",
                    "popupContent" : "http://www.bsaswampbase.org/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -92.01866
                , 30.21385 ]
                  }
                }, {
                  "type" : "Feature",
                  "properties" : {
                    "name" : "Cumberland Caverns",
                    "popupContent" : "http://www.cumberlandcaverns.com/"
                   },
                 "geometry": {
                    "type" : "Point" ,
                    "coordinates" : [ -85.6834828, 35.66547966 ]
                  }
                }];

                L.geoJson(geojsonFeature, {
                  style: function (feature) {
                    return feature.properties.style;
                  },
                  onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name + "<br>More Info: <a href=" + feature.properties.popupContent + ">" + feature.properties.popupContent + "</a>");
                  }
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
