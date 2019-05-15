/*-----------------------------------------OneMap Stuff-----------------------------------------------*/

var centerPoint = "26968.103,33560.969"
var levelNumber = 2;
var OneMap = new GetOneMap('Map', 'SM', { level: levelNumber, center: centerPoint });

dojo.require("esri.map");
dojo.require("esri.tasks.geometry");
dojo.require("esri.tasks.route");
dojo.require("esri.toolbars.draw");
dojo.require("esri.layers.FeatureLayer");
dojo.require("dojo.number");

dojo.require("esri.tasks.query");
dojo.require("esri.tasks.locator");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("esri.dijit.OverviewMap");


var map = [];

/*-----------------------------------------Buffer Variable-----------------------------------------------*/
var gsvc = null;
var buffer = null;
var bufferGeo = null;

/*-----------------------------------------Line Variable-----------------------------------------------*/
var lineGeometryService;
var line2GeometryService;
var baseLayers = [];
var locator;
var endGraphic;
var units;
var totalDistance = 0, inputPoints = [], legDistance = [];


/*-----------------------------------------Routing Variable/Search/Get Location-----------------------------------------------*/
var routeTaskWithERP;
var routeTaskWithoutERP;
var routeTask = [];
var routeParams = [];
var routeSymbol;
var segmentSymbol, segmentGraphic;
var totalDistance = 0;
var totalTime = 0;

/*---------------------------------------Multi Route Variable------------------------------------------------*/
var routeT, routeRouteLine;
var routeNearBusStop, routeBus = [];

/*-----------------------------------------Dynamic Routing Variable-----------------------------------------------*/
var routeTaskDY, routeTask1DY, routeParamsDY, routes = [];
var stopSymbol, barrierSymbol, routeSymbols;
var mapOnClick_addStops_connect, mapOnClick_addBarriers_connect;


/*-----------------------------------------Initialize-----------------------------------------------*/
function init() {
    map = OneMap.map;
    // map.infoWindow.resize(320, 140);
    map.infoWindow.resize(350, 340);

    gsvc = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer")
    line2GeometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"); ;

   


    stopSymbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setSize(15);
    stopSymbol.outline.setWidth(4).setColor(new dojo.Color([255, 0, 0])); ;

  



   

    dojo.connect(map, "onLoad", connectToolBar());

   

    esri.config.defaults.io.proxyUrl = "Default.aspx";
    esri.config.defaults.io.alwaysUseProxy = false;

    defaultSymbol = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([0, 0, 255]));
    highlightSymbol = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([255, 0, 0]));
}




dojo.addOnLoad(init);


