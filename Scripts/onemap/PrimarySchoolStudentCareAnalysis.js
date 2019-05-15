var StudentCare = [];

function StudentCareConnectAnalysis() {
   // bufferGeo = new esri.tasks.GeometryService("http://www.onemap.sg/arcgis/rest/services/Geometry/GeometryServer")
	bufferGeo = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    safehandle = dojo.connect(map, "onClick", function doAnalysis(evt) {
        map.graphics.clear();
        var params = new esri.tasks.BufferParameters();
        params.geometries = [evt.mapPoint];
        params.distances = [document.getElementById('Inner').value + "," + document.getElementById('Outer').value];
        params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
        params.outSpatialReference = map.spatialReference;

        defaultInnerValue = document.getElementById('Inner').value;
        bufferGeo.buffer(params, StudentCareShowAnalysis);
    });

    safehandleGeo = dojo.connect(map, "onClick", StudentCareGetAnalysis);
}

function StudentCareShowAnalysis(geometries) {

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

function StudentCareInnerValue() {
    if (document.getElementById('Inner')) {
        return document.getElementById('Inner').value;
    }
    else {
        return 2;
    }
}

function GetStudentCareJson()
{
	$.getJSON("/safety_at_sg/proxy.ashx?http://www.onemap.sg/API/services.svc/mashupData?token=xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi&themeName=STUDENTCARE",function(result){
		StudentCareResultgetAnalysis(result.SrchResults);
	}
	);
}


function StudentCareGetAnalysis(evt) {

    map.infoWindow.hide();
    map.infoWindow.resize(350, 335);

    var mp = evt.mapPoint;
    var point1 = new esri.geometry.Point({ "x": mp.x, "y": mp.y, "spatialReference": { "wkid": 3414} });

	//    //Primary School
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetPrimarySchool",false);
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
		innerAnalysis = defaultInnerValue * "+1000";
		
        if (distance < innerAnalysis) {
            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/PrimarySchool.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/PrimarySchool.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<img class='infoTempImage' src='/SAFETY_AT_SG/Images/Features/Primary/" + image + "'>" +
                    "<br/>" +
                    "<b>Address: </b>" + address +
                    "<br/>" +
                    "<b>PostalCode: </b>" + postalcode +
                    "<br/>" +
                    "<b>Website: </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>" +
                    "<br/>" +
					"<input type='button' id='btnBufferPoint' class='infoTempButton infoTempOrange' title='Buffer this Point' value='' onclick='getCoordXY(" + coordX + "," + coordY + ");StudentCareResultconnectAnalysis();' />" +
                    "<br/>"
					);
            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            PrimarySchool.push(OneMap.map.graphics.add(graphic));
        }
	}
	);
}

function StudentCareResultconnectAnalysis() {
    bufferGeo = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    StudentcareResultdoAnalysis();
}

function StudentcareResultdoAnalysis() {
    var point = new esri.geometry.Point({ "x": getX, "y": getY, "spatialReference": { "wkid": 3414} });
    var params = new esri.tasks.BufferParameters();
    params.geometries = [point];
    params.distances = [defaultInnerValue + "," + defaultInnerValue];
    params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
    params.outSpatialReference = map.spatialReference;

    bufferGeo.buffer(params, StudentcareResultshowAnalysis);
}

function StudentcareResultshowAnalysis(geometries) {
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
		for (var i = StudentCare.length - 1; i >= 0; i--) {
            map.graphics.remove(StudentCare.splice(i, 1)[0]);
        }
		/*
        for (var i = PrimarySchool.length - 1; i >= 0; i--) {
            map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
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
		*/
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
    GetStudentCareJson();
}
function StudentCareResultgetAnalysis(StudentCareJson) {

	map.infoWindow.hide();
    //map.infoWindow.resize(350, 250);

	var point1 = new esri.geometry.Point({ "x": getX, "y": getY, "spatialReference": { "wkid": 3414} });
    resultinnerAnalysis = defaultInnerValue * "+1000";

    var Name = null;
    var Address = null;
    var CoordX = null;
    var CoordY = null;
    var Symbol = null;
    var Image = null;
    var Website = null;
	
	innerAnalysis = defaultInnerValue * "+1000";
	for(var i=1;i < StudentCareJson.length; i++)
	{
		var XY = (StudentCareJson[i].XY).split(",")
		Name = StudentCareJson[i].NAME;
		Address = StudentCareJson[i].ADDRESSSTREETNAME;
		CoordX = XY[0];
		CoordY = XY[1];
		Symbol = StudentCareJson[i].ICON_NAME;
		var service = StudentCareJson[i].DESCRIPTION;
		
		var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, point1);
		
		if (distance < innerAnalysis) {
			var symbol = new esri.symbol.PictureMarkerSymbol('http://www.onemap.sg/icons/STUDENTCARE/'+Symbol, 20, 20);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src='http://www.onemap.sg/icons/STUDENTCARE/" + Symbol + "' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + service);
            infoTemplate.setContent("<b>Name: </b>" + Name +
									"<br/>" +
									"<b>Address:  </b>" + Address +
                                    "</br>" +
									"<input type='button' id='btnSafetyAnalysis' class='infoTempButton infoTempOrange' title='Safety Feature around this area' value='' onclick='getSafetyCoordXY(" + CoordX + ", " + CoordY + ", " + '\"' + Name + '\"' + ");resultsafetyAnalysis();resultDrawAnalysis(" + CoordX + ", " + CoordY + ");removeSchool(" + StudentCare.length + ", " + '\"primary\"' + ");' />" +
									"<input type='button' id='btnRecentTraffic' class='infoTempButton infoTempOrange' title='Traffic History for the Past Month' value='' onclick='getSafetyCoordXY(" + CoordX + ", " + CoordY + ", " + '\"' + Name + '\"' + ");resultRecentTraffic();resultDrawAnalysis(" + CoordX + ", " + CoordY + ");removeSchool(" + StudentCare.length + ", " + '\"primary\"' + ");' />" +
									"<input type='button' id='btnMultiRouteBusStop' class='infoTempButton infoTempOrange' title='Nearby route to Bus Stop' value='' onclick='getSafetyCoordXY(" + CoordX + ", " + CoordY + ", " + '\"' + Name + '\"' + ");connectRoutePoint();connectDoRoutePoint(" + CoordX + ", " + CoordY + ");removeSchool(" + StudentCare.length + ", " + '\"primary\"' + ");' />" +
                                    "<input type='button' id='btnBufferPoint' class='infoTempButton infoTempOrange' title='Buffer this Point' value='' onclick='getCoordXY(" + CoordX + "," + CoordY + ");resultconnectAnalysis();' />" +
									"<br />"+
									"<small><a href='#' onclick='getSafetyCoordXY(" + CoordX + ", " + CoordY + ", " + '\"' + Name + '\"' + ");resultsafetyAnalysisCanvas(" + '\"From\"' + ");resultRecentTrafficCanvas(" + '\"From\"' + ")' >Compare From</a> " +
									" / " +
									"<a href='#' onclick='getSafetyCoordXY(" + CoordX + ", " + CoordY + ", " + '\"' + Name + '\"' + ");resultsafetyAnalysisCanvas(" + '\"To\"' + ");resultRecentTrafficCanvas(" + '\"To\"' + ")' >Compare To</a></small> " +
                                    "</div>");

            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            StudentCare.push(OneMap.map.graphics.add(graphic));
            // getSafetyCoordXY(CoordX, CoordY, Name);
		}
	}
}

function removeSchool(schoolPoint, schools) {
	for (var i = 0; i < StudentCare.length; i++) {
		if (i == schoolPoint) {

		}
		else {
			map.graphics.remove(StudentCare[i]);
		}
	}
}

function StudentCareSafeAnalysis(control) {
    if (control.value == "Activate Buffer") {
        StudentCareConnectAnalysis();
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