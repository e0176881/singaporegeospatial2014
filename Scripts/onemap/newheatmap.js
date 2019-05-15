function healthHeatMapChecked(control) {
    heatInit();
    //getHeatmapHealth();
    changeMapIcon(control);
    //if checked add to map

    //else make sure it is removed
    //map.addLayer(heatLayer);
}


function FBHeatMapChecked(control) {
    heatInit();
    //getHeatmapHealth();
    changeMapIcon(control);
    //if checked add to map
  
    //else make sure it is removed
    //map.addLayer(heatLayer);
}


function TwitHeatMapChecked(control) {

   
    heatInit();
    //getHeatmapHealth();
    changeMapIcon(control);

    var chkBox = document.getElementById(control.id);
    if (chkBox.checked) {

    }
    else {

        for (var b = gg.length - 1; b >= 0; b--) {

            heatmapGraphics.remove(gg[b]);
           

        }


       
       
    }
}