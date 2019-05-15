/*---------------------------------------------Food Station-----------------------------------------------*/
var kindOfPlace = [];
var POIStationLocation = [];
function PinPointForPlacesOfInterest(map, control) {
    var Grid_Table = document.getElementById('PlacesOfInterestGrid');
    var chkBox = document.getElementById(control.id);
    var Places = [];
    if (chkBox.checked) {
        localStorage.setItem(control.id, "checked");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "WebService.asmx/getPlacesOfInterest?ID=" + control.id, false);
    xmlhttp.send();
    var xmlDoc= xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("PlacesOfInterest");
    map.infoWindow.hide();
    map.infoWindow.resize(500, 150);
    $.each(xmlalbums, function () {
        varname = $(this).find("ID").text();
        foodstation = $(this).find("Name").text();
        address = $(this).find("Address").text();
        postal = $(this).find("PostalCode").text();
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();


        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/attractions1.png', 50, 50);
        var PointGraphic = new esri.Graphic(point, symbol);
        OneMap.map.graphics.add(PointGraphic);
        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle("<img src = 'images/icons/attractions.bmp' style='width:50px; height:50px;' />&nbsp;&nbsp; " + foodstation);
        infoTemplate.setContent("<b>Food Establishments : </b>" + foodstation + "</br>"
    + "<b>Address: </b>" + address + "<br/>"
     + "<b>PostalCode: </b>" + postal + "<br/>"
       + '<input type="checkbox" onclick="ShowRelatedVideos(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" searchquery="' + foodstation + '" "value="Show Related Videos" /><label>Show Related Videos</label>'
        + '<input type="checkbox" onclick="ShowWeather(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
         + '<input type="checkbox" onclick="ShowRelatedInsta(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" searchqueryzzz="' + foodstation + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
     );
        var graphic = PointGraphic;
        graphic.setSymbol(symbol);
        graphic.setInfoTemplate(infoTemplate);
       
        Places.push(OneMap.map.graphics.add(graphic));
    });
    POIStationLocation.push(Places);
    kindOfPlace.push(control.id);
    }
    else {
        var remove;
        localStorage.setItem(control.id, "unchecked");
        for (var j = 0; j < kindOfPlace.length; j++) {
            if (kindOfPlace[j] == control.id) {
                remove = j;kindOfPlace.splice(remove, 1);
				
            }
        }
        for (var i = POIStationLocation[remove].length - 1; i >= 0; i--) {
            map.graphics.remove(POIStationLocation[remove][i]);
        }
        POIStationLocation.splice(remove, 1);
     }
     
}
//End of FoodStation----