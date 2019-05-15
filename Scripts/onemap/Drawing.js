/*-----------------------------------------Query Original-----------------------------------------------*/
function connectToolBar() {
    dojo.connect(map, "onLoad", createToolbar(map));
}

function createToolbar(map) {
    toolbar = new esri.toolbars.Draw(map);
    dojo.connect(toolbar, "onDrawEnd", getAreaAndLength);
    //  dojo.connect(toolbar, "onDrawEnd", getGeo2);
    dojo.connect(toolbar, "onDrawEnd", findPointsInExtent);

    line2GeometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    dojo.connect(line2GeometryService, "onAreasAndLengthsComplete", outputAreaAndLength);
}


function getAreaAndLength(geometry) {
    //  map.graphics.clear();
    var symbol = new esri.symbol.SimpleFillSymbol
                        (esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol
                        (esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
    var graphic = map.graphics.add(new esri.Graphic(geometry, symbol));

    //setup the parameters for the areas and lengths operation
    var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();
    areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_FOOT;
    areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_ACRES;
    line2GeometryService.simplify([geometry], function (simplifiedGeometries) {
        areasAndLengthParams.polygons = simplifiedGeometries;
        line2GeometryService.areasAndLengths(areasAndLengthParams);
    });
}

function outputAreaAndLength(result) {
    console.log(dojo.toJson(result));

    dojo.byId("QueryTitle").innerHTML = "Query Area/Length:";
    dojo.byId("QueryArea").innerHTML = result.areas[0].toFixed(3) + " acres";
    dojo.byId("QueryLength").innerHTML = result.lengths[0].toFixed(3) + " feet";
}

var defaultSymbol, highlightSymbol, resultTemplate;

var results = [];
function findPointsInExtent(extent) {
    var graphic;
    var options = document.getElementById('SelectTheme');

    switch (options.value) {
        case 'Embassies':
            EmbassyQuery(extent);
            break;
        default:
            break;
    }

}

function EmbassyQuery(extent) {
    var PedestrianCrossingDGV = document.getElementById('EmbassyDGV');


    //Green Man
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getSeekForHelps", false);

    xmlhttp.onreadystatechange = function () {
        //ready state 4 and status 200 indicate a successful requst. 
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var xmlDoc = xmlhttp.responseXML;
            var xmlalbumsEmbassy = xmlDoc.documentElement.getElementsByTagName("SeekForHelps");
            map.infoWindow.hide();
            map.infoWindow.resize(350, 120);


            $.each(xmlalbumsEmbassy, function () {
                varname = $(this).find("ID").text();
                foodstation = $(this).find("Name").text();
                address = $(this).find("Address").text();
                postal = $(this).find("PostalCode").text();
                coordX = $(this).find("X").text();
                coordY = $(this).find("Y").text();
                var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
                Symbol = new esri.symbol.PictureMarkerSymbol('images/icons/help1.png', 50, 50);

                var PointGraphic = new esri.Graphic(point, Symbol);

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
                graphic.setSymbol(Symbol);
                graphic.setInfoTemplate(infoTemplate);

                if (extent.contains(graphic.geometry)) {
                    graphic.setSymbol(Symbol);
                    results.push(graphic.getContent());
                    HelpStationLocation.push(OneMap.map.graphics.add(graphic));
                }
                else if (graphic.symbol == highlightSymbol) {
                    graphic.setSymbol(defaultSymbol);
                }
            });
          
        }
    }
    xmlhttp.send();
}

