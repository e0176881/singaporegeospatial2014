var nearestHealthRoute = [];
var routeNearest;

/*function nearestHealthRoute() {
//routeNearest = new esri.tasks.ClosestFacilityTask("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Closest Facility");
routeNearest = dojo.connect(map, "onClick", connectNearestRoute);
}*/

var nearestHospital = [];
var nearestHospitalRoute = [];
var storeDistance = [];
var storePoint1 = [];
var storePoint2 = [];
var storePreviousI = 0;
var specificGraphic;
var storePreviousHospitalRoute = [];

function connectNearestRoute(x, y) {
    map.infoWindow.hide();
    map.infoWindow.resize(350, 340);
    for (var i = 0; i < nearestHospital.length; i++) {
        map.graphics.remove(nearestHospital[i]);
    }
    map.graphics.remove(specificGraphic);
    nearestHospital = [];
    nearestHospitalRoute = [];
    storeDistance = [];
    storePoint2 = [];
    storePreviousI = 0;
    var point1 = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });

    var healthNearestDGV = document.getElementById('HealthBuildingDGV');



    for (var i = 1; i < healthNearestDGV.rows.length; i++) {
        if (healthNearestDGV.rows[i].cells[5].textContent == getXSafety) {

        }
        else {
            var name = healthNearestDGV.rows[i].cells[1].textContent;
            var address = healthNearestDGV.rows[i].cells[2].textContent;
            var website = healthNearestDGV.rows[i].cells[3].textContent;
            var postalcode = healthNearestDGV.rows[i].cells[4].textContent;
            var actualX = healthNearestDGV.rows[i].cells[5].textContent;
            var actualY = healthNearestDGV.rows[i].cells[6].textContent;
            var image = healthNearestDGV.rows[i].cells[8].textContent;

            var point2 = new esri.geometry.Point({ "x": actualX, "y": actualY, "spatialReference": { "wkid": 3414} });
            var distance = esri.geometry.getLength(point1, point2);
            storeDistance.push(distance)
            storePoint2.push(point2);
            var symbolNearest = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/Hospital.png', 30, 30);
            var graphic = new esri.Graphic(point2, symbolNearest);
            if (document.getElementById("cbHospital")) {

            }
            else {
                //map.graphics.add(graphic);
            }

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/Hospital.png' style='width:25px; height:25px;'/>&nbsp;&nbsp;" + name);
            infoTemplate.setContent("<img class='infoTempImage' style='width:320px; height:150px; word-wrap: break-word;' src='/SAFETY_AT_SG/Images/Features/Hospital/" + image + ".jpg'>" +
        "<br/>" +
        "<b>Address: </b>" + address +
        "<br/>" +
        "<b>Postal Code: </b>" + postalcode +
        "<br/>" +
        "<b>Website: </b>" + "<a href='http://" + website + "' target='_blank'/>" + website + "</a>" +
        "<br/>" +
        "<input type='button' id='btnHosPoint' class='infoTempButton infoTempOrange' title='click this Point' value='' onclick='connectNearestRoute(" + actualX + ", " + actualY + ");' />" +
        "</div>"
        );

            graphic.setSymbol("<img src='/SAFETY_AT_SG/Images/Features/Hospital.png' style='width:25px; height:25px;'/>&nbsp;&nbsp;" + symbolNearest);
            graphic.setInfoTemplate(infoTemplate);
            nearestHealthRoute.push(graphic);
            //alert("hi");
        }
    }

    for (var i = 0; i < storeDistance.length; i++) {
        var min = Math.min.apply(null, storeDistance)
        if (min == storeDistance[i]) {  //storeDistance = point1, point2 combined.
            /*routeNearBusStop.stops.features[0] = map.graphics.add(new esri.Graphic(point1));
            routeNearBusStop.stops.features[1] = map.graphics.add(new esri.Graphic(storePoint2[i]));
            routeT.solve(routeNearBusStop);*/
            RouteU(point1.x + ',' + point1.y + ";" + storePoint2[i].x + ',' + storePoint2[i].y);


            storePreviousHospitalRoute.push(min);
            var symbolNearest = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/Hospital.png', 30, 30);
            var graphic = new esri.Graphic(storePoint2[i], symbolNearest);
            if (document.getElementById("cbHospital")) {

            }
            else {
                map.graphics.add(graphic);
            }
            var infoTemplate = new esri.InfoTemplate();
            var distance = dojo.number.format(storeDistance[i] / 1000)
            var distanceString2 = new String(Math.round(distance * 60) / 75);
            var distanceSplit2 = distanceString2.split(".");
            infoTemplate.setTitle(healthNearestDGV.rows[i + 1].cells[1].textContent);
            infoTemplate.setContent("<img class='infoTempImage' style='width:320px; height:150px; word-wrap: break-word;' src='/SAFETY_AT_SG/Images/Features/Hospital/" + healthNearestDGV.rows[i + 1].cells[8].textContent + ".jpg'>" +
        "<br/>" +
        "<b>Address: </b>" + healthNearestDGV.rows[i + 1].cells[2].textContent +
        "<br/>" +
        "<b>Postal Code: </b>" + healthNearestDGV.rows[i + 1].cells[4].textContent +
        "<br/>" +
        "<b>Website: </b>" + "<a href='" + healthNearestDGV.rows[i + 1].cells[3].textContent + "' target='_blank'/>" + healthNearestDGV.rows[i + 1].cells[3].textContent + "</a>" +
        "<br/>" +
        "<input type='button' id='btnHosPoint' class='infoTempButton infoTempOrange' title='click this Point' value='' onclick='connectSecondNearestRoute(" + storePoint2[i].x + ", " + storePoint2[i].y + ", " + point1.x + ", " + point1.y + ");' />" +
        "<br/>" +
        "<small><b>Distance : </b>" + distance + "km</small>" +
        "<br/>" +
        "<small><b>Time : </b>" + distanceSplit2[0] + "min(s) " + distanceSplit2[1] + "second(s)</small>" + //50km/h road, 75km/h express way
        "<br/>" +
        "<small><b>Speed : </b>" + "75km/hour" + "</small>" +
        "</div>");

            graphic.setSymbol(symbolNearest);
            graphic.setInfoTemplate(infoTemplate);
            specificGraphic = graphic;
            break;

        }
    }
}

function connectSecondNearestRoute(x, y, previous1, previous2) {

    storeDistance = [];
    storePoint2 = [];
    var tempName = [];
    var tempAddress = [];
    var tempWebsite = [];
    var tempPostalCode = [];
    var tempImage = [];
    var healthNearestDGV = document.getElementById('HealthBuildingDGV');
    var point1 = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });
    //map.graphics.remove(specificGraphic);
    for (var i = 1; i < healthNearestDGV.rows.length; i++) {
        var name = healthNearestDGV.rows[i].cells[1].textContent;
        var address = healthNearestDGV.rows[i].cells[2].textContent;
        var website = healthNearestDGV.rows[i].cells[3].textContent;
        var postalcode = healthNearestDGV.rows[i].cells[4].textContent;
        var actualX = healthNearestDGV.rows[i].cells[5].textContent;
        var actualY = healthNearestDGV.rows[i].cells[6].textContent;
        var image = healthNearestDGV.rows[i].cells[8].textContent;

        var point2 = new esri.geometry.Point({ "x": actualX, "y": actualY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point1, point2);
        if (x == actualX && y == actualY || previous1 == actualX && previous2 == actualY) {
        }
        else {
            storeDistance.push(distance);
            storePoint2.push(point2);
            tempName.push(name);
            tempAddress.push(address);
            tempWebsite.push(website);
            tempPostalCode.push(postalcode);
            tempImage.push(image);
        }
    }
    var min = Math.min.apply(null, storeDistance)
    for (var i = 0; i < storeDistance.length; i++) {

        if (min == storeDistance[i]) {
            /*routeNearBusStop.stops.features[0] = map.graphics.add(new esri.Graphic(point1));
            routeNearBusStop.stops.features[1] = map.graphics.add(new esri.Graphic(storePoint2[i]));
            routeT.solve(routeNearBusStop);*/
            RouteU(point1.x + ',' + point1.y + ";" + storePoint2[i].x + ',' + storePoint2[i].y);
            var symbolNearest = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/Hospital.png', 30, 30);
            var graphic = new esri.Graphic(storePoint2[i], symbolNearest);
            map.graphics.add(graphic);
            var infoTemplate = new esri.InfoTemplate();
            var distance2 = dojo.number.format(storeDistance[i] / 1000);
            var distanceString = new String(Math.round(distance2 * 60) / 75);
            var distanceSplit = distanceString.split(".");
            infoTemplate.setTitle(tempName[i]);
            infoTemplate.setContent("<img class='infoTempImage' style='width:320px; height:150px; word-wrap: break-word;' src='/SAFETY_AT_SG/Images/Features/Hospital/" + tempImage[i] + ".jpg'>" +
        "<br/>" +
        "<b>Address: </b>" + tempAddress[i] +
        "<br/>" +
        "<b>Postal Code: </b>" + tempPostalCode[i] +
        "<br/>" +
        "<b>Website: </b>" + "<a href='" + tempWebsite[i] + "' target='_blank'/>" + tempWebsite[i] + "</a>" +
        "<br/>" +
        "<input type='button' id='btnHosPoint' class='infoTempButton infoTempOrange' title='click this Point' value='' onclick='connectSecondNearestRoute(" + storePoint2[i].x + ", " + storePoint2[i].y + ", " + point1.x + ", " + point1.y + ");' />" +
        "<br/>" +
        "<small><b>Distance : </b>" + distance2 + "km</small>" +
        "<br/>" +
        "<small><b>Time : </b>" + distanceSplit[0] + "min(s) " + distanceSplit[1] + "second(s)</small>" + //50km/h road, 75km/h express way
        "<br/>" +
        "<small><b>Speed : </b>" + "75km/hour" + "</small>" +
        "</div>");


            graphic.setSymbol(symbolNearest);
            graphic.setInfoTemplate(infoTemplate);
            //specificGraphic = graphic;
            storePreviousHospitalRoute.push(min);
            break;
        }
    }
}


/*--------------------------------------Click to Point-----------------------------------------------*/
var pointArray = [];
var checkClickPoint = 0;

function createPointToolBar() {
    if (document.getElementById("cbHospital").checked) {
        document.getElementById("cbClinic").checked = false;
        if (checkClickPoint == 0)
            checkClickPoint = dojo.connect(map, "onLoad", createPoint(map));
        else { }
    }
    else if (document.getElementById("cbClinic").checked) {
        document.getElementById("cbHospital").checked = false;
        if (checkClickPoint == 0)
            checkClickPoint = dojo.connect(map, "onLoad", createClinicPoint(map));
        else { }
    }
    else
        toolbar.deactivate();
}

function createPoint(map) {
    toolbar = new esri.toolbars.Draw(map);
    toolbar.activate(esri.toolbars.Draw.POINT);
    dojo.connect(toolbar, "onDrawEnd", clickNearestHealth);
}

function clickNearestHealth(geometry) {
    for (var i = 0; i < pointArray.length; i++) {
        map.graphics.remove(pointArray[i]);
    }

    for (var i = 0; i < BusStopRoute.length; i++) {
        map.graphics.remove(BusStopRoute[i]);
    }

    for (var i = 0; i < nearestHospital.length; i++) {
        map.graphics.remove(nearestHospital[i]);
    }

    var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/GPSPin/LocationPin.png', 40, 40);

    var graphic = new esri.Graphic(geometry, symbol);
    map.graphics.add(graphic);
    pointArray.push(graphic);
    connectNearestRoute(geometry.x, geometry.y);
    toolbar.deactivate();
    checkClickPoint = 0;
}

function createClinicPoint(map) {
    toolbar2nd = new esri.toolbars.Draw(map);
    toolbar2nd.activate(esri.toolbars.Draw.POINT);
    dojo.connect(toolbar2nd, "onDrawEnd", clickNearestClinic);
}

function clickNearestClinic(geometry) {
    for (var i = 0; i < pointArray.length; i++) {
        map.graphics.remove(pointArray[i]);
    }

    for (var i = 0; i < BusStopRoute.length; i++) {
        map.graphics.remove(BusStopRoute[i]);
    }

    for (var i = 0; i < nearestHospital.length; i++) {
        map.graphics.remove(nearestClinic[i]);
    }

    var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/GPSPin/LocationPin.png', 40, 40);

    var graphic = new esri.Graphic(geometry, symbol);
    map.graphics.add(graphic);
    pointArray.push(graphic);
    connectNearestClinic(geometry.x, geometry.y);
    toolbar2nd.deactivate();
    checkClickPoint = 0;
}

function GetHealthCareWebservice() {

    var myDate = new Date(); //GetTodays PSI Informations
    var strDate = (myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate());
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Safety_AT_SG_WebService/SgDataService.asmx/GetHospital/", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("Traffic");
    return xmlalbums;
}