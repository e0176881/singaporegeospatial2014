var heatLayer;
var POIFeatureLayer;

dojo.require("esri.layers.graphics");
var heatmapGraphics = new esri.layers.GraphicsLayer();

function heatInit() {
   
    
    if (heatLayer == null) {
        heatLayer = new HeatmapLayer({
            config: {
                "useLocalMaximum": true,
                "radius": 40,
                "gradient": {
                    0.45: "rgb(000,000,255)",
                    0.55: "rgb(000,255,255)",
                    0.65: "rgb(000,255,000)",
                    0.95: "rgb(255,255,000)",
                    1.00: "rgb(255,000,000)"
                }
            },
            "map": map,
            "domNodeId": "heatLayerDiv",
            "opacity": 0.85
        });
        //POIFeatureLayer = new esri.layers.FeatureLayer("http://172.20.129.239/RoadWatchDummyData(Json)V9/WcfService.svc/Json");
        //POIFeatureLayer = new esri.layers.FeatureLayer("http://localhost/RoadWatchDummyData/SgDataService.asmx/GetZebraCrossing");
        //POIFeatureLayer = new esri.layers.FeatureLayer("http://www.onemap.sg/DataService/Services.svc/Disability");
        POIFeatureLayer = new esri.layers.FeatureLayer("http://sitarcgis2.sit.nyp.edu.sg/ArcGIS/rest/services/POIs/MapServer/1");

        //heatLayer.setData(heatmapGraphics);
         map.addLayer(heatLayer); //must keep heatlayer added to map, control is through the graphicslayer.
        return true;
    } else {
        //map.removeLayer(heatLayer);
        POIFeatureLayer = null;
        //heatLayer = null;
        return true;
    }
}

function getHeatmapPedestrianCrossing() {
    if (heatInit()) {
        var overwrite = false;
        var where = "TYPE=''";
        if (document.getElementById('cbZebraCrossing').checked) {
            if (overwrite == false) {
                where = "TYPE='ZebraCrossing'";
                overwrite = true;
            } else {
                where += " OR TYPE='ZebraCrossing'";
            }
        }

        if (document.getElementById('cbPedestrianCrossing').checked) {
            if (overwrite == false) {
                where = "TYPE='PedestrianCrossing'";
                overwrite = true;
            } else {
                where += " OR TYPE='PedestrianCrossing'";
            }
        }

        console.log(where);
        getFeatures(where);
    }
    else { }
}

function getHeatmapHealth() {
    if (heatInit()) {
        var overwrite = false;
        var where = "TYPE=''";
        if ($("#btnHeatMap1").length > 0) {
            if (document.getElementById('btnHeatMap1').checked) {
                
                if (overwrite == false) {
                    where = "TYPE='CLINIC'"; // th
                    overwrite = true;
                } else {
                    where += " OR TYPE='CLINIC'";
                }
            }
           
        }
        if ($("#btnHandPoint").length > 0) {
            if (document.getElementById('btnHandPoint').checked) {
                if (overwrite == false) {
                    where = "TYPE='HOSPITAL'";
                    overwrite = true;
                } else {
                    where += "";
                }
            }
        }
        console.log(where);
//        getFeatures(where);
    }
    else { }
}

function getHeatmapTraffic() {
    if (heatInit()) {
        var overwrite = false;
        var where = "TYPE=''";

        if (document.getElementById('cbTraffic').checked) {
            if (overwrite == false) {
                where = "TYPE='Accident'";
                overwrite = true;
            } else {
                where += " OR TYPE='Accident'";
            }
        }
        console.log(where);
        getFeatures(where);
    }
    else { }
}



function getFeatures(where) {

    // set up query
    var query = new esri.tasks.Query();
    // only within extent
    query.geometry = map.extent;
    // give me all of them!
    query.where = where;
    // make sure I get them back in my spatial reference
    //query.geometryType = "esriGeometryEnvelope";
    query.outSpatialReference = map.spatialReference;
    // get em!
   // console.log(query);
    POIFeatureLayer.queryFeatures(query, function (featureSet) {
        alert('dd');
        var data = [];
        // if we get results back
        if (featureSet && featureSet.features && featureSet.features.length > 0) {
            alert('ss');
            // set data to features
            data = featureSet.features;

        }
        // set heatmap data
        heatLayer.setData(data);
    });

//    var data = ['{attributes: {},geometry: {spatialReference: {wkid: 3414} type: "point"x: 30761.221000016 y: 36885.9490036653 }}'];
//        
//        heatLayer.setDataSet(data);
}

function changeMapIcon(control) {
    if (control.id == "btnHeatMap1") {
        control.id = "btnHeatMap2";
        if (heatLayer) {
            heatLayer.setData(heatmapGraphics.graphics);
        }
    }
    else {
        control.id = "btnHeatMap1";
        if (heatLayer) {
            heatLayer.clearData();
        }
    }
}