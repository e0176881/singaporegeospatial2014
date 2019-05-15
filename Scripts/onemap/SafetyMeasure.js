
/*-----------------------------------------Safety Measure-----------------------------------------------*/

var drawSafetyLevelAnalysis = [];
var drawSafetyLevelAnalysisTraffic = [];
var storeSafetyi = [];
var safetyLevelRadiusSize = 0;
var defaultSafetyLevel;

function resultDrawSafetyLevel() {
  
    var type = document.getElementById('safetyLevelOption');
    switch (type.value) {
        case "POI":
            locatePOI();
            break;
        case "Food":
            locateFood();
            break;
        case "healthcare":
            locateHealth();
            break;
        case "checkin":
            locateFB();
            break;
    }
}



/*-----------------------------------------Locate Schools-----------------------------------------------*/

function locatePOI() { // Places of Interest
    map.infoWindow.hide();
    map.infoWindow.resize(350, 160);
    var Grid_Table = document.getElementById('PrimarySchoolDGV');
   
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getPlacesOfInterests", false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("PlacesOfInterest");

    $.each(xmlalbums, function () {
        testindex = 0;
        var school = $(this).find("Name").text();
        var address = $(this).find("Address").text();
        var postalcode = $(this).find("PostalCode").text();
        var cat = $(this).find("Category").text();
        var incidentI = "";
        var symbol;
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        //x = 26758.952015949333 y = 36431.7165644467
        var centerpoint = new esri.geometry.Point({ "x": "30886.6178", "y": "29861.81239", "spatialReference": { "wkid": 3414} });
        var gg = esri.geometry.getLength(point, centerpoint);

        if (gg < 2100) {
          
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 0, 0.5]), 10), new dojo.Color([0, 255, 0, 0.9]));
        }
        else if (gg < 3000) {
       
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 100, 0, 0.5]), 10), new dojo.Color([255, 100, 0, 0.5]));
        }
        else if (gg < 5500) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0, 0.2]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }

        else if (gg < 7000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0, 0.1]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        else {
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 215, 10,0]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }

        //symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));
        var infoTemplate = new esri.InfoTemplate();

        infoTemplate.setTitle("<img src='images/icons/attractions.bmp' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
        infoTemplate.setContent("<b>Food Establishments : </b>" + school + "</br>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                   + "<b>Category: </b>" + cat + "<br/>" +
                   "<input type='button' id='btnearby' class='infoTempButton infoTempOrange' title='Show whats nearby' value='' onclick='Clear(); setPoint(" + coordX + "," + coordY + "); ' />" 
                   );

        var graphic = new esri.Graphic(point, symbol);
        map.graphics.add(graphic);
        graphic.setSymbol(symbol);
        graphic.setInfoTemplate(infoTemplate);

    }
	);
}

function setPoint(x,y) {

    var success;
    var Grid_Table = document.getElementById('PrimarySchoolDGV');


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getPlacesOfInterests", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("PlacesOfInterest");

    $.each(xmlalbums, function () {
        testindex = 0;
        var school = $(this).find("Name").text();
        var address = $(this).find("Address").text();
        var postalcode = $(this).find("PostalCode").text();
        var cat = $(this).find("Category").text();
        var incidentI = "";
        var symbol;
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();
        var centerpoint = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });
        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var gg = esri.geometry.getLength(point, centerpoint);


        var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/attractions1.png', 25, 25);

        //symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));
        var infoTemplate = new esri.InfoTemplate();

        infoTemplate.setTitle("<img src='images/icons/attractions.bmp' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
        infoTemplate.setContent("<b>Food Establishments : </b>" + school + "</br>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                   + "<b>Category: </b>" + cat + "<br/>"
                   );

        var graphic = new esri.Graphic(point, symbol);
        if (gg < 3000) {
            map.graphics.add(graphic);
            graphic.setSymbol(symbol);

        }
        else {
            success = "no result";
        }

        graphic.setInfoTemplate(infoTemplate);

    }
	);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getFoodStations", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("FoodStation");

    $.each(xmlalbums, function () {
        varname = $(this).find("ID").text();
        foodstation = $(this).find("Name").text();
        address = $(this).find("Address").text();
        postal = $(this).find("PostalCode").text();
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();

        var centerpoint = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });
        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        var gg = esri.geometry.getLength(point, centerpoint);


        var symbol = new esri.symbol.PictureMarkerSymbol('images/icons/HawkerCentres.png', 15, 15);

        //symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));
        var infoTemplate = new esri.InfoTemplate();

        infoTemplate.setTitle("<img src = 'images/icons/food.png' style='width:25px; height:25px;' />&nbsp;&nbsp; " + foodstation);
        infoTemplate.setContent("<b>Food Establishments : </b>" + foodstation + "</br>"
    + "<b>Adress: </b>" + address + "<br/>"
     + "<b>PostalCode: </b>" + postal + "<br/>"
     );

        var graphic = new esri.Graphic(point, symbol);
        if (gg < 3000) {
            map.graphics.add(graphic);
            graphic.setSymbol(symbol);
        }
        else {
            success = "no result";
        }
        graphic.setInfoTemplate(infoTemplate);

    }
	);
    alert(success);
}





function locateFood() {
    map.infoWindow.hide();
    map.infoWindow.resize(350, 160);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getFoodStations", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("FoodStation");

    $.each(xmlalbums, function () {
        varname = $(this).find("ID").text();
        foodstation = $(this).find("Name").text();
        address = $(this).find("Address").text();
        postal = $(this).find("PostalCode").text();
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        //x = 26758.952015949333 y = 36431.7165644467
        var centerpoint = new esri.geometry.Point({ "x": "30886.6178", "y": "29861.81239", "spatialReference": { "wkid": 3414} });
        var gg = esri.geometry.getLength(point, centerpoint);

        if (gg < 2100) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 0, 0.5]), 10), new dojo.Color([0, 255, 0, 0.9]));
        }
        else if (gg < 3000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 100, 0, 0.5]), 10), new dojo.Color([255, 100, 0, 0.5]));
        }
        else if (gg < 5500) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0, 0.2]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }

        else if (gg < 7000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0, 0.1]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        else {
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 215, 10, 0]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        //symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));
        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle("<img src = 'images/icons/HawkerCentres.png' style='width:25px; height:25px;' />&nbsp;&nbsp; " + foodstation);
        infoTemplate.setContent("<b>Food Establishments : </b>" + foodstation + "</br>"
                + "<b>Adress: </b>" + address + "<br/>"
                + "<b>PostalCode: </b>" + postal + "<br/>"
                    + '<input type="checkbox" onclick="ShowRelatedVideos(this);" searchquery="' + foodstation + '" "value="Show Related Videos" /><label>Show Related Videos</label>'
                     + '<input type="checkbox" onclick="ShowWeather(this);" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
                      + '<input type="checkbox" onclick="ShowRelatedInsta(this);" searchqueryzzz="' + foodstation + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
            );
        var graphic = new esri.Graphic(point, symbol);
        map.graphics.add(graphic);
        graphic.setSymbol(symbol);
        graphic.setInfoTemplate(infoTemplate);
      
    }
	);
}


function locateHealth() {
    map.infoWindow.hide();
    map.infoWindow.resize(350, 160);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getHealthcares", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("Healthcares");

    $.each(xmlalbums, function () {
        varname = $(this).find("ID").text();
        foodstation = $(this).find("Name").text();
        address = $(this).find("Address").text();
        postal = $(this).find("PostalCode").text();
        coordX = $(this).find("X").text();
        coordY = $(this).find("Y").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        //x = 26758.952015949333 y = 36431.7165644467
        var centerpoint = new esri.geometry.Point({ "x": "30886.6178", "y": "29861.81239", "spatialReference": { "wkid": 3414} });
        var gg = esri.geometry.getLength(point, centerpoint);

        if (gg < 2100) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 0, 0.5]), 10), new dojo.Color([0, 255, 0, 0.9]));
        }
        else if (gg < 3000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 100, 0, 0.5]), 10), new dojo.Color([255, 100, 0, 0.5]));
        }
        else if (gg < 5500) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0, 0.2]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }

        else if (gg < 7000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0, 0.1]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        else {
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 215, 10, 0]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        //symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));
        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle("<img src = 'images/icons/health.png' style='width:25px; height:25px;' />&nbsp;&nbsp; " + foodstation);
        infoTemplate.setContent("<b>Food Establishments : </b>" + foodstation + "</br>"
                + "<b>Adress: </b>" + address + "<br/>"
                + "<b>PostalCode: </b>" + postal + "<br/>"
                    + '<input type="checkbox" onclick="ShowRelatedVideos(this);" searchquery="' + foodstation + '" "value="Show Related Videos" /><label>Show Related Videos</label>'
                     + '<input type="checkbox" onclick="ShowWeather(this);" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
                      + '<input type="checkbox" onclick="ShowRelatedInsta(this);" searchqueryzzz="' + foodstation + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
            );
        var graphic = new esri.Graphic(point, symbol);
        map.graphics.add(graphic);
        graphic.setSymbol(symbol);
        graphic.setInfoTemplate(infoTemplate);
      
    }
	);

}





function locateFB() {
    map.infoWindow.hide();
    map.infoWindow.resize(600, 260);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/Foreigners@SG/WebService.asmx/getFB", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    var xmlalbums = xmlDoc.documentElement.getElementsByTagName("Checkin");

    $.each(xmlalbums, function () {
        varname = $(this).find("id").text();
        foodstation = $(this).find("name").text();
        hometown = $(this).find("hometown").text();
        sex = $(this).find("sex").text();
        coordX = $(this).find("latitude").text();
        coordY = $(this).find("longitude").text();
        placename = $(this).find("placename").text();
        message = $(this).find("message").text();

        var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
        //x = 26758.952015949333 y = 36431.7165644467
        var centerpoint = new esri.geometry.Point({ "x": "30886.6178", "y": "29861.81239", "spatialReference": { "wkid": 3414} });
        var gg = esri.geometry.getLength(point, centerpoint);

        if (gg < 2100) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 0, 0.5]), 10), new dojo.Color([0, 255, 0, 0.9]));
        }
        else if (gg < 3000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 100, 0, 0.5]), 10), new dojo.Color([255, 100, 0, 0.5]));
        }
        else if (gg < 5500) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0, 0.2]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }

        else if (gg < 7000) {

            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0, 0.1]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        else {
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 215, 10, 0]), 10), new dojo.Color([255, 0, 0, 0.9]));
        }
        //symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, safetyLevelRadiusSize * 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));
        var infoTemplate = new esri.InfoTemplate();
     

        infoTemplate.setTitle("<img src = 'Images/icons/checkin-icon.jpg' style='width:25px; height:25px;' />&nbsp;&nbsp; <a href='default2.aspx?id=" + placename + " &uname=" + foodstation + "'   >  " + placename + "</a>");
        infoTemplate.setContent("<input type='hidden' class='markerKey' value='FbCheckin'/><b>Last checkin by : </b>" + foodstation + "</br>"
                + "<b>Hometown: </b>" + hometown + "<br/>"
                  + "<b>Gender: </b>" + sex + "<br/>"
                   + "<b>Post: </b>" + message + "<br/>"
                + '<input type="checkbox" onclick="ShowReportForCheckin(this);" homeTown="' + placename + '"place="' + coordX + '" "value="Show Report" /><label>Show Report</label>'
				 + '<input type="checkbox" onclick="ShowWeather(this);" latitudez="' + coordX + "," + coordY + '" "value="Show Weather" /><label>Show Weather</label>'
                  + '<input type="checkbox" onclick="ShowRelatedInsta(this);" searchqueryzzz="' + hometown + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'
                  );
        var graphic = new esri.Graphic(point, symbol);
        map.graphics.add(graphic);
        graphic.setSymbol(symbol);
        graphic.setInfoTemplate(infoTemplate);

    }
	);

}

var testindex = 0;
function drawSafetyLevel(x, y) {
    safetyLevelRadiusSize = 0;
    storeSafetyi = [];
    var schoolPoint = new esri.geometry.Point({ "x": x, "y": y, "spatialReference": { "wkid": 3414} });

    var Grid_Table = document.getElementById("livetrafficIncidentDGV");

    resultinnerAnalysis = defaultSafetyLevel * "+1000";
	
	
	
	var i = 0;
	$.each(xmlalbumsTraffic, function() 
	{
		var point = new esri.geometry.Point({ "x":  $(this).find("actualX").text(), "y":  $(this).find("actualY").text(), "spatialReference": { "wkid": 3414} });
        var distance = esri.geometry.getLength(point, schoolPoint);
        if ($(this).find("IncidentType").text() == "Accident") {
        if (distance < resultinnerAnalysis) {
                safetyLevelRadiusSize++;
                storeSafetyi[testindex] = i;
                testindex++;
            }
        }
		i++;
	}
	);
}
