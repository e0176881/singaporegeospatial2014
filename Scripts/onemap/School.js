var PrimarySchool = [];
var SecondarySchool = [];
var JuniorCollege = [];
var Polytechnic = [];
var University = [];


function PinPointforPrimarySchool(map, control) { //primaryschool
    var Grid_Table = document.getElementById('PrimarySchoolDGV');

    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Foreigners@SG/WebService.asmx/GetPrimarySchool",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("PrimarySchool");
	
        map.infoWindow.hide();
        map.infoWindow.resize(350, 240);

		$.each(xmlalbums, function()
		{
            var school = $(this).find("School").text();
            var address = $(this).find("Address").text();
            var website = $(this).find("Website").text();
            var postalcode = $(this).find("PostalCode").text();
            var image = $(this).find("Logo").text();

            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();

            var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/PrimarySchool.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/PrimarySchool.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<img class='infoTempImage' src='/SAFETY_AT_SG/Images/Features/Primary/" + image + "'>"
                    + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                    +  "<b>Website:  </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>");


            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            PrimarySchool.push(OneMap.map.graphics.add(graphic));
		}
		);
    }
    else {
        for (var i = PrimarySchool.length - 1; i >= 0; i--) {
            map.graphics.remove(PrimarySchool.splice(i, 1)[0]);
        }

    }
}
function PinPointforSecondarySchool(map, control) { //Secondaryschool
    var Grid_Table = document.getElementById('SecondarySchoolDGV');

    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetSecondarySchool",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("SecondarySchool");
	
        map.infoWindow.hide();
        map.infoWindow.resize(350, 240);

		$.each(xmlalbums, function()
		{
			var school = $(this).find("School").text();
            var address = $(this).find("Address").text();
            var website = $(this).find("Website").text();
            var postalcode = $(this).find("PostalCode").text();
            var image = $(this).find("Logo").text();

            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();

            var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/SecondarySchool.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/SecondarySchool.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<img class='infoTempImage' src='/SAFETY_AT_SG/Images/Features/Secondary/" + image + "'>"
                    + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                    + "<b>Website:  </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>");


            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            SecondarySchool.push(OneMap.map.graphics.add(graphic));
		}
		);
    }
    else {
        for (var i = SecondarySchool.length - 1; i >= 0; i--) {
            map.graphics.remove(SecondarySchool.splice(i, 1)[0]);
        }

    }
}
function PinPointforJuniorCollege(map, control) { //JuniorCollege
    var Grid_Table = document.getElementById('JuniorCollegeDGV');

    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetJuniorCollege",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("JuniorCollege");
	
        map.infoWindow.hide();
        map.infoWindow.resize(350, 240);

		$.each(xmlalbums, function()
		{
			var school = $(this).find("School").text();
            var address = $(this).find("Address").text();
            var website = $(this).find("Website").text();
            var postalcode = $(this).find("PostalCode").text();
            var image = $(this).find("Logo").text();

            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();

            var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/JuniorCollege.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/JuniorCollege.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<img class='infoTempImage' src='/SAFETY_AT_SG/Images/Features/JuniorCollege/" + image + "'>"
                    + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                     + "<b>Website:  </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>");


            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            JuniorCollege.push(OneMap.map.graphics.add(graphic));

		}
		);
    }
    else {
        for (var i = JuniorCollege.length - 1; i >= 0; i--) {
            map.graphics.remove(JuniorCollege.splice(i, 1)[0]);
        }

    }
}

function PinPointforUniversity(map, control) { //University
    var Grid_Table = document.getElementById('UniversityDGV');

    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetUniversity",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("University");
	
        map.infoWindow.hide();
        map.infoWindow.resize(350, 240);

		$.each(xmlalbums, function()
		{
			var school = $(this).find("School").text();
            var address = $(this).find("Address").text();
            var website = $(this).find("Website").text();
            var postalcode = $(this).find("PostalCode").text();
            var image = $(this).find("Logo").text();

            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();
			
			var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/University.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/University.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<img class='infoTempImage' src='/SAFETY_AT_SG/Images/Features/University/" + image + "'>"
                    + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                     + "<b>Website:  </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>");


            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            University.push(OneMap.map.graphics.add(graphic));

		}
		);
    }
    else {
        for (var i = University.length - 1; i >= 0; i--) {
            map.graphics.remove(University.splice(i, 1)[0]);
        }

    }
}

function PinPointforPolytechnic(map, control) { //Polytechnic
    var Grid_Table = document.getElementById('PolytechnicDGV');

    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetPolytechnic",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("Polytechnic");
	
        map.infoWindow.hide();
        map.infoWindow.resize(350, 200);
		
		$.each(xmlalbums, function ()
		{
		
			var school = $(this).find("School").text();
            var address = $(this).find("Address").text();
            var website = $(this).find("Website").text();
            var postalcode = $(this).find("PostalCode").text();
            var image = $(this).find("Logo").text();

            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();
			
			var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/Polytechnic.png', 30, 30);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/Polytechnic.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + school);
            infoTemplate.setContent("<img class='infoTempImage' src='/SAFETY_AT_SG/Images/Features/Polytechnic/" + image + "'>"
                    + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postalcode + "<br/>"
                     + "<b>Website:  </b>" + "<a href='" + website + "' target='_blank'/>" + website + "</a>");


            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            Polytechnic.push(OneMap.map.graphics.add(graphic));
		}
		);
    }
    else {
        for (var i = Polytechnic.length - 1; i >= 0; i--) {
            map.graphics.remove(Polytechnic.splice(i, 1)[0]);
        }

    }
}