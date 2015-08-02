L.GeoIP = L.extend({
    getPosition: function (ip, callback) {
        var url = "http://freegeoip.net/json/";
        var result = {
          latitude: '',
          longitude: ''
        }

        if (ip !== undefined) {
            url = url + ip;
        }

        $.ajax({
          method: "GET",
          url: "http://freegeoip.net/json/",
          async: false,
          dataType: 'jsonp',
          success: function(data){
            result.latitude = data.latitude;
            result.longitude = data.longitude;
            callback(result);
          },
          error: function(){
            console.log("There was an error retreiving user location via reverse IP geocode.");
          }
        });
    },

    centerMapOnPosition: function (map, zoom, ip) {
        L.GeoIP.getPosition(ip, function(position) {
            map.setView(position, zoom);
        });
    }
});
