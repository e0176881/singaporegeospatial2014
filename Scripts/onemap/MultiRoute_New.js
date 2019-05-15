function RouteU(MyRouteStops)
{
  var routeData = new Route;
 	    routeData.routeStops = MyRouteStops;
        routeData.routeMode = "DRIVE";
        routeData.avoidERP = "0";
        routeData.barriers = "";
         
        routeData.GetRoute(showRouteData)
        }
            
function showRouteData(routeResults)
{
	if (routeResults.results=="No results"){
		alert("No Route found, please try other location.")
		return
	}
	directions = routeResults.results.directions[0];

	directionFeatures = directions.features;
		
	var routeSymbol = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([getRandomColorInt(),0,getRandomColorInt(),0.7])).setWidth(4);

	var mergedGeometry = new esri.geometry.Polyline()

	mergedGeometry.addPath(routeResults.results.routes.features[0].geometry.paths[0])
	//OneMap.map.graphics.clear();
	OneMap.map.graphics.add(new esri.Graphic(mergedGeometry, routeSymbol));       
	//Display the total time and distance of the route
	//document.getElementById("results").innerHTML = "<br /> &nbsp; Total distance: " +  directions.summary.totalLength + "<br /> &nbsp; Total time: " + directions.summary.totalTime;

	//List the directions and create hyperlinks for each route segment
	/*	for (var i=0;i<directions.features.length;i++)
		{
			var feature=directions.features[i]
			document.getElementById("results").innerHTML= document.getElementById("results").innerHTML + '<br><u>' + parseInt(parseInt(i)+1) + ". " + feature.attributes.text + " (" + feature.attributes.length + ", " + feature.attributes.time  + ")</u>"  
		
        }
	*/

}

function getRandomColorInt () {
	var min = 0;
	var max = 255;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}