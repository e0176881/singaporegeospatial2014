/*---------------------------------------------FireStation-----------------------------------------------*/

var fireStationLocation = [];
var policeStationLocation = [];

function PinPointForFireStation(map, control) { 
    var Grid_Table = document.getElementById('FireStationDGV');

    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetFireStation",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("FireStation");
	
        map.infoWindow.hide();
        map.infoWindow.resize(350, 120);
		
		$.each(xmlalbums, function () {
			var name = $(this).find("ID").text();

            firestation = $(this).find("Name").text();
            address = $(this).find("Address").text();
            postal = $(this).find("PostalCode").text();
            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();
			
			
			var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/FireStation.gif', 25, 25);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/FireStation.gif' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + firestation);
            infoTemplate.setContent("<b>FireStation: </b>" + firestation + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postal + "<br/>"
                    );

            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            fireStationLocation.push(OneMap.map.graphics.add(graphic));
		
		});

    }
    else {
        for (var i = fireStationLocation.length - 1; i >= 0; i--) {
            map.graphics.remove(fireStationLocation.splice(i, 1)[0]);
        }

    }
}

/*---------------------------------------------Police Station-----------------------------------------------*/
function PinPointForPoliceStation(map, control) { 
    var Grid_Table = document.getElementById('PoliceStationDGV');


    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Safety_AT_SG_WebService/SgDataService.asmx/GetPoliceStation",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("PoliceStation");
        map.infoWindow.hide();
        map.infoWindow.resize(350, 120);
		
		$.each(xmlalbums, function()
		{
			var name =  $(this).find("ID").text();

            policestation = $(this).find("Name").text();
            address = $(this).find("address").text();
            postal = $(this).find("PostalCode").text();
            coordX = $(this).find("X").text();
            coordY = $(this).find("Y").text();
			
			var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });

            var symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/PoliceStation.png', 25, 25);
            var PointGraphic = new esri.Graphic(point, symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();

            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/PoliceStation.png' style='width:25px; height:25px;'/>&nbsp;&nbsp; " + policestation);
            infoTemplate.setContent("<b>SPF Establishments: </b>" + policestation + "<br/>"
                    + "<b>Address: </b>" + address + "<br/>"
                    + "<b>PostalCode: </b>" + postal + "<br/>"
                    );

            var graphic = PointGraphic;
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            policeStationLocation.push(OneMap.map.graphics.add(graphic));
			
		});

    }
    else {
        for (var i = policeStationLocation.length - 1; i >= 0; i--) {
            map.graphics.remove(policeStationLocation.splice(i, 1)[0]);
        }

    }
}


/*---------------------------------------------HousingDevelopmentBoard-----------------------------------------------*/
var HDBLocation = [];
function PinPointHousingDevelopmentBoardBTO(map, control) {
    var BTO = null;
    var Name = null;
    var Address = null;
    var CoordX = null;
    var CoordY = null;
    var Symbol = null;
    var Image = null;
    var Website = null;

    var Grid_Table = document.getElementById('HousingDevelopmentBoardDGV');
    var chkBox = document.getElementById(control.id);

    if (chkBox.checked) {
	
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/Foreigners@SG/WebService.asmx/GetHDB",false);
	xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
	var xmlalbums = xmlDoc.documentElement.getElementsByTagName("HDB");
        map.infoWindow.hide();
        map.infoWindow.resize(350, 340);
		
		$.each(xmlalbums, function(){
			
			BTO = $(this).find("BTO").text();
            Name = $(this).find("Name").text();
            Address = $(this).find("Address").text();
            CoordX = $(this).find("X").text();
            CoordY = $(this).find("Y").text();
            Image = $(this).find("Image").text();
            Website = $(this).find("Website").text();

			var point = new esri.geometry.Point({ "x": CoordX, "y": CoordY, "spatialReference": { "wkid": 3414} });
            Symbol = new esri.symbol.PictureMarkerSymbol('/SAFETY_AT_SG/Images/Features/HDB.png', 35, 35);

            var PointGraphic = new esri.Graphic(point, Symbol);
            OneMap.map.graphics.add(PointGraphic);

            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("<img src='/SAFETY_AT_SG/Images/Features/HDB.png' style='width:25px; height:25px;'/>&nbsp;&nbsp;" + Name);
            infoTemplate.setContent(
                                    "<div id='infoTempImage' style='width:320px; height:270px; word-wrap: break-word;' >" +
                                    "<img style='width:320px; height:150px; word-wrap: break-word;' src='/Images/Features/Construction/" + Image + "' > " +
                                    "</br>" +
                                    "<b>Build to Order:  </b>" + BTO +
                                    "</br>" +
                                    "<b>Address:  </b>" + Address +
                                    "</br>" +
                                    "</br>" +
                                     "<b>Website:  </b>" + "<a href='" + Website + "' target='_blank'/>" + Website + "</a>" +
                                    "</div>");


            var graphic = PointGraphic;
            graphic.setSymbol(Symbol);
            graphic.setInfoTemplate(infoTemplate);
            HDBLocation.push(OneMap.map.graphics.add(graphic));
		});
    }
    else {
        for (var i = HDBLocation.length - 1; i >= 0; i--) {
            map.graphics.remove(HDBLocation.splice(i, 1)[0]);
        }
    }
}

