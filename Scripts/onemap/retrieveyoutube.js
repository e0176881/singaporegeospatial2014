/*--------------------------------------------@AUTHOR- MINGXUAN-----------------------------------------------*/
var YoutubeStationLocation = [];
var PointGraphic2;
var Youtubecustomeventheatlocation = [];
function PinPointForYoutube(map, control) {

    


    var Grid_Table = document.getElementById('CheckinTable');
    var chkBox = document.getElementById("checkyoutube");
    var twitterPlaces = [];
    if (chkBox.checked) {
        localStorage.setItem("checkyoutube", "checked");
        map.infoWindow.hide();
        map.infoWindow.resize(500, 300);



        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "WebService.asmx/getYoutube", false);
        xmlhttp.send();
        if (document.getElementById("btnHeatMap1")) {
            //this means it is unchecked, make sure heatmap is hidden
            if (heatLayer) {
                heatLayer.clearData();
            }
            // map.removeLayer(heatLayer);
        }

        var xmlDoc = xmlhttp.responseXML;
        var xmlalbums = xmlDoc.documentElement.getElementsByTagName("youtube");
        $.each(xmlalbums, function () {
            varname = $(this).find("id").text();
            title = $(this).find("title").text();
            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();
            placename = $(this).find("Location").text();
            message = $(this).find("description").text();
            rating = $(this).find("Rating").text();
            likes = $(this).find("likes").text();
            dislikes = $(this).find("dislikes").text();
            comments = $(this).find("commentcount").text();
            viewcount = $(this).find("viewcount").text(); 
            url = $(this).find("url").text();
            //  datepost = $(this).find("dt").text();
            //   address = $(this).find("Address").text();
            var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
            var symbol = new esri.symbol.PictureMarkerSymbol('Images/icons/youtube.png', 50, 50);

            //    var symbol = new esri.symbol.TextSymbol("hastag" + foodstation);

            var PointGraphic = new esri.Graphic(point, symbol);
            PointGraphic2 = new esri.Graphic(point, null);
            OneMap.map.graphics.add(PointGraphic);

            Youtubecustomeventheatlocation.push(heatmapGraphics.add(PointGraphic2));
            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src = 'Images/icons/youtube.png' style='width:50px; height:50px;' />&nbsp;&nbsp; " + title);
            infoTemplate.setContent("<div style='word-wrap:break-word;'><b>Description: </b>" + message + "<br/>"
                  + "<b>Rating </b>" + rating + "<br/>"
                   + "<b>Likes: </b>" + likes + "<br/>"
                   + "<b>Dislikes: </b>" + dislikes + "<br/>"
                     + "<b>CommentCount: </b>" + comments + "<br/>"
                      + "<b>ViewCount: </b>" + viewcount + "<br/>"
                       + "<b>url: </b>" + url + "<br/>"
                       + "<input type='checkbox' onclick='ShowRelatedVideos(this);' searchquery='" + title + "' ' value='Show Related Videos' /><label>Show Related Videos</label>"
                     + "</div>"
                  );

            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);

            YoutubeStationLocation.push(OneMap.map.graphics.add(graphic));
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



        localStorage.setItem("checkyoutube", "unchecked"); //remove graphics
        for (var a = Youtubecustomeventheatlocation.length - 1; a >= 0; a--) {
            heatmapGraphics.remove(Youtubecustomeventheatlocation[a]);


        }
        for (var i = YoutubeStationLocation.length - 1; i >= 0; i--) {
            map.graphics.remove(YoutubeStationLocation[i]);


        }

    }

}
