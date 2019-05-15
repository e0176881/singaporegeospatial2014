/*--------------------------------------------@AUTHOR- MINGXUAN-----------------------------------------------*/
var FBcustomeventStationLocation = [];
var PointGraphic2;
var FBcustomeventheatlocation = [];
function PinPointForFBEVENTS(map, control) {




    var Grid_Table = document.getElementById('CheckinTable');
    var chkBox = document.getElementById("CHECKCOMMEVENTS");
    var twitterPlaces = [];
    if (chkBox.checked) {
        localStorage.setItem("CHECKCOMMEVENTS", "checked");
        map.infoWindow.hide();
        map.infoWindow.resize(600, 200);



        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "WebService.asmx/getCommunityEvents", false);
        xmlhttp.send();
        if (document.getElementById("btnHeatMap1")) {
            //this means it is unchecked, make sure heatmap is hidden
            if (heatLayer) {
                heatLayer.clearData();
            }
            // map.removeLayer(heatLayer);
        }

        var xmlDoc = xmlhttp.responseXML;
        var xmlalbums = xmlDoc.documentElement.getElementsByTagName("CommunityEvents");
        $.each(xmlalbums, function () {
            varname = $(this).find("id").text();
            foodstation = $(this).find("Event").text();
            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();
            placename = $(this).find("Location").text();
            message = $(this).find("EventInfo").text();
            attendees = $(this).find("NoOfAttendees").text();
            likes = $(this).find("Likes").text();
            shares = $(this).find("Shares").text();
            comments = $(this).find("Comment").text();
            timezone = $(this).find("Timezone").text();
          //  datepost = $(this).find("dt").text();
         //   address = $(this).find("Address").text();
            var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
               var symbol = new esri.symbol.PictureMarkerSymbol('Images/icons/events1.png', 50, 50);

        //    var symbol = new esri.symbol.TextSymbol("hastag" + foodstation);

            var PointGraphic = new esri.Graphic(point, symbol);
            PointGraphic2 = new esri.Graphic(point, null);
            OneMap.map.graphics.add(PointGraphic);
           
            FBcustomeventheatlocation.push(heatmapGraphics.add(PointGraphic2));
            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src = 'Images/icons/events.jpg' style='width:50px; height:50px;' />&nbsp;&nbsp; " + placename);
            infoTemplate.setContent("<div style='word-wrap:break-word;'><b>EventName: </b>" + foodstation + "<br/>"
                  + "<b>message: </b>" + unescape(message) + "<br/>"
                 + "<b>timezone: </b>" + timezone + "<br/>"
                  + "<b>No of Attendees </b>" + attendees + "<br/>"
                   + "<b>likes: </b>" + likes + "<br/>"
                   + "<b>shares: </b>" + shares + "<br/>"
                     + "<b>comments: </b>" + comments + "<br/>"
                     +"</div>"
                  );

            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);

            FBcustomeventStationLocation.push(OneMap.map.graphics.add(graphic));
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



        localStorage.setItem("CHECKCOMMEVENTS", "unchecked"); //remove graphics
        for (var a = FBcustomeventheatlocation.length - 1; a >= 0; a--) {
            heatmapGraphics.remove(FBcustomeventheatlocation[a]);


        }
        for (var i = FBcustomeventStationLocation.length - 1; i >= 0; i--) {
            map.graphics.remove(FBcustomeventStationLocation[i]);


        }

    }

}
