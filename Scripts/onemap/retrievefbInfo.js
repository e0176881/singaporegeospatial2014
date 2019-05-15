/*--------------------------------------------@AUTHOR- MINGXUAN-----------------------------------------------*/
var newHeight;
var place;
function ShowReportForCheckin(obj, width, height) {
    newHeight = map.infoWindow.height;
    gotrepork = true;
    var bodyOfInfowindow = $(obj).parent();
    var Oldplace = $(obj).attr('place');
   place = Oldplace.replace('.', '-');
    var hometown = $(obj).attr('homeTown');
    if ($(obj).is(':checked') == true) {
        var nnewHeight = map.infoWindow.height;
        var widthh = map.infoWindow.width;
        map.infoWindow.resize(widthh + 30, nnewHeight + 400);
        
        bodyOfInfowindow.append('<style>.infowindow .window .top .right .user .content{  overflow:scroll !important; }</style><div id="container-' + place + '" style="min-width: 400px;  margin: 0 auto"></div>')
        $.ajax({
            type: "POST",
            url: "Default.aspx/GetGraphDataForId",
            data: JSON.stringify({ placeName: hometown }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var xCategories = [];
                var yValues = [];
                var response = msg.d;
                var jsonResp = $.parseJSON(response);
                $.each(jsonResp, function (i, v) { 
                    xCategories.push(v.PlaceName);
                    yValues.push(v.count);

                });
                $("#container-" + place).highcharts({
                    chart: {
                        type: 'column',
                        events: {
                            load: function () {

                            }
                        }
                    },
                    title: {
                        text: 'Placename'
                    },
                    subtitle: {
                        text: hometown
                    },
                    xAxis: {
                        categories: xCategories
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Checkin Count'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Checkin Count',
                        data: yValues

                    }]
                });



            }
        });

    }
    else {



 
            $("#container-" + place).remove();

            newHeight = map.infoWindow.height;
            var widthh = map.infoWindow.width;
            map.infoWindow.resize(widthh - 30, newHeight - 400);
        }

    }

    var latestheight;
    var latestwidth;

    function ShowWeather(obj, width, height) {
    var bodyOfInfowindow = $(obj).parent();
    var inXYList = $(obj).attr('latitudez');

    if ($(obj).is(':checked') == true) {
        var nnewHeight = map.infoWindow.height;
        var widthh = map.infoWindow.width;
        map.infoWindow.resize(widthh, nnewHeight + 100);

      
    
         $.ajax({
                            type: "POST",
                            url: "Default.aspx/getlatlong",
                            data: '{coordxy: "' + inXYList + '" }',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                         
                            success: function OnSuccessabc(response) {

                                weather = response.d.split(",")[0];
                                temp = response.d.split(",")[1];
                                humidlevel = response.d.split(",")[2];
                                pressure = response.d.split(",")[3];
                                icon_url = response.d.split(",")[5];

                                bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{  overflow:scroll !important; }</style><div id='container2P'  style='min-width: 400px;  margin: 0 auto' ><img src='" + icon_url + "'/>" + temp + " </br> <b>Humidity: </b>" + humidlevel + " </br> <b>Pressure: </b>" + pressure + " </br> </div>")
                            },
                            
                            failure: function (response) {

                            }
 });


    }
    else {

        $("#container2P").remove();
        newHeight = map.infoWindow.height;
        var widthh = map.infoWindow.width;
        map.infoWindow.resize(widthh, newHeight - 100);
       

    }

}

function ShowRelatedInsta(obj) {
    var bodyOfInfowindow = $(obj).parent();
    var searchqz = $(obj).attr('searchqueryzzz');
    var functionno = 0;
    if ($(obj).is(':checked') == true) {
        newHeight = map.infoWindow.height;
        var width = map.infoWindow.width;
            map.infoWindow.resize(width, newHeight + 100);
       
        bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{  overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2R'  style='min-width: 400px;  margin: 0 auto' >");
        $.ajax({
            type: "POST",
            url: "Default.aspx/getRelatedInsta",
            data: '{searchtag: "' + searchqz + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function OnSuccessabczzzz(response) {
                var toinsert = "";
                $('#databody').html(" ");
                for (var i = 0; i < response.d.length; i++) { //for (var i = 0; i < response.d.length; i++) {
                    var kspro = response.d.split(",")[i];
                    //thumbnail = response.d.split(",")[i];
                    if (kspro != undefined) {
                        kspro = kspro.substring(1, kspro.length - 1);
                        var ksevenpro = kspro.split("~");


                        thumbnail = ksevenpro[0];
                        var link = ksevenpro[1];

                        if (i == 0) {
                            toinsert += "<div id='thumbnails' >";
                            thumbnail = thumbnail.substring(1, thumbnail.length);
                        }

                        if (link != "undefined" && link != undefined && thumbnail != undefined && thumbnail != "]") {
                            if (i > 3) {
                                toinsert += ("<a onclick='ShowImage(" + i + ")' ><img src=" + thumbnail + "  style='width:85px;display:none;'/></a>");
                            }
                            else {
                                toinsert += ("<a onclick='ShowImage(" + i + ")'  ><img src=" + thumbnail + "  style='width:85px;'/></a>");
                            }
                            link = link.substring(0, link.length - 1);
                            
                         $('#databody').html($('#databody').html() + "<div  id='gallery" + i + "'><a href='" + link + "' ><img src=" + thumbnail + "  style='width:50%;margin:0 auto 0;' /></a></div>");
                            // $('#databody').html($('#databody').html() + "<div><img src=" + thumbnail + " id='gallery1' class='gallery" + i + "' style='display:none;' /></div>");
                        }



                    }
                }
                bodyOfInfowindow.append(toinsert + "</div></div> ");

                //    bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube1(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl1 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube2(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl2 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube3(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl3 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube4(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl4 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ height:173px !important; overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2-'  style='min-width: 400px;  margin: 0 auto' ><a href='' onclick='WatchYoutube1()'><img src='" + getScreen(youtubeurl1, "small") + "'/></a> <a href='' onclick='WatchYoutube2()'><img src='" + getScreen(youtubeurl2, "small") + "'/></a> <a href='' onclick='WatchYoutube3()'><img src='" + getScreen(youtubeurl3, "small") + "'/></a> <a href='' onclick='WatchYoutube4()'><img src='" + getScreen(youtubeurl4, "small") + "'/></a>  </br> <b>Related Videos: </b>" + totalrelatedvideos + " </br> <b>View Count: </b>" + viewcount + " </br> </div>")




                //     bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ height:173px !important; overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2-'  style='min-width: 400px;  margin: 0 auto' ><a href='#' onclick='WatchYoutube(\"" + pop1 + "\"); return false;'><img src='" + getScreen(youtubeurl1, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop2 + "\"); return false;'><img src='" + getScreen(youtubeurl2, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop3 + "\"); return false;'><img src='" + getScreen(youtubeurl3, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop4 + "\"); return false;'><img src='" + getScreen(youtubeurl4, "small") + "'/></a>  </br> <b>Related Videos: </b>" + totalrelatedvideos + " </br> <b>View Count: </b>" + viewcount + " </br> </div>")



            },

            failure: function (response) {

            }
        });


    }
    else {
      //  $("#ccbcccb").remove();
        $("#thumbnails").remove();
        $("#container2R").remove();
        newHeight = map.infoWindow.height;
        var width = map.infoWindow.width;
        map.infoWindow.resize(width, newHeight - 100);
    }

}

function ShowRelatedVideos(obj) {
    var bodyOfInfowindow = $(obj).parent();
    var searchqz = $(obj).attr('searchquery');
    var functionno = 0;
    if ($(obj).is(':checked') == true) {
        newHeight = map.infoWindow.height;
        var width = map.infoWindow.width;

        map.infoWindow.resize(width, newHeight + 100);


        $.ajax({
            type: "POST",
            url: "Default.aspx/getVideos",
            data: '{searchq: "' + searchqz + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function OnSuccessabczzz(response) {


                youtubeurl1 = response.d.split(",")[0].replace('"', '').replace('[', '').replace('"', '');
                youtubeurl2 = response.d.split(",")[1].replace('"', '').replace('[', '').replace('"', '');
                youtubeurl3 = response.d.split(",")[2].replace('"', '').replace('[', '').replace('"', '');
                youtubeurl4 = response.d.split(",")[3].replace('"', '').replace('[', '').replace('"', '');
                viewcount = response.d.split(",")[5];
                totalrelatedvideos = response.d.split(",")[6];
                //    bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube1(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl1 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube2(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl2 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube3(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl3 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube4(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl4 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ height:173px !important; overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2-'  style='min-width: 400px;  margin: 0 auto' ><a href='' onclick='WatchYoutube1()'><img src='" + getScreen(youtubeurl1, "small") + "'/></a> <a href='' onclick='WatchYoutube2()'><img src='" + getScreen(youtubeurl2, "small") + "'/></a> <a href='' onclick='WatchYoutube3()'><img src='" + getScreen(youtubeurl3, "small") + "'/></a> <a href='' onclick='WatchYoutube4()'><img src='" + getScreen(youtubeurl4, "small") + "'/></a>  </br> <b>Related Videos: </b>" + totalrelatedvideos + " </br> <b>View Count: </b>" + viewcount + " </br> </div>")



                var results;



                var pop1 = youtubeurl1;
                results = pop1.match("[\\?&]v=([^&#]*)");
                var n = pop1.indexOf("\\");
                pop1 = (results === null) ? url : results[1];
                //pop1 = pop1.substring(0, n != -1 ? n : pop1.length).trim();


                var pop2 = youtubeurl2;
                results = pop2.match("[\\?&]v=([^&#]*)");
                n = pop2.indexOf("\\");
                pop2 = (results === null) ? url : results[1];
                //pop2 = pop2.substring(0, n != -1 ? n : pop2.length).trim();

                var pop3 = youtubeurl3;
                results = pop3.match("[\\?&]v=([^&#]*)");
                n = pop3.indexOf("\\");
                pop3 = (results === null) ? url : results[1];
                //pop3 = pop3.substring(0, n != -1 ? n : pop3.length).trim();

                var pop4 = youtubeurl4;
                results = pop4.match("[\\?&]v=([^&#]*)");
                n = pop4.indexOf("\\");
                pop4 = (results === null) ? url : results[1];
                //pop4 = pop4.substring(0, n != -1 ? n : pop4.length).trim();

                bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2-'  style='min-width: 400px;  margin: 0 auto' ><a href='#' onclick='WatchYoutube(\"" + pop1 + "\"); '><img src='" + getScreen(youtubeurl1, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop2 + "\"); '><img src='" + getScreen(youtubeurl2, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop3 + "\"); '><img src='" + getScreen(youtubeurl3, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop4 + "\"); '><img src='" + getScreen(youtubeurl4, "small") + "'/></a>  </br> <b>Related Videos: </b>" + totalrelatedvideos + " </br> <b>View Count: </b>" + viewcount + " </br> </div>")



            },

            failure: function (response) {

            }
        });


    }
    else {
        $("#container2-").remove();
        $(".wtfzzzz").remove();
       
        newHeight = map.infoWindow.height;
        var width = map.infoWindow.width;

        map.infoWindow.resize(width, newHeight - 100);

    }

}
function ShowRelatedInsta2(obj) {
    var bodyOfInfowindow = $(obj).parent();
    var searchqz = $(obj).attr('searchqueryzzz');
    var functionno = 0;
    if ($(obj).is(':checked') == true) {
        newHeight = map.infoWindow.height;
        var width = map.infoWindow.width;

        map.infoWindow.resize(width + 30, newHeight + 100);

        bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ } #container2- > a > img{ width:85px; }</style><div id='container2O'  style='min-width: 400px;  margin: 0 auto' >");
        $.ajax({
            type: "POST",
            url: "Default.aspx/getRelatedInsta",
            data: '{searchtag: "' + searchqz + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function OnSuccessabczzzz(response) {
                var toinsert = "";
                $('#databody').html(" ");
                for (var i = 0; i < response.d.length; i++) { //for (var i = 0; i < response.d.length; i++) {
                    var kspro = response.d.split(",")[i];
                    //thumbnail = response.d.split(",")[i];
                    if (kspro != undefined) {
                        kspro = kspro.substring(1, kspro.length - 1);
                        var ksevenpro = kspro.split("~");


                        thumbnail = ksevenpro[0];
                        var link = ksevenpro[1];

                        if (i == 0) {
                            toinsert += "<div id='thumbnails' >";
                            thumbnail = thumbnail.substring(1, thumbnail.length);
                        }

                        if (link != "undefined" && link != undefined && thumbnail != undefined && thumbnail != "]") {
                            if (i > 3) {
                                toinsert += ("<a onclick='ShowImage(" + i + ")' ><img src=" + thumbnail + "  style='width:85px;display:none;'/></a>");
                            }
                            else {
                                toinsert += ("<a onclick='ShowImage(" + i + ")'  ><img src=" + thumbnail + "  style='width:85px;'/></a>");
                            }
                            link = link.substring(0, link.length - 1);
                            $('#databody').html($('#databody').html() + "<div><a href='" + link + "' ><img src=" + thumbnail + " id='gallery" + i + "' class='gallery" + i + "' style='display:none;width:50%;margin:0 auto 0;' /></a></div>");
                            // $('#databody').html($('#databody').html() + "<div><img src=" + thumbnail + " id='gallery1' class='gallery" + i + "' style='display:none;' /></div>");
                        }



                    }
                }
                bodyOfInfowindow.append(toinsert + "</div></div> ");

                //    bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube1(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl1 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube2(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl2 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube3(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl3 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<script type='text/javascript'> function WatchYouTube4(){ $('.modal-header').html('<div> </div>');  $('#databody').html('<div><iframe width='420' height='315' src='" + youtubeurl4 + "' frameborder='0' allowfullscreen></iframe></div>');  $('#About').modal('show'); }</script>");
                //                bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ height:173px !important; overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2-'  style='min-width: 400px;  margin: 0 auto' ><a href='' onclick='WatchYoutube1()'><img src='" + getScreen(youtubeurl1, "small") + "'/></a> <a href='' onclick='WatchYoutube2()'><img src='" + getScreen(youtubeurl2, "small") + "'/></a> <a href='' onclick='WatchYoutube3()'><img src='" + getScreen(youtubeurl3, "small") + "'/></a> <a href='' onclick='WatchYoutube4()'><img src='" + getScreen(youtubeurl4, "small") + "'/></a>  </br> <b>Related Videos: </b>" + totalrelatedvideos + " </br> <b>View Count: </b>" + viewcount + " </br> </div>")




                //     bodyOfInfowindow.append("<style>.infowindow .window .top .right .user .content{ height:173px !important; overflow:scroll !important; } #container2- > a > img{ width:85px; }</style><div id='container2-'  style='min-width: 400px;  margin: 0 auto' ><a href='#' onclick='WatchYoutube(\"" + pop1 + "\"); return false;'><img src='" + getScreen(youtubeurl1, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop2 + "\"); return false;'><img src='" + getScreen(youtubeurl2, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop3 + "\"); return false;'><img src='" + getScreen(youtubeurl3, "small") + "'/></a> <a onclick='WatchYoutube(\"" + pop4 + "\"); return false;'><img src='" + getScreen(youtubeurl4, "small") + "'/></a>  </br> <b>Related Videos: </b>" + totalrelatedvideos + " </br> <b>View Count: </b>" + viewcount + " </br> </div>")



            },

            failure: function (response) {

            }
        });


    }
    else {
        
        $("#thumbnails").remove();
        $("#container2O").remove();
        newHeight = map.infoWindow.height;
        var width = map.infoWindow.width;
        map.infoWindow.resize(width - 30, newHeight - 100);
    }

}



var FBStationLocation = [];
var PointGraphic2;
var fbheatlocation = [];
var coordX;
var coordY;
function PinPointForFB(map, control) { // this function


    var Grid_Table = document.getElementById('CheckinTable');
	
    var chkBox = document.getElementById("CHECKFB");
  
	
    if(chkBox.checked)
    {
	localStorage.setItem("CHECKFB", "checked");
        map.infoWindow.hide();
        map.infoWindow.resize(450, 160);
        if (document.getElementById("btnHeatMap1")) {
            //this means it is unchecked, make sure heatmap is hidden
            if (heatLayer) {
                heatLayer.clearData();
            }
            // map.removeLayer(heatLayer);
        }

        $.ajax({
            type: "GET",
            url: "WebService.asmx/getFB",
            dataType: "xml",
            async: false,
            success: function OnSuccessabc(response) {

                $(response).find('Checkin').each(function () {
                    varname = $(this).find("id").text();
                    foodstation = $(this).find("name").text();
                    hometown = $(this).find("hometown").text();
                    sex = $(this).find("sex").text();
                    coordX = $(this).find("latitude").text();
                    coordY = $(this).find("longitude").text();
                    placename = $(this).find("placename").text();
                    message = $(this).find("message").text();
                    var point = new esri.geometry.Point({ "x": coordX, "y": coordY, "spatialReference": { "wkid": 3414} });
                    var symbol = new esri.symbol.PictureMarkerSymbol('Images/icons/check-in-icon1.png', 50, 50);
                    var PointGraphic = new esri.Graphic(point, symbol);
                    PointGraphic2 = new esri.Graphic(point, null);
                    OneMap.map.graphics.add(PointGraphic);

                    fbheatlocation.push(heatmapGraphics.add(PointGraphic2));
                    var infoTemplate = new esri.InfoTemplate();

                    infoTemplate.setTitle("<img src = 'Images/icons/checkin-icon.jpg' style='width:50px; height:50px;' />&nbsp;&nbsp; <a href='default2.aspx?id=" + placename + " &uname=" + foodstation + "'   >  " + placename + "</a>");
                    infoTemplate.setContent("<b>Last checkin by : </b>" + foodstation + "</br>"
                + "<b>Hometown: </b>" + hometown + "<br/>"
                  + "<b>Gender: </b>" + sex + "<br/>"
                   + "<b>Post: </b>" + message + "<br/>"
                + '<input type="checkbox" id="repork" onclick="ShowReportForCheckin(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" fuckfk="' + "aa" + '" homeTown="' + placename + '"place="' + coordX + '" "value="Show Report" /><label>Show Report</label>'
				 + '<input type="checkbox" onclick="ShowWeather(this,' + map.infoWindow.width + ' , ' + map.infoWindow.height + ');" latitudez="' + coordX + "," + coordY + '" fuckfk="' + "bb" + '" "value="Show Weather" /><label>Show Weather</label>'
                  + '<input type="checkbox" onclick="ShowRelatedInsta2(this);" searchqueryzzz="' + hometown + '" fuckfk="' + "cc" + '" "value="Show Related Instagram" /><label>Show Related Instagram</label>'

                  );

                  
                    var graphic = PointGraphic;
                    graphic.setSymbol(symbol);
                    graphic.setInfoTemplate(infoTemplate);
                    FBStationLocation.push(OneMap.map.graphics.add(graphic));
                    if (document.getElementById("btnHeatMap2")) {
                        //means the heatmap button is checked, add to map
                        if (heatLayer) {
                            heatLayer.setData(heatmapGraphics.graphics);
                            heatmapGraphics.add(PointGraphic);
                        }
                    }


                });

                /*  result = dojo.connect(map.infoWindow, "onHide", function () {

                var container = $(this.containerNode);
                var key = container.find('.markerKey').val();
                if (key == "FbCheckin") {
                map.infoWindow.resize(410, 160);
                }

                });
                result = dojo.connect(map.infoWindow, "onShow", function () {

                var container = $(this.containerNode);
                var key = container.find('.markerKey').val();
                if (key == "FbCheckin") {
                map.infoWindow.resize(410, 160);
                }
                }); */
            },
            failure: function (response) {
            }

        });
     }
	
else 
     {
         localStorage.setItem("CHECKFB", "unchecked"); //remove graphics
         for (var c = fbheatlocation.length - 1; c >= 0; c--) {
             heatmapGraphics.remove(fbheatlocation[c]);



         }
     for(var i = FBStationLocation.length - 1; i>=0; i--) {
         map.graphics.remove(FBStationLocation[i]);
       

	
     }
	
        
 }
}
