/*---------------------------------------------Food Station-----------------------------------------------*/

function ShowImage(number) {
   
    var gallerynumber = 'gallery' + number;
    $('.modal-header').html('<div> </div>');
   
    //    document.getElementById("gallery1").css('display', 'block');
    if (jQuery("#gallery" + number )[0]) {
        jQuery("#gallery" + number).css('display', 'block');
        //jQuery("'#" + gallerynumber + "'").css('display', 'block');
        for (var i = 0; i < 4; i++) {
            if (i != number) {
                if (jQuery("#gallery" + i)[0]) { // this? nope this will error
                    //gg
                    jQuery("#gallery" + i).css('display', 'none');
                    //jQuery("'#gallery" + i + "'").css('display', 'none');
                }
            }
        }
        $('#About').modal('show')
    }
}





function getScreen(url, size) {
    if (url === null) { return ""; }

    size = (size === null) ? "big" : size;
    var vid;
    var results;

    results = url.match("[\\?&]v=([^&#]*)");

    vid = (results === null) ? url : results[1];
    var n = vid.indexOf("\\");
    vid = vid.substring(0, n != -1 ? n : vid.length);
    
   
    if (size == "small") {
        return "http://i1.ytimg.com/vi/" + vid + "/1.jpg";
    } 
}

var foodStationLocation =[];
var foodPlace = [];
function PinPointForFoodStation(map, control) {
    var Grid_Table = document.getElementById('FoodGrid');
    var chkBox = document.getElementById(control.id);
	var FOODPlaces = [];
    if(chkBox.checked) {
        localStorage.setItem(control.id, "checked");
        var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "WebService.asmx/getFoodStation?ID=" + control.id, false);
    xmlhttp.send();
    var xmlDoc= xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("FoodStation");
    map.infoWindow.hide();
    map.infoWindow.resize(480,160);
    $.each(xmlalbums, function () {
        varname = $(this).find("ID").text();
        foodstation = $(this).find("Name").text();
        address = $(this).find("Address").text();
        postal = $(this).find("PostalCode").text();
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();
       

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/' + control.id + '.png', 75, 75);
      //  var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/food1.png', 50, 50);

        var PointGraphic = new esri.Graphic(point, symbol);
        OneMap.map.graphics.add(PointGraphic);
        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle("<img src = 'images/icons/food.png' style='width:50px; height:50px;' />&nbsp;&nbsp; " + foodstation);
        infoTemplate.setContent("<b>Food Establishments : </b>" + foodstation + "</br>"
    + "<b>Address: </b>" + address + "<br/>"
     + "<b>PostalCode: </b>" + postal + "<br/>"
      + '<input type="checkbox" onclick="ShowRelatedVideos(this);" searchquery="' + foodstation + '" "value="Show Related Videos" /><label>Show Related Videos</label>'
       + '<input type="checkbox" onclick="ShowWeather(this);" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
        +  '<input type="checkbox" onclick="ShowRelatedInsta(this);" searchqueryzzz="' + foodstation + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
     );
        var graphic = PointGraphic;
        graphic.setSymbol(symbol);
        graphic.setInfoTemplate(infoTemplate);
		FOODPlaces.push(OneMap.map.graphics.add(graphic));
       // foodStationLocation.push(OneMap.map.graphics.add(graphic));
    });
      foodStationLocation.push(FOODPlaces);
    foodPlace.push(control.id);
     } 
     else {
          var remove;
        localStorage.setItem(control.id, "unchecked");
        for (var j = 0; j < foodPlace.length; j++) {
            if (foodPlace[j] == control.id) {
                remove = j;foodPlace.splice(remove, 1);
            }
        }
        for (var i = foodStationLocation[remove].length - 1; i >= 0; i--) {
          
     map.graphics.remove(foodStationLocation[remove][i]);
     }
	  foodStationLocation.splice(remove, 1);
     }
     
}
//End of FoodStation----