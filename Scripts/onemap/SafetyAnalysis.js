var safehandle;
var safehandleGeo;
var ZebraCrossingArray = [];
var PedestrianCrossingArray = [];
var innerAnalysis;
var getX;
var getY;
var defaultInnerValue;



/*-----------------------------------------Safety Analysis-----------------------------------------------*/

function connectAnalysis() {
   // bufferGeo = new esri.tasks.GeometryService("http://www.onemap.sg/arcgis/rest/services/Geometry/GeometryServer")
	bufferGeo = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    safehandle = dojo.connect(map, "onClick", function doAnalysis(evt) {
        map.graphics.clear();
        var params = new esri.tasks.BufferParameters();
        params.geometries = [evt.mapPoint];
        params.distances = [document.getElementById('Inner').value + "," + document.getElementById('Inner').value];
        params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
        params.outSpatialReference = map.spatialReference;

        defaultInnerValue = document.getElementById('Inner').value;
        bufferGeo.buffer(params, showAnalysis);
    });

    safehandleGeo = dojo.connect(map, "onClick", getAnalysis);
}

function showAnalysis(geometries) {

    var symbol = new esri.symbol.SimpleFillSymbol(
        "none",
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([250, 0, 59, 0.45]), 3
        ),
        new dojo.Color([250, 0, 59, 0.45])

      );

    dojo.forEach(geometries, function (geometry) {
        var graphic = new esri.Graphic(geometry, symbol);
        map.graphics.add(graphic);
    });
}

function innerValue() {
    if (document.getElementById('Inner')) {
        return document.getElementById('Inner').value;
    }
    else {
        return 2;
    }
}


/*-----------------------------------------Locate All HDB BTO-----------------------------------------------*/

function getAnalysis(evt) {

	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetHDB", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("HDB");

    map.infoWindow.hide();
    map.infoWindow.resize(350, 360);
    var Grid_Table = document.getElementById('HousingDevelopmentBoardDGV');

    var mp = evt.mapPoint;
    var point1 = new esri.geometry.Point({ "x": mp.x, "y": mp.y, "spatialReference": { "wkid": 3414} });

    var BTO = null;
    var Name = null;
    var Address = null;
    var CoordX = null;
    var CoordY = null;
    var Symbol = null;
    var Image = null;
    var Website = null;

	$.each(xmlalbums, function()
	{
		BTO = $(this).find("BTO").text();
		Name = $(this).find("Name").text();
		Address = $(this).find("Address").text();
		CoordX = $(this).find("X").text();
		CoordY = $(this).find("Y").text();
		Image = $(this).find("Image").text();
		Website = $(this).find("Website").text();
	
		var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);

        innerAnalysis = defaultInnerValue * "+1000";
        if (distance < innerAnalysis) {

            var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/Images/Features/HDB.png', 35, 35);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src='/Foreigners@SG/Images/Features/HDB.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + Name);
            infoTemplate.setContent(
                                    "<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                                    "<img style='width:320px; height:150px; word-wrap: break-word;' src='/Foreigners@SG/Images/Features/Construction/" + Image + "' > " +
                                    "</br>" +
                                    "<b>Build to Order:  </b>" + BTO +
                                    "</br>" +
                                    "<b>Address:  </b>" + Address +
                                    "</br>" +
                                    "</br>" +
                                    "<b>Website:  </b>" + "<a href='" + Website + "' target='_blank'/>" + Website + "</a>" +
                                    "</br>" +
                                    "</br>" +
                                    "<input type='button' id='btnBufferPoint' class='infoTempButton infoTempOrange' title='Buffer this Point' value='' onclick='getCoordXY(" + CoordX + "," + CoordY + ");resultconnectAnalysis();' />" +
            //"<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='resultsafetyAnalysis();resultDrawAnalysis(" + CoordX + ", " + CoordY + ");' />" +
            //"<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + CoordX + ", " + CoordY + ", " + '\"' + Name + '\"' + ");resultRecentTraffic();' />" +
                                    "</div>");

            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            HDBLocation.push(OneMap.map.graphics.add(graphic));
            // getSafetyCoordXY(CoordX, CoordY, Name);
        } //end if else
	
	});
}

/*-----------------------------------------Save the specified X,Y and Pass over to buffer~~-----------------------------------------------*/

var resultsafehandle;
var resultsafehandleGeo;
var resultinnerAnalysis;

function getCoordXY(x, y) {
    getX = x;
    getY = y;
}

function resultconnectAnalysis() {
    bufferGeo = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    resultdoAnalysis(); 
}


function resultdoAnalysis() {
    var point = new esri.geometry.Point({ "x": getX, "y": getY, "spatialReference": { "wkid": 3414} });
    var params = new esri.tasks.BufferParameters();
    params.geometries = [point];
    params.distances = [defaultInnerValue + "," + defaultInnerValue];
    params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
    params.outSpatialReference = map.spatialReference;

    bufferGeo.buffer(params, resultshowAnalysis);
}

var graphicHistory;

function resultshowAnalysis(geometries) {
    
    var symbol = new esri.symbol.SimpleFillSymbol(
        "none",
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([0, 242, 73, 0.55]), 3
        ),
        new dojo.Color([0, 242, 73, 0.55])

      );

    dojo.forEach(geometries, function (geometry) {
        var graphic = new esri.Graphic(geometry, symbol);
        if (PrimarySchool != undefined) {
            for (var i = PrimarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
            }
        }
        for (var i = SecondarySchool.length - 1; i >= 0; i--) {
            map.graphics.remove(SecondarySchool.splice(i, 1)[0]);
        }
        for (var i = JuniorCollege.length - 1; i >= 0; i--) {
            map.graphics.remove(JuniorCollege.splice(i, 1)[0]);
        }
        for (var i = Polytechnic.length - 1; i >= 0; i--) {
            map.graphics.remove(Polytechnic.splice(i, 1)[0]);
        }
        for (var i = University.length - 1; i >= 0; i--) {
            map.graphics.remove(University.splice(i, 1)[0]);
        }
        map.graphics.remove(graphicHistory);
        for (var i = 0; i < safetyResultGraphic.length; i++) {
            map.graphics.remove(safetyResultGraphic[i]);
        }
        for (var i = 0; i < BusStop.length; i++) {
            map.graphics.remove(BusStop[i]);
        }
        for (var i = 0; i < BusStopRoute.length; i++) {
            map.graphics.remove(BusStopRoute[i]);
        }
        map.graphics.remove(multiGraphicHistory);
        graphicHistory = graphic;
        map.graphics.add(graphic);
    });
    resultgetAnalysis();
}

/*-----------------------------------------Initialize-----------------------------------------------*/

function resultgetAnalysis() {
    var Grid_Table = document.getElementById('PrimarySchoolDGV');
    var SecondarySchoolDGV = document.getElementById('SecondarySchoolDGV');
    var JuniorCollegeDGV = document.getElementById('JuniorCollegeDGV');
    var PolytechnicDGV = document.getElementById('PolytechnicDGV');
    var UniversityDGV = document.getElementById('UniversityDGV');
    var point1 = new esri.geometry.Point({ "x": getX, "y": getY, "spatialReference": { "wkid": 3414} });
    resultinnerAnalysis = defaultInnerValue * "+1000";

    //    //Primary School
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Foreigners@SG/WebService.asmx/GetPrimarySchool",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsPr = xmlDoc.documentElement.getElementsByTagName("PrimarySchool");
	
	$.each(xmlalbumsPr, function()
	{
		var school = $(this).find("School").text();
		var address = $(this).find("Address").text();
		var website = $(this).find("Website").text();
		var postalcode = $(this).find("PostalCode").text();
		var image = $(this).find("Logo").text();

		coordX = $(this).find("X").text();
		coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);

        if (distance < resultinnerAnalysis) {
            var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/Images/Features/PrimarySchool.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src='/Foreigners@SG/Images/Features/PrimarySchool.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                    "<img class='infoTempImage' style='width:200px; height:150px; word-wrap: break-word;' src='/Foreigners@SG/Images/Features/Primary/" + image + "'>" +
                    "<br/>" +
                    "<br/>" +
                    "<br/>" +
                    "<b>Address: </b>" + address +
                    "<br/>" +
                    "<b>PostalCode: </b>" + postalcode +
                    "<br/>" +
                    "<b>Website: </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>" +
                    "<br/>" +
                    "<br/>" +
                    "<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysis();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + PrimarySchool.length + ", " + '\"primary\"' + ");' />" +
                    "<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultRecentTraffic();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + PrimarySchool.length + ", " + '\"primary\"' + ");' />" +
                    "<input type='button' id='btnMultiRouteBusStop' class='infoTempButton infoTempOrange' title='Nearby route to Bus Stop' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");connectRoutePoint();connectDoRoutePoint(" + coordX + ", " + coordY + ");removeSchool(" + PrimarySchool.length + ", " + '\"primary\"' + ");' />" +
                    "<br/>" +
                    "<small><a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"From\"' + ");resultRecentTrafficCanvas(" + '\"From\"' + ")' >Compare From</a> " +
                    " / " +
                    "<a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"To\"' + ");resultRecentTrafficCanvas(" + '\"To\"' + ")' >Compare To</a></small> " +
                    "</div>");
            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            PrimarySchool.push(OneMap.map.graphics.add(graphic));
        }
	}
	);

    //    //Secondary School
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetSecondarySchool", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsSec = xmlDoc.documentElement.getElementsByTagName("SecondarySchool");
	
	$.each(xmlalbumsSec, function()
	{
		var school = $(this).find("School").text();
		var address = $(this).find("Address").text();
		var website = $(this).find("Website").text();
		var postalcode = $(this).find("PostalCode").text();
		var image = $(this).find("Logo").text();

		coordX = $(this).find("X").text();
		coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);

        if (distance < resultinnerAnalysis) {
            var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/Images/Features/SecondarySchool.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/Foreigners@SG/Images/Features/SecondarySchool.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                    "<img class='infoTempImage' style='width:200px; height:150px; word-wrap: break-word;' src='/Foreigners@SG/Images/Features/Secondary/" + image + "'>" +
                    "<br/>" +
                    "<br/>" +
                    "<br/>" +
                    "<b>Address: </b>" + address +
                    "<br/>" +
                    "<b>PostalCode: </b>" + postalcode +
                    "<br/>" +
                    "<b>Website: </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>" +
                    "<br/>" +
                    "<br/>" +
                    "<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysis();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + SecondarySchool.length + ", " + '\"secondary\"' + ");' />" +
                    "<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultRecentTraffic();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + SecondarySchool.length + ", " + '\"secondary\"' + ");' />" +
                    "<input type='button' id='btnMultiRouteBusStop' class='infoTempButton infoTempOrange' title='Nearby route to Bus Stop' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");connectRoutePoint();connectDoRoutePoint(" + coordX + ", " + coordY + ");removeSchool(" + SecondarySchool.length + ", " + '\"secondary\"' + ");' />" +
                    "<br/>" +
                    "<small><a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"From\"' + ");resultRecentTrafficCanvas(" + '\"From\"' + ")' >Compare From</a> " +
                    " / " +
                    "<a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"To\"' + ");resultRecentTrafficCanvas(" + '\"To\"' + ")' >Compare To</a></small> " +
                    "</div>");
            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            SecondarySchool.push(OneMap.map.graphics.add(graphic));
        }
	}
	);
	
    //    //Junior College
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetJuniorCollege", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsJr = xmlDoc.documentElement.getElementsByTagName("JuniorCollege");

	$.each(xmlalbumsJr, function()
	{
		var school = $(this).find("School").text();
		var address = $(this).find("Address").text();
		var website = $(this).find("Website").text();
		var postalcode = $(this).find("PostalCode").text();
		var image = $(this).find("Logo").text();

		coordX = $(this).find("X").text();
		coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);

        if (distance < resultinnerAnalysis) {
            var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/Images/Features/JuniorCollege.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/Foreigners@SG/Images/Features/JuniorCollege.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                    "<img class='infoTempImage' style='width:200px; height:150px; word-wrap: break-word;' src='/Foreigners@SG/Images/Features/JuniorCollege/" + image + "'>" +
                    "<br/>" +
                    "<br/>" +
                    "<br/>" +
                    "<b>Address: </b>" + address +
                    "<br/>" +
                    "<b>PostalCode: </b>" + postalcode +
                    "<br/>" +
                    "<b>Website: </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>" +
                    "<br/>" +
                    "<br/>" +
                    "<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysis();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + JuniorCollege.length + ", " + '\"juniorcollege\"' + ");' />" +
                    "<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultRecentTraffic();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + JuniorCollege.length + ", " + '\"juniorcollege\"' + ");' />" +
                    "<input type='button' id='btnMultiRouteBusStop' class='infoTempButton infoTempOrange' title='Nearby route to Bus Stop' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");connectRoutePoint();connectDoRoutePoint(" + coordX + ", " + coordY + ");removeSchool(" + JuniorCollege.length + ", " + '\"juniorcollege\"' + ");' />" +
                    "<br/>" +
                    "<small><a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"From\"' + ");resultRecentTrafficCanvas(" + '\"From\"' + ")' >Compare From</a> " +
                    " / " +
                    "<a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"To\"' + ");resultRecentTrafficCanvas(" + '\"To\"' + ")' >Compare To</a></small> " +
                    "</div>");
            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            JuniorCollege.push(OneMap.map.graphics.add(graphic));
        }
	
	}
	);
	
    //    //Polytechnic
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetPolytechnic", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsPoly = xmlDoc.documentElement.getElementsByTagName("Polytechnic");
	
	$.each(xmlalbumsPoly, function()
	{
		var school = $(this).find("School").text();
		var address = $(this).find("Address").text();
		var website = $(this).find("Website").text();
		var postalcode = $(this).find("PostalCode").text();
		var image = $(this).find("Logo").text();

		coordX = $(this).find("X").text();
		coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);

        if (distance < resultinnerAnalysis) {
            var symbol = new esri.symbol.PictureMarkerSymbol('/Foreigners@SG/Images/Features/Polytechnic.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/Foreigners@SG/Images/Features/Polytechnic.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                    "<img class='infoTempImage' style='width:200px; height:150px; word-wrap: break-word;' src='/Foreigners@SG/Images/Features/Polytechnic/" + image + "'>" +
                    "<br/>" +
                    "<br/>" +
                    "<br/>" +
                    "<b>Address: </b>" + address +
                    "<br/>" +
                    "<b>PostalCode: </b>" + postalcode +
                    "<br/>" +
                    "<b>Website: </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>" +
                    "<br/>" +
                    "<br/>" +
                    "<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysis();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + Polytechnic.length + ", " + '\"polytechnic\"' + ");' />" +
                    "<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultRecentTraffic();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + Polytechnic.length + ", " + '\"polytechnic\"' + ");' />" +
                    "<input type='button' id='btnMultiRouteBusStop' class='infoTempButton infoTempOrange' title='Nearby route to Bus Stop' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");connectRoutePoint();connectDoRoutePoint(" + coordX + ", " + coordY + ");removeSchool(" + Polytechnic.length + ", " + '\"polytechnic\"' + ");' />" +
                    "<br/>" +
                    "<small><a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"From\"' + ");resultRecentTrafficCanvas(" + '\"From\"' + ")' >Compare From</a> " +
                    " / " +
                    "<a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"To\"' + ");resultRecentTrafficCanvas(" + '\"To\"' + ")' >Compare To</a></small> " +
                    "</div>");
            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            Polytechnic.push(OneMap.map.graphics.add(graphic));
        }
	}
	);
	

    //University
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetUniversity", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsUni = xmlDoc.documentElement.getElementsByTagName("University");
	
	$.each(xmlalbumsUni,function()
	{
		var school = $(this).find("School").text();
		var address = $(this).find("Address").text();
		var website = $(this).find("Website").text();
		var postalcode = $(this).find("PostalCode").text();
		var image = $(this).find("Logo").text();

		coordX = $(this).find("X").text();
		coordY = $(this).find("Y").text();
 
        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);

        if (distance < resultinnerAnalysis) {
            var symbol = new esri.symbol.PictureMarkerSymbol('Foreigners@SG/Images/Features/University.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/Foreigners@SG/Images/Features/University.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                    "<img class='infoTempImage' style='width:200px; height:150px; word-wrap: break-word;' src='/Foreigners@SG/Images/Features/University/" + image + "'>" +
                    "<br/>" +
                    "<br/>" +
                    "<br/>" +
                    "<b>Address: </b>" + address +
                    "<br/>" +
                    "<b>PostalCode: </b>" + postalcode +
                    "<br/>" +
                    "<b>Website: </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>" +
                    "<br/>" +
                    "<br/>" +
                    "<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysis();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + University.length + ", " + '\"university\"' + ");' />" +
                    "<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultRecentTraffic();resultDrawAnalysis(" + coordX + ", " + coordY + ");removeSchool(" + University.length + ", " + '\"university\"' + ");' />" +
                    "<input type='button' id='btnMultiRouteBusStop' class='infoTempButton infoTempOrange' title='Nearby route to Bus Stop' value='' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");connectRoutePoint();connectDoRoutePoint(" + coordX + ", " + coordY + ");removeSchool(" + University.length + ", " + '\"university\"' + ");' />" +
                    "<br/>" +
                    "<small><a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"From\"' + ");resultRecentTrafficCanvas(" + '\"From\"' + ")' >Compare From</a> " +
                    " / " +
                    "<a href='#' onclick='getSafetyCoordXY(" + coordX + ", " + coordY + ", " + '\"' + school + '\"' + ");resultsafetyAnalysisCanvas(" + '\"To\"' + ");resultRecentTrafficCanvas(" + '\"To\"' + ")' >Compare To</a></small> " +
                    "</div>");
            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            University.push(OneMap.map.graphics.add(graphic));
        }
	}
	);
	
}

function removeSchool(schoolPoint, schools) {
    switch (schools) {
        case "primary":
            for (var i = 0; i < PrimarySchool.length; i++) {
                if (i == schoolPoint) {

                }
                else {
                    map.graphics.remove(PrimarySchool[i]);
                }
            }
            for (var i = SecondarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(SecondarySchool.splice(i, 1)[0]);
            }
            for (var i = JuniorCollege.length - 1; i >= 0; i--) {
                map.graphics.remove(JuniorCollege.splice(i, 1)[0]);
            }
            for (var i = Polytechnic.length - 1; i >= 0; i--) {
                map.graphics.remove(Polytechnic.splice(i, 1)[0]);
            }
            for (var i = University.length - 1; i >= 0; i--) {
                map.graphics.remove(University.splice(i, 1)[0]);
            }
            break;
        case "secondary":
            for (var i = 0; i < SecondarySchool.length; i++) {
                if (i == schoolPoint) {

                }
                else {
                    map.graphics.remove(SecondarySchool[i]);

                }
            }
            for (var i = PrimarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
            }
            for (var i = JuniorCollege.length - 1; i >= 0; i--) {
                map.graphics.remove(JuniorCollege.splice(i, 1)[0]);
            }
            for (var i = Polytechnic.length - 1; i >= 0; i--) {
                map.graphics.remove(Polytechnic.splice(i, 1)[0]);
            }
            for (var i = University.length - 1; i >= 0; i--) {
                map.graphics.remove(University.splice(i, 1)[0]);
            }
            break;
        case "juniorcollege":
            for (var i = 0; i < JuniorCollege.length; i++) {
                if (i == schoolPoint) {

                }
                else {
                    map.graphics.remove(JuniorCollege[i]);
                }
            }
            for (var i = PrimarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
            }
            for (var i = SecondarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(SecondarySchool.splice(i, 1)[0]);
            }
            for (var i = Polytechnic.length - 1; i >= 0; i--) {
                map.graphics.remove(Polytechnic.splice(i, 1)[0]);
            }
            for (var i = University.length - 1; i >= 0; i--) {
                map.graphics.remove(University.splice(i, 1)[0]);
            }
            break;
        case "polytechnic":
            for (var i = 0; i < Polytechnic.length; i++) {
                if (i == schoolPoint) {

                }
                else {
                    map.graphics.remove(Polytechnic[i]);
                }
            }
            for (var i = PrimarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
            }
            for (var i = JuniorCollege.length - 1; i >= 0; i--) {
                map.graphics.remove(JuniorCollege.splice(i, 1)[0]);
            }
            for (var i = SecondarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(SecondarySchool.splice(i, 1)[0]);
            }
            for (var i = University.length - 1; i >= 0; i--) {
                map.graphics.remove(University.splice(i, 1)[0]);
            }
            break;
        case "university":
            for (var i = 0; i < University.length; i++) {
                if (i == schoolPoint) {

                }
                else {
                    map.graphics.remove(University[i]);
                }
            }
            for (var i = PrimarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
            }
            for (var i = JuniorCollege.length - 1; i >= 0; i--) {
                map.graphics.remove(JuniorCollege.splice(i, 1)[0]);
            }
            for (var i = Polytechnic.length - 1; i >= 0; i--) {
                map.graphics.remove(Polytechnic.splice(i, 1)[0]);
            }
            for (var i = SecondarySchool.length - 1; i >= 0; i--) {
                map.graphics.remove(SecondarySchool.splice(i, 1)[0]);
            }
            break;
        default:
    }
}

/*-----------------------------------------Safety Feature Chart-----------------------------------------------*/

var getXSafety;
var getYSafety;
var actualName;

function getSafetyCoordXY(x, y, name) {
    getXSafety = x;
    getYSafety = y;
    actualName = name;
}

var wd = 380;
var ht = 150;
var chartParams = { cht: "p3", chl: "GreenMan|ZebraCrossing|SchoolZone|OverheadBridge" };
var StoreZebraCrossing = 0;
var StorePedestrianCrossing = 0;
var StoreSchoolZone = 0;
var StoreOverheadBridge = 0;

function resultsafetyAnalysis() {
    StoreZebraCrossing = 0;
    StorePedestrianCrossing = 0;
    StoreSchoolZone = 0;
    StoreOverheadBridge = 0;

    var ZebraCrossingDGV = document.getElementById('ZebraCrossingDGV');
    var PedestrianCrossingDGV = document.getElementById('PedestrianCrossingDGV');
    var SchoolZoneDGV = document.getElementById('SchoolZoneDGV');
    var OverHeadBridgeDGV = document.getElementById('OverHeadBridgeDGV');

    var schoolPoint = new esri.geometry.Point({ "x": getXSafety, "y": getYSafety, "spatialReference": { "wkid": 3414} });

    resultinnerAnalysis = defaultInnerValue * "+1000";

	
	//Zebra
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetZebraCrossing", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsZebra = xmlDoc.documentElement.getElementsByTagName("ZebraCrossing");
	
	$.each(xmlalbumsZebra, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StoreZebraCrossing++;
        }
	}
	);

	//PedestrainCrossing
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetPedestrianCrossing", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsPedestrain = xmlDoc.documentElement.getElementsByTagName("PedestrianCrossing");

	$.each(xmlalbumsPedestrain, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StorePedestrianCrossing++;
        }
	}
	);
	
	//School Zone
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetSchoolZone", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsSchoolZone = xmlDoc.documentElement.getElementsByTagName("SchoolZone");
	
	$.each(xmlalbumsSchoolZone, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StoreSchoolZone++;
        }
	}
	);

	//OverHeadBridge
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetOverHeadBridge", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("OverheadBridge");
	
	$.each(xmlalbums, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StoreOverheadBridge++;
        }
	}
	);
	
    var params = dojo.mixin({
        chf: "bg,s,FFFFFF50",
        chs: wd + "x" + ht,
        chd: "t:" + StorePedestrianCrossing + "," + StoreZebraCrossing + "," + StoreSchoolZone + "," + StoreOverheadBridge
    }, chartParams);

    if (!(StorePedestrianCrossing && StoreZebraCrossing && StoreSchoolZone && StoreOverheadBridge) == 0) {
        map.infoWindow.setTitle("Safety Items around </br>" + actualName);
        map.infoWindow.setContent("<div style='width:320px; height:270px;'>" +
                                     "<b>No.Green Man</b>: " + StorePedestrianCrossing + "<br />" +
                                     "<b>No.Zebra Crossing</b>: " + StoreZebraCrossing + "<br />" +
                                     "<b>No.School Zone</b>: " + StoreSchoolZone + "<br />" +
                                     "<b>No.Overhead Bridge</b>: " + StoreOverheadBridge + "<br />" + "<br />" +
                                     "<img style='width:320px; height:150px; word-wrap: break-word;' src=\"" + "http://chart.apis.google.com/chart?" +
                                     decodeURIComponent(dojo.objectToQuery(params)) + "\" />" +
                                     "<br/>" +
                                     "<small>Within " + defaultInnerValue + " Kilometers Area</small>" +
                                     "</div>");
    }
    else {
        map.infoWindow.setTitle("Safety Items around </br>" + actualName);
        map.infoWindow.setContent("<div style='width:320px; height:270px;'>" +
                                     "<p>No Safety Feature within this Area</p>" +
                                     "<small>Within " + defaultInnerValue + " Kilometers Area</small>" +
                                     "</div>");
    }

    // map.infoWindow.show(map.toScreen(click), map.getInfoWindowAnchor(map.toScreen(click)))

}

function resultsafetyAnalysisCanvas(ToFrom) {
    StoreZebraCrossing = 0;
    StorePedestrianCrossing = 0;
    StoreSchoolZone = 0;
    StoreOverheadBridge = 0;

    var ZebraCrossingDGV = document.getElementById('ZebraCrossingDGV');
    var PedestrianCrossingDGV = document.getElementById('PedestrianCrossingDGV');
    var SchoolZoneDGV = document.getElementById('SchoolZoneDGV');
    var OverHeadBridgeDGV = document.getElementById('OverHeadBridgeDGV');

    var schoolPoint = new esri.geometry.Point({ "x": getXSafety, "y": getYSafety, "spatialReference": { "wkid": 3414} });

    resultinnerAnalysis = defaultInnerValue * "+1000";

	//Zebra Crossing
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetZebraCrossing", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsZebraCrossing = xmlDoc.documentElement.getElementsByTagName("ZebraCrossing");
	
	$.each(xmlalbumsZebraCrossing, function() 
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StoreZebraCrossing++;
        }
	}
	);
	
	//PedestrianCrossing
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetPedestrianCrossing", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsPedestrainCrossing = xmlDoc.documentElement.getElementsByTagName("PedestrianCrossing");
	
	$.each(xmlalbumsPedestrainCrossing, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StorePedestrianCrossing++;
        }
	}
	);

	//SchoolZone
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetSchoolZone", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsSchoolZone = xmlDoc.documentElement.getElementsByTagName("SchoolZone");
	
	$.each(xmlalbumsSchoolZone, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StoreSchoolZone++;
        }
	}
	);
	
	//OverheadBridge
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetOverHeadBridge", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsOverheadBridge = xmlDoc.documentElement.getElementsByTagName("OverheadBridge");
	
	$.each(xmlalbumsOverheadBridge, function()
	{
		CoordX = $(this).find("X").text();
        CoordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);

        if (distance < resultinnerAnalysis) {
            StoreOverheadBridge++;
        }
	}
	);
	

    if (ToFrom == "From") {
        compareFrom(actualName, StoreZebraCrossing, StorePedestrianCrossing, StoreSchoolZone, StoreOverheadBridge);
    }
    else {
        compareTo(actualName, StoreZebraCrossing, StorePedestrianCrossing, StoreSchoolZone, StoreOverheadBridge);
    }
}

function resultDrawAnalysis(x, y) {
    bufferGeo = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    var point2 = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });
    var params = new esri.tasks.BufferParameters();
    params.geometries = [point2];
    params.distances = [defaultInnerValue + "," + defaultInnerValue];
    params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
    params.outSpatialReference = map.spatialReference;
    bufferGeo.buffer(params, resultshowAnalysisDraw);
}

var safetyResultGraphic = [];
function resultshowAnalysisDraw(geometries) {
    var symbol = new esri.symbol.SimpleFillSymbol(
        "none",
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([158, 0, 237, 0.55]), 3
        ),
        new dojo.Color([158, 0, 237, 0.55])

      );

    dojo.forEach(geometries, function (geometry) {
        var graphic = new esri.Graphic(geometry, symbol);
        for (var i = 0; i < safetyResultGraphic.length; i++) {
            map.graphics.remove(safetyResultGraphic[i]);
        }
        safetyResultGraphic.push(graphic);
        map.graphics.add(graphic);
    });
}

/*-----------------------------------------Traffic Feature Chart -----------------------------------------------*/

var wdTraffic = 380;
var htTraffic = 150;
var chartParamsTraffic = { cht: "p3", chl: "Heavy Traffic|Road Work|Vehicle Breakdown|Accident|Obstacle" };

var StoreHeavyTraffic = 0;
var StoreRoadWork = 0;
var StoreVehicleBreakdown = 0;
var StoreAccident = 0;
var StoreObstacle = 0;

function resultRecentTraffic() {
    var TodayDate = new Date();
    TodayDate.setDate(TodayDate.getDate());

    var PastDate = new Date();
    PastDate.setDate(PastDate.getDate() - 30);

    StoreHeavyTraffic = 0;
    StoreRoadWork = 0;
    StoreVehicleBreakdown = 0;
    StoreAccident = 0;
    StoreObstacle = 0;

    var PD = Date.parse(PastDate.format("d MMM yyyy")); 
    var TD = Date.parse(TodayDate.format("d MMM yyyy"));

    var Grid_Table = document.getElementById("livetrafficIncidentDGV");

	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetTraffic", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbumsTraffic = xmlDoc.documentElement.getElementsByTagName("Traffic");
	
	$.each(xmlalbumsTraffic, function()
	{
		var OD = Date.parse($(this).find("date").text());
        var PD = Date.parse(PastDate);
        var TD = Date.parse(TodayDate);
        if (OD >= PD && OD <= TD) {
            var schoolPoint = new esri.geometry.Point({ "x": getXSafety, "y": getYSafety, "spatialReference": { "wkid": 3414} });

            resultinnerAnalysis = defaultInnerValue * "+1000";

            var type = $(this).find("IncidentType").text();
            var point = new esri.geometry.Point({ "x": $(this).find("actualX").text(), "y": $(this).find("actualY").text(), "spatialReference": { "wkid": 3414} });
            var distance = esri.geometry.getLength(point, schoolPoint);
            if (distance < resultinnerAnalysis) {
                if (type == "Heavy Traffic") {
                    StoreHeavyTraffic++;
                }
                else if (type == "Road Work") {
                    StoreRoadWork++;
                }
                else if (type == "Vehicle Breakdown") {
                    StoreVehicleBreakdown++;
                }
                else if (type == "Accident") {
                    StoreAccident++;
                }
                else if (type == "Obstacle") {
                    StoreObstacle++;
                }
            }
            var params = dojo.mixin({
                chf: "bg,s,FFFFFF50",
                chs: wdTraffic + "x" + htTraffic,
                chd: "t:" + StoreHeavyTraffic + "," + StoreRoadWork + "," + StoreVehicleBreakdown + "," + StoreAccident + "," + StoreObstacle
            }, chartParamsTraffic);
            if (StoreHeavyTraffic != 0 || StoreRoadWork != 0 || StoreVehicleBreakdown != 0 || StoreAccident != 0 || StoreObstacle != 0) {
                map.infoWindow.setTitle("Recent Traffic History </br>" + actualName);
                map.infoWindow.setContent("<div style='width:320px; height:270px;'>" +
                                     "<b>No.Heavy Traffic</b>: " + StoreHeavyTraffic + "<br />" +
                                     "<b>No.Road Work</b>: " + StoreRoadWork + "<br />" +
                                     "<b>No.Vehicle Breakdown</b>: " + StoreVehicleBreakdown + "<br />" +
                                     "<b>No.Accident</b>: " + StoreAccident + "<br />" +
                                     "<b>No.Obstacle</b>: " + StoreObstacle + "<br />" + "<br />" +
                                     "<img style='width:320px; height:150px; word-wrap: break-word;' src=\"" + "http://chart.apis.google.com/chart?" +
                                     decodeURIComponent(dojo.objectToQuery(params)) + "\" />" +
                                     "<br/>" +
                                     "<small>Within " + defaultInnerValue + " Kilometers Area " +
                                     "<br />" +
                                     "History of Past Month" +
                                     "</small>" +
                                     "</div>");
            }
            else {
                map.infoWindow.setTitle("Recent Traffic History </br>" + actualName);
                map.infoWindow.setContent("<div style='width:320px; height:270px;'>" +
                                     "<p>No Traffic History within this Area</p>" +
                                     "<small>Within " + defaultInnerValue + " Kilometers Area</small>" +
                                     "</div>");
            }
        }
	}
	);
}


var TrafficToFrom;
var month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var storeAccidenti1 = []; //First School
var storeAccidentIndex1 = 0;
var storeAccidenti2 = []; //Second School
var storeAccidentIndex2 = 0;

function resultRecentTrafficCanvas(ToFrom) {
    if (ToFrom == "From") {
        month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        StoreAccident = 0;
        storeAccidenti1 = [];
        storeAccidentIndex1 = 0;
        
        var Grid_Table = document.getElementById("livetrafficIncidentDGV");

		//GetTraffic
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetTraffic", false);
		xmlhttp.send();
		var xmlDoc = xmlhttp.responseXML;
		var xmlalbumsTraffic = xmlDoc.documentElement.getElementsByTagName("Traffic");
		
		var i = 0;
		$.each(xmlalbumsTraffic, function()
		{
		 if ($(this).find("IncidentType").text() == "Accident") {
				var schoolPoint = new esri.geometry.Point({ "x": getXSafety, "y": getYSafety, "spatialReference": { "wkid": 3414} });

				resultinnerAnalysis = defaultInnerValue * "+1000";

				var point = new esri.geometry.Point({ "x": $(this).find("actualX").text(), "y": $(this).find("actualY").text(), "spatialReference": { "wkid": 3414} });

				var distance = esri.geometry.getLength(point, schoolPoint);
				if (distance < resultinnerAnalysis) {
					StoreAccident++;
					storeAccidenti1[storeAccidentIndex1] = i;
					storeAccidentIndex1++;
					var monthlyString = $(this).find("date").text();
					var removeString = monthlyString.split(' ')
					monthlyAccident = removeString[1];
					switch (monthlyAccident) {
						case "Jan":
							month[1]++;
							break;
						case "Feb":
							month[2]++;
							break;
						case "Mar":
							month[3]++;
							break;
						case "Apr":
							month[4]++;
							break;
						case "May":
							month[5]++;
							break;
						case "Jun":
							month[6]++;
							break;
						case "Jul":
							month[7]++;
							break;
						case "Aug":
							month[8]++;
							break;
						case "Sep":
							month[9]++;
							break;
						case "Oct":
							month[10]++;
							break;
						case "Nov":
							month[11]++;
							break;
						case "Dec":
							month[12]++;
							break;
						default:
							break;
					}
				}
				i++
			}
		}
		);
        compareTrafficFrom(actualName, StoreAccident, month);
    }
    else if (ToFrom == "To") {
        month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        StoreAccident = 0;
        storeAccidenti2 = [];
        storeAccidentIndex2 = 0;

        var Grid_Table = document.getElementById("livetrafficIncidentDGV");
		
		//GetTraffic
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/GetTraffic", false);
		xmlhttp.send();
		var xmlDoc = xmlhttp.responseXML;
		var xmlalbumsTraffic = xmlDoc.documentElement.getElementsByTagName("Traffic");
		var i2 = 0;
		
		$.each(xmlalbumsTraffic, function()
		{
			if ($(this).find("IncidentType").text() == "Accident") {
					
					var schoolPoint = new esri.geometry.Point({ "x": getXSafety, "y": getYSafety, "spatialReference": { "wkid": 3414} });

					resultinnerAnalysis = defaultInnerValue * "+1000";

					var point = new esri.geometry.Point({ "x": $(this).find("actualX").text(), "y": $(this).find("actualY").text(), "spatialReference": { "wkid": 3414} });

					var distance = esri.geometry.getLength(point, schoolPoint);
					if (distance < resultinnerAnalysis) {
						StoreAccident++;
						storeAccidenti2[storeAccidentIndex2] = i2;
						storeAccidentIndex2++;
						var monthlyString = $(this).find("date").text();
						var removeString = monthlyString.split(' ')
						monthlyAccident = removeString[1];
						switch (monthlyAccident) {
							case "Jan":
								month[1]++;
								break;
							case "Feb":
								month[2]++;
								break;
							case "Mar":
								month[3]++;
								break;
							case "Apr":
								month[4]++;
								break;
							case "May":
								month[5]++;
								break;
							case "Jun":
								month[6]++;
								break;
							case "Jul":
								month[7]++;
								break;
							case "Aug":
								month[8]++;
								break;
							case "Sep":
								month[9]++;
								break;
							case "Oct":
								month[10]++;
								break;
							case "Nov":
								month[11]++;
								break;
							case "Dec":
								month[12]++;
								break;
							default:
								break;
						}
					}
					i2++;
				}
		}
		);
        compareTrafficTo(actualName, StoreAccident, month);
    }
}

function safeAnalysis(control) {
    if (control.value == "Activate Buffer") {
        connectAnalysis();
        control.value = "Deactivate Buffer";
    }
    else {
        control.value = "Activate Buffer";
        disconnectAnalysis();
    }
}

function disconnectAnalysis() {
    dojo.disconnect(safehandle);
    dojo.disconnect(safehandleGeo);
}
