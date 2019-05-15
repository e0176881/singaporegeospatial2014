var resultRouteInnerAnalysis;

function connectRoutePoint() {
    bufferGeo = new esri.tasks.GeometryService("http://www.onemap.sg/arcgis/rest/services/Geometry/GeometryServer")
    connectDoRoutePoint();
}

function connectDoRoutePoint(x, y) {
    var point = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });
    var routePara = new esri.tasks.BufferParameters();
    routePara.geometries = [point];
    routePara.distances = [defaultInnerValue + "," + defaultInnerValue];
    routePara.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
    routePara.outSpatialReference = map.spatialReference;

    bufferGeo.buffer(routePara, resultShowRoutePoint)
}

var multiGraphicHistory;
function resultShowRoutePoint(geometries) {
    var routeS = new esri.symbol.SimpleFillSymbol(
        "none",
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([255, 132, 0, 0.75]), 3
        ),
        new dojo.Color([255, 132, 0, 0.75])

      );

    dojo.forEach(geometries, function (geometry) {
        var graphic = new esri.Graphic(geometry, routeS);
        map.graphics.remove(multiGraphicHistory);
        multiGraphicHistory = graphic;
        map.graphics.add(graphic);
    });
    resultNearbyBusStop();
}

var BusStop = [];
var BusStopRoute = [];
function resultNearbyBusStop() {
    for (var i = 0; i < BusStop.length; i++) {
        map.graphics.remove(BusStop[i]);
    }
    for (var i = 0; i < BusStopRoute.length; i++) {
        map.graphics.remove(BusStopRoute[i]);
    }
    BusStop = [];
    BusStopRoute = [];
    var BusDGV = document.getElementById('BusDGV');
    var points1 = new esri.geometry.Point({ "x": getXSafety, "y": getYSafety, "spatialReference": { "wkid": 3414} });
    resultRouteInnerAnalysis = defaultInnerValue * "+1000";

    for (var i = 1; i < BusDGV.rows.length; i++) {
        var bus = BusDGV.rows[i].cells[1].textContent;
        var address = BusDGV.rows[i].cells[2].textContent;
        var routeX = BusDGV.rows[i].cells[3].textContent;
        var routeY = BusDGV.rows[i].cells[4].textContent;

        var points2 = new esri.geometry.Point({ "x": routeX, "y": routeY, "spatialReference": { "wkid": 3414} });
        var dis = esri.geometry.getLength(points1, points2);

        if (dis < resultRouteInnerAnalysis) {
            var sym = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/BusStop.png', 30, 30);
            var graphic = new esri.Graphic(points2, sym);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/BusStop.png' style='width:25px; height:25px;'/>&nbsp;&nbsp;" + "Multi Route");
            infoTemplate.setContent("<div id='infoTempImage1' style'width:320px; height:270px; word-wrap: break-word;'>" +
            "<br/>" +
            "<b>Bustop Num: </b>" + bus +
            "<br/>" +
            "<b>Address: </b>" + address +
            "<br/>" +
            "</div>");

            map.graphics.add(graphic);
            graphic.setSymbol(sym);
            graphic.setInfoTemplate(infoTemplate);
            BusStop.push(graphic);

            routeNearBusStop.stops.features[0] = map.graphics.add(new esri.Graphic(points1));
            routeNearBusStop.stops.features[1] = map.graphics.add(new esri.Graphic(points2));

            routeT.solve(routeNearBusStop);
        }
    }
}

function showRouteMulti(solveR) {
    var routeM = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 0.8])).setWidth(5);
    if (document.getElementById('cbHospital')) {
        routeM = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([255, 106, 106, 0.8])).setWidth(5);
    }
    else {
        routeM = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 0.8])).setWidth(5);
    }
    map.graphics.add(solveR.routeResults[0].route.setSymbol(routeM));
    BusStopRoute.push(solveR.routeResults[0].route.setSymbol(routeM));
}