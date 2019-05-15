/*---------------------------------------------Food Station-----------------------------------------------*/
var HelpStationLocation =[];
var HelpPlace = [];
function PinPointForSeekForHelp(map, control) {
    var Grid_Table = document.getElementById('SeekForHelpGrid');
    var chkBox = document.getElementById(control.id);
	var HELPPlaces = [];
    if(chkBox.checked)
    {
	  localStorage.setItem(control.id, "checked");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "WebService.asmx/getSeekForHelp?ID=" + control.id, false);
    

    xmlhttp.onreadystatechange = function () {
        //ready state 4 and status 200 indicate a successful requst. 
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;
            var xmlalbums = xmlDoc.documentElement.getElementsByTagName("SeekForHelp");
            map.infoWindow.hide();
            map.infoWindow.resize(350, 220);
            $.each(xmlalbums, function () {
                varname = $(this).find("ID").text();
                foodstation = $(this).find("Name").text();
                address = $(this).find("Addresss").text();
                postal = $(this).find("PostalCode").text();
                coordX = $(this).find("X").text();
                coordY = $(this).find("Y").text();


                var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414 } });
                var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/help1.png', 50, 50);
                var PointGraphic = new esri.Graphic(point, symbol);
                OneMap.map.graphics.add(PointGraphic);
                var infoTemplate = new esri.InfoTemplate();

                infoTemplate.setTitle("<img src = 'images/icons/help.png' style='width:50px; height:50px;' />&nbsp;&nbsp; " + foodstation);
                infoTemplate.setContent("<b>Help Station: </b>" + foodstation + "</br>"
    + "<b>Address: </b>" + address + "<br/>"
     + "<b>PostalCode: </b>" + postal + "<br/>"
      + '<input type="checkbox" onclick="ShowRelatedVideos(this);" searchquery="' + foodstation + '" "value="Show Related Videos" /><label>Show Related Videos</label>'
       + '<input type="checkbox" onclick="ShowWeather(this);" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
        + '<input type="checkbox" onclick="ShowRelatedInsta(this);" searchqueryzzz="' + foodstation + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
     );





           

                var graphic = PointGraphic;
                graphic.setSymbol(symbol);
                graphic.setInfoTemplate(infoTemplate);
               // HelpStationLocation.push(OneMap.map.graphics.add(graphic));
                HELPPlaces.push(OneMap.map.graphics.add(graphic));
              
            });
			 HelpStationLocation.push(HELPPlaces);
    HelpPlace.push(control.id);
          
        }
    }
    xmlhttp.send();
   
     } 
     else 

     {
	  var remove;
        localStorage.setItem(control.id, "unchecked");
        for (var j = 0; j < HelpPlace.length; j++) {
            if (HelpPlace[j] == control.id) {
                remove = j;HelpPlace.splice(remove, 1);
            }
        }
     for(var i = HelpStationLocation[remove].length - 1; i>=0; i--) {
     map.graphics.remove(HelpStationLocation[remove][i]);
     }
	 HelpStationLocation.splice(remove, 1);
     }
     
}
//End of FoodStation----

