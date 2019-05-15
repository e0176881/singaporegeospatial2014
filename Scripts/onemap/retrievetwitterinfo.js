/*--------------------------------------------@AUTHOR- MINGXUAN-----------------------------------------------*/
var TwitterStationLocation = [];
var PointGraphic2;
var twitterheatlocation = [];
function PinPointForTwitter(map, control) {
  



    var Grid_Table = document.getElementById('CheckinTable');
    var chkBox = document.getElementById("CHECKTWITTER");
	 var twitterPlaces = [];
    if(chkBox.checked)
    {
	localStorage.setItem("CHECKTWITTER", "checked");
        map.infoWindow.hide();
        map.infoWindow.resize(500, 230);

        

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "WebService.asmx/getTwitter", false);
        xmlhttp.send();
        if (document.getElementById("btnHeatMap1")) {
            //this means it is unchecked, make sure heatmap is hidden
            if (heatLayer) {
                heatLayer.clearData();
            }
            // map.removeLayer(heatLayer);
        }
      
                var xmlDoc = xmlhttp.responseXML;
                var xmlalbums = xmlDoc.documentElement.getElementsByTagName("Twitter");
                $.each(xmlalbums, function () {
                    varname = $(this).find("id").text();
                    foodstation = $(this).find("hashtag").text();
                    coordX = $(this).find("X").text();
                    coordY = $(this).find("Y").text();
                    placename = $(this).find("placename").text();
                    message = $(this).find("message").text();
                    retweetcount = $(this).find("retweetcount").text();
                    favcount = $(this).find("favcount").text();
                    platform = $(this).find("platform").text();
                    datepost = $(this).find("dt").text();
                    address = $(this).find("Address").text();
                    var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
                       var symbol = new esri.symbol.PictureMarkerSymbol('Images/icons/Twitter.png', 50, 50);

                   // var symbol = new esri.symbol.TextSymbol("hastag" + foodstation);

                    var PointGraphic = new esri.Graphic(point, symbol);
                    PointGraphic2 = new esri.Graphic(point, null);
                    OneMap.map.graphics.add(PointGraphic);
                  //  clusterGraphics.add(PointGraphic);
                    twitterheatlocation.push(heatmapGraphics.add(PointGraphic2));
                    var infoTemplate = new esri.InfoTemplate();
                    infoTemplate.setTitle("<img src = 'Images/icons/Twitter.png' style='width:50px; height:50px;' />&nbsp;&nbsp; " + address);
                    infoTemplate.setContent("<b>hashtag: </b>" + "#" + foodstation + "<br/>"
                  + "<b>message: </b>" + message + "<br/>"
                 + "<b>retweet count: </b>" + retweetcount + "<br/>"
                  + "<b>favorite count: </b>" + favcount + "<br/>"
                   + "<b>platform: </b>" + platform + "<br/>"
                   + "<b>datepost: </b>" + datepost + "<br/>"
                       + '<input type="checkbox" onclick="ShowRelatedVideos(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" searchquery="' + foodstation + '" "value="Show Related Videos" /><label>Show Related Videos</label>'
                        + '<input type="checkbox" onclick="ShowWeather(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
                         + '<input type="checkbox" onclick="ShowRelatedInsta(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" searchqueryzzz="' + foodstation + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
                  );

                    var graphic = PointGraphic;
                    graphic.setSymbol(symbol);
                    graphic.setInfoTemplate(infoTemplate);

                    TwitterStationLocation.push(OneMap.map.graphics.add(graphic));
                });
				
                if (document.getElementById("btnHeatMap2")) {
                    //means the heatmap button is checked, add to map
                     if (heatLayer) {
                         heatLayer.setData(heatmapGraphics.graphics);
                         heatmapGraphics.add(PointGraphic);
                    }
                }
            }
             else {



                 localStorage.setItem("CHECKTWITTER", "unchecked"); //remove graphics
                 for (var a = twitterheatlocation.length - 1; a >= 0; a--) {
                     heatmapGraphics.remove(twitterheatlocation[a]);


                 }
     for(var i = TwitterStationLocation.length - 1; i>=0; i--) {
         map.graphics.remove(TwitterStationLocation[i]);

        
     }
	 
     }
     
}
