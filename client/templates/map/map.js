Template.map.onCreated(function () {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    this.mapRendered = false;
    L.GeoIP.getPosition('', function(data){
      Session.set('location', data);
    });
});

Template.map.onRendered(function () {
  Meteor.call("pageviewIncrement", "map", function(error, result) {
    if (error) {
      console.log(error.reason);
    } else {
      return;
    }
  });
  this.autorun(function () {
    if (Session.get('location') && Session.get('location').latitude) {
      latitude = Session.get('location').latitude;
      longitude = Session.get('location').longitude;
      if (!this.mapRendered) {
        this.map = L.map('map').setView([latitude, longitude], 11);
        this.mapRendered = true;

        var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }).addTo(this.map);

        var geoJsonLayer = L.geoJson($mapData, {
          pointToLayer: function(feature, latlng) {
            marker = L.marker(latlng, {});
            marker.options['title'] = feature.properties['name'];
            return marker;
          },
          style: function (feature) {
            return feature.properties.style;
          },
          onEachFeature: function (feature, layer) {
            //layer.option['title'] = feature.properties.name;
            layer.bindPopup(feature.properties.name + "<br>More Info: <a href=" + feature.properties.popupContent + ">" + feature.properties.popupContent + "</a>");
          }
        });

        var markers = new L.MarkerClusterGroup();
        markers.addLayer(geoJsonLayer);
        this.map.addLayer(markers);

        L.control.locate({
          follow: false,
          showPopup: true,
          locateOptions: {maxZoom: 12}
        }).addTo(this.map);
      }
      if (this.mapRendered) {
        this.map.panTo(new L.LatLng(latitude, longitude));
      }
    }

    this.map.on('move', function() {

      var inBounds = [];
      bounds = this.getBounds();

      geoJsonLayer.eachLayer(function(marker){
        if (bounds.contains(marker.getLatLng())) {
          //console.log(marker.options.title + " is in bounds.");
          inBounds.push(marker.options.title);
        }
      });

      document.getElementById('coordinates').innerHTML = inBounds.join('\n');
    });
  });
});

Template.map.onCreated(function() {
  // TODO: this needs to be loaded from a file.
  $mapData = [
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Horseshoe Bend",
        "popupContent" : "http://www.nps.gov/hobe/"
       },
       "geometry": {
          "type" : "Point" ,
          "coordinates" : [ -85.736476, 32.985515 ]
        }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Little River Canyon",
        "popupContent" : "http://www.nps.gov/liri/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ 34.417112, 35967 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Muscle Shoals",
        "popupContent" : "http://www.nps.gov/mush/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.562802, 34.768526 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Natchez Trace",
        "popupContent" : "http://www.nps.gov/natr/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -88.672874, 34.281378 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Russell Cave",
        "popupContent" : "http://www.nps.gov/ruca/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.71442, 34.94758 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Selma to Montgomery",
        "popupContent" : "http://www.nps.gov/semo/"
       },
       "geometry": {
          "type" : "Point" ,
          "coordinates" : [ -87.024283, 32.423215 ]
        }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Tuskeegee Airmen",
        "popupContent" : "http://www.nps.gov/tuai/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.673536, 32.446838 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Tuskeegee Institute",
        "popupContent" : "http://www.nps.gov/tuin/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.70828933, 32.42878047 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Bladon Springs State Park",
        "popupContent" : "http://www.alapark.com/bladon-springs-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -88.19842169, 31.73309712 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Blue Springs State Park",
        "popupContent" : "http://www.alapark.com/blue-springs-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.6105, 31.70878 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Buck's Pocket State Park",
        "popupContent" : "http://www.alapark.com/bucks-pocket-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.038915, 34.435197 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Cathedral Caverns State Park",
        "popupContent" : "http://www.alapark.com/cathedral-caverns-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.225842, 34.572002 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Cheaha State Park",
        "popupContent" : "http://www.alapark.com/cheaha-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.856239, 33.449475 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Chewacla State Park",
        "popupContent" : "http://www.alapark.com/chewacla-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.4820831, 32.55458676 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Chickasaw State Park",
        "popupContent" : "http://www.alapark.com/chickasaw-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.77977346, 32.36203469 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "DeSoto State Park",
        "popupContent" : "http://www.alapark.com/desoto-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.658319, 34.465218 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Florala State Park",
        "popupContent" : "http://www.alapark.com/florala-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.172859, 31.074084 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Frank Jackson State Park",
        "popupContent" : "http://www.alapark.com/frank-jackson-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.25551, 31.28267 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Gulf State Park",
        "popupContent" : "http://www.alapark.com/gulf-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.750611, 30.269721 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Joe Wheeler State Park",
        "popupContent" : "http://www.alapark.com/joe-wheeler-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.331403, 34.810403 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Lake Guntersville State Park",
        "popupContent" : "http://www.alapark.com/lake-guntersville-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.20436835, 34.39447949 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Lake Lurleen State Park",
        "popupContent" : "http://www.alapark.com/lake-lurleen-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.66975688, 33.30168672 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Lakepoint State Park",
        "popupContent" : "http://www.alapark.com/lakepoint-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.11281008, 31.98731709 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Meaher State Park",
        "popupContent" : "http://www.alapark.com/meaher-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.94017177, 30.67053771 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Monte Sano State Park",
        "popupContent" : "http://www.alapark.com/monte-sano-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.51739764, 34.74450236 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Oak Mountain State Park",
        "popupContent" : "http://www.alapark.com/oak-mountain-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.751615, 33.322653 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Paul M. Grist State Park",
        "popupContent" : "http://www.alapark.com/paul-m-grist-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.9913, 32.597763 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Rickwood Caverns State Park",
        "popupContent" : "http://www.alapark.com/rickwood-caverns-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.86218173, 33.87482633 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Roland Cooper State Park",
        "popupContent" : "http://www.alapark.com/roland-cooper-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.24510043, 32.05544657 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Wind Creek State Park",
        "popupContent" : "http://www.alapark.com/wind-creek-state-park"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.953268, 32.943719 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Hugh M. Comer Scout Reservation",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.578584, 34.556856 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Frank Spain Scout Reservation",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.711041, 33.418514 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Camp Westmoreland",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.568445, 34.880513 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Greater Alabama Council - Birmingham",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.686538, 33.476086 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Greater Alabama Council - Huntsville",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.60094542, 34.70159983 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "U.S. Space & Rocket Center",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.628864, 34.702327 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Cambrian Ridge",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.689094, 31.892975 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Capitol Hill",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.411667, 32.450265 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Grand National",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.72797504, 32.39688209 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Hampton Cove",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.469172, 34.65998651 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Highland Oaks",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.491359, 31.239648 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Lakewood Golf Club",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -87.888808, 30.523653 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Magnolia Grove",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -88.079876, 30.706822 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Oxmoor Valley",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.882474, 33.408189 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Ross Bridge",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.841727, 33.404626 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Silver Lakes",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.926611, 33.884819 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Skymont Scout Reservatoin",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.836838, 35.438848 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Point Mallard Park",
        "popupContent" : "MISSING"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -86.966374, 34.56042 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Atchafalaya Swamp Base",
        "popupContent" : "http://www.bsaswampbase.org/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -92.01866, 30.21385 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Cumberland Caverns",
        "popupContent" : "http://www.cumberlandcaverns.com/"
       },
     "geometry": {
        "type" : "Point" ,
        "coordinates" : [ -85.6834828, 35.66547966 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Acadia National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -68.21
    , 44.35 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "American Samoa National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -170.68
    , -14.25 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Arches National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -109.57
    , 38.68 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Badlands National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -102.5
    , 43.75 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Big Bend National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -103.25, 29.25 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Black Canyon of the Gunnison National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -107.72
    , 38.57 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Bryce Canyon National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -112.18
    , 37.57 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Canyonlands National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -109.93
    , 38.2 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Capitol Reef National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -111.17
    , 38.2 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Carlsbad Caverns National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -104.44
    , 32.17 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Channel Islands National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -119.42
    , 34.01 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Congaree National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -80.78
    , 33.78 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Crater Lake National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -122.1
    , 42.94 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Cuyahoga Valley National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -81.55
    , 41.24 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Death Valley National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -116.82
    , 36.24 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Denali National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -150.5
    , 63.33 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Dry Tortugas National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -82.87
    , 24.63 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Everglades National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -80.93
    , 25.32 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Gates of the Arctic National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -153.3
    , 67.78 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Glacier National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -114
    , 48.8 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Glacier Bay National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -137
    , 58.5 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Grand Canyon National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -112.14
    , 36.06 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Grand Teton National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -110.8
    , 43.73 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Great Basin National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -114.3
    , 38.98 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Great Sand Dunes National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -105.51
    , 37.73 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Great Smoky Mountains National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -83.53
    , 35.68 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Guadalupe Mountains National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -104.87
    , 31.92 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Haleakala National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -156.17
    , 20.72 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Hawaii Volcanoes National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -155.2
    , 19.38 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Hot Springs National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -93.05
    , 34.51 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Isle Royale National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -88.55
    , 48.1 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Joshua Tree National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -115.9
    , 33.79 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Katmai National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -155
    , 58.5 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Kenai Fjords National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -149.65
    , 59.92 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Kings Canyon National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -118.55
    , 36.8 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Kobuk Valley National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -159.28
    , 67.55 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Lake Clark National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -153.42
    , 60.97 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Lassen Volcanic National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -121.51
    , 49.49 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Mammoth Cave National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -86.1
    , 37.18 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Mesa Verda National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -108.49
    , 37.18 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Mount Rainier National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -121.75
    , 46.85 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "North Cascades National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -121.2
    , 48.7 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Olympic National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -123.5
    , 47.97 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Petrified Forest National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -109.78
    , 35.07 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Pinnacles National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -121.16
    , 36.48 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Redwood National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -124
    , 41.3 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Rocky Mountain National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -105.58
    , 40.4 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Saguaro National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -110.5
    , 32.25 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Sequoia National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -118.68
    , 36.48 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Shenendoah National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -78.35
    , 38.53 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Theodore Roosevelt National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -103.45
    , 48.97 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Virgin Islands National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -64.73
    , 18.33 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Voyageurs National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -92.88
    , 48.5 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Wind Cave National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -103.48
    , 43.57 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Wrangell -- St. Elias National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -142
    , 61 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Yellowstone National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -110.5
    , 44.6 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Yosemite National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -119.5
    , 37.83 ]
      }
    },
    {
      "type" : "Feature",
      "properties" : {
        "name" : "Zion National Park",
        "popupContent" : "http://nps.gov/",
      },
      "geometry" : {
         "type" : "Point",
         "coordinates" : [ -113.05, 37.3 ]
      }
    }
  ];
});
