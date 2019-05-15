/*---------------------------------------------Food Station-----------------------------------------------*/
var HealthStationLocation = [];
var healthPlace = [];
var heatstationLocation=[];
var heatplace=[];
var PointGraphic2;
function PinPointForHealthcare(map, control) {
    var Grid_Table = document.getElementById('HealthcareGrid');
    var chkBox = document.getElementById(control.id);
    var HEALTHPlaces = [];
    var HEATPLACE=[];
    if (chkBox.checked) {
        localStorage.setItem(control.id, "checked");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "WebService.asmx/getHealthcare?ID=" + control.id, false);
        xmlhttp.send();
        var xmlDoc = xmlhttp.responseXML;
        var xmlalbums = xmlDoc.documentElement.getElementsByTagName("Healthcare");
        map.infoWindow.hide();
        map.infoWindow.resize(500, 150);
//        if (heatLayer) {
//            heatLayer.clearData();
//        }
//        else {
//            heatInit();
//        }
        if (document.getElementById("btnHeatMap1")) {
            //this means it is unchecked, make sure heatmap is hidden
            if (heatLayer) {
                heatLayer.clearData();
            }
            
        }
      //  heatmapGraphics.clear();
        $.each(xmlalbums, function () {
            varname = $(this).find("ID").text();
            foodstation = $(this).find("Name").text();
            address = $(this).find("Address").text();
            postal = $(this).find("PostalCode").text();
            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();


            var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
            var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/health1.png', 50, 50);

            var PointGraphic = new esri.Graphic(point, symbol);
            PointGraphic2 = new esri.Graphic(point, null);
            OneMap.map.graphics.add(PointGraphic);
            HEATPLACE.push(heatmapGraphics.add(PointGraphic2));
            
            // this is the causing issue

            //            heatLayer.addDataPoint(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src = 'images/icons/health.png' style='width:50px; height:50px;' />&nbsp;&nbsp; " + foodstation);
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
            // HealthStationLocation.push(OneMap.map.graphics.add(graphic));
            HEALTHPlaces.push(OneMap.map.graphics.add(graphic));
        });
        heatstationLocation.push(HEATPLACE);
        heatplace.push(control.id);
        HealthStationLocation.push(HEALTHPlaces);
        healthPlace.push(control.id);
        if (document.getElementById("btnHeatMap2")) {
            //means the heatmap button is checked, add to map
            if (heatLayer) {
                heatLayer.setData(heatmapGraphics.graphics);
               
            }
        }
    }
    else {
       //  heatmapGraphics.clear();
       var gg;
    
        for (var a = 0; a < heatplace.length; a++) {
            if (heatplace[a] == control.id) {
                gg = a; heatplace.splice(gg, 1);
            }
        }

        for (var b = heatstationLocation[gg].length - 1; b >= 0; b--) {

            heatmapGraphics.remove(heatstationLocation[gg][b]);
            
          
            }
            
        
        heatstationLocation.splice(remove, 1);

        var remove;
        localStorage.setItem(control.id, "unchecked");
        for (var j = 0; j < healthPlace.length; j++) {
            if (healthPlace[j] == control.id) {
                remove = j; healthPlace.splice(remove, 1);
            }
        }

        for (var i = HealthStationLocation[remove].length - 1; i >= 0; i--) {

            map.graphics.remove(HealthStationLocation[remove][i]);
          
            
          
            }
           HealthStationLocation.splice(remove, 1); 
        }
        
        
    }


//End of FoodStation----