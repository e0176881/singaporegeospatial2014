/*---------------------------------------------GetCurrentLocation-----------------------------------------------*/

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
    }
    else {
        alert("Your Browser doesnt support the Geo Location API. Please contact the administrator(s) for more details or refer to GEOLOCATION API.");
    }
}
function locationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("PERMISSION ACCESS DENIED! Contact the administrators for more details.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Current location not available");
            break;
        case error.TIMEOUT:
            alert("System Timeout, Please Try Again.");
            break;
        default:
            alert("Unknown Error, Contact the administrators for more details.");
            break;
    }
}

var CoordConvertorObj = [];

function zoomToLocation(location) {
    var lat = location.coords.latitude;
    var longt = location.coords.longitude;

    var inXYList = (longt + "," + lat);
    var inputSR = 4326;
    var outputSR = 3414;
    var CoordConvertorObj = new CoordConvertor();
    CoordConvertorObj.ConvertCoordinate(inXYList, inputSR, outputSR, getCurrentLocation);
}

function getCurrentLocation(outXY) {
    var commalocate = outXY.indexOf(",");
    var takeoutX = outXY.substring(0, commalocate);
    var takeoutY = outXY.substring(commalocate + 1, outXY.length);

    var point = new esri.geometry.Point({ "x": takeoutX, "y": takeoutY, " spatialReference": { " wkid": 3414} });
    var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/images/Features/pinpoint.png', 15, 30);

    var PointGraphic = new esri.Graphic(point, symbol);
    OneMap.map.graphics.add(PointGraphic);

    var graphic = PointGraphic;
    graphic.setSymbol(symbol);
    OneMap.map.graphics.add(graphic);

    map.centerAt(point, 0);
}
var graphic;
var ggLocation = [];
function zoommmm(map, lat, lon) {
    
    var point = new esri.geometry.Point({ "x": lat, "y": lon, " spatialReference": { " wkid": 3414} });
    var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/images/Features/pinpoint.png', 15, 30);

    var PointGraphic = new esri.Graphic(point, symbol);

    graphic = PointGraphic;
  
    if (document.getElementById("zoomtolocatez").checked) {


        map.graphics.add(PointGraphic);
        graphic.setSymbol(symbol);
        map.graphics.add(graphic);

        ggLocation.push(OneMap.map.graphics.add(graphic)); 
  
        
    } else {

        for (var i = ggLocation.length - 1; i >= 0; i--) {

            map.graphics.remove(ggLocation.splice(i, 1)[0]);

        }
        
    }
}
var PointGraphic2;
var gg = [];
function zoomTo(map, lat, lon, name, message, countrt, favcount) {

    

    if (document.getElementById("btnHeatMap1")) {
        //this means it is unchecked, make sure heatmap is hidden
        if (heatLayer) {
            heatLayer.clearData();
            
        }

    }

  
    map.infoWindow.hide();
    map.infoWindow.resize(350, 200);
    var point = new esri.geometry.Point({ "x": lat, "y": lon, "spatialReference": { "wkid": 3414} });
    var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/images/Features/pinpoint.png', 15, 30);
    var PointGraphic = new esri.Graphic(point, symbol);
    PointGraphic2 = new esri.Graphic(point, null);
    OneMap.map.graphics.add(PointGraphic);
    
       gg.push(heatmapGraphics.add(PointGraphic2));
    
    
      
    
    var infoTemplate = new esri.InfoTemplate();
    infoTemplate.setTitle("<img src='Images/icons/Twitter.png' style='width:25px; height:25px;' />&nbsp;&nbsp; " + name);
    infoTemplate.setContent("<b>hashtag: </b>" + "#" + name + "<br/>" + "<b>message: </b>" + message + "<br/>" + "<b>retweet count: </b>" + countrt + "<br/>" + "<b>favorite count: </b>" + favcount + "<br/>");
    var graphic = PointGraphic;
    graphic.setSymbol(symbol);
   
    graphic.setInfoTemplate(infoTemplate);
    if (document.getElementById("btnHeatMap2")) {
        //means the heatmap button is checked, add to map
        if (heatLayer) {
            heatLayer.setData(heatmapGraphics.graphics);

        }
    }
   
}

//End of Current location----