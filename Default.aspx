<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Home Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-translate-customization" content="5efc71db34a2ea39-4f964eef36836a29-gf70e15d9d76f8e80-e"></meta>

    <script type='text/JavaScript' charset="utf-8" src="Scripts/onemapfull.js">></script>

    <link rel="stylesheet" href="http://js.arcgis.com/3.8/js/esri/css/esri.css">


    
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/HeatMap/heatmap.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/HeatMap/heatmap-arcgis.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/HeatMap/HeatMapCustom.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/newheatmap.js"></script>
   
    <%--Javascript Functions and Features--%>
  
 
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/Drawing.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/date.js"></script>

    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/share.js"></script>

    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/Search.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/FoodBuilding.js"></script>
     <script type="text/javascript" charset="utf-8" src="Scripts/onemap/fbcustomevent.js"></script>
     <script type="text/javascript" charset="utf-8" src="Scripts/onemap/youtube.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/retrievetwitterinfo.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/retrievefbInfo.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/retrieveyoutube.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/PlacesOfInterest.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/SeekForHelp.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/SafetyAnalysis.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/GovernmentBuilding.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/SafetyMeasure.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/School.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/MultiRoute.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/MultiRoute_New.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/PrimarySchoolStudentCareAnalysis.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/onemap/Healthcare.js"></script>
        <script type="text/javascript" charset="utf-8" src="Scripts/onemap/GetLocation.js"></script>
    <script type="text/javascript" charset="utf-8" src="Scripts/OneMap.js"></script>
       <script type="text/javascript" charset="utf-8" src="Scripts/onemap/Refresh.js"></script>
    <style>
      
      .slide-out-div {
          padding: 20px;
          width: 250px;
          background: white;
          border: #000000 2px solid;
      } 
      
      
      
        .slide-out-div2 {
          padding: 20px;
          width: 230px;
          background: white;
          border: #000000 2px solid;
      }
                   .slide-out-div3 {
          padding: 20px;
          width: 230px;
          height: 210px;
          background: white;
          border: #000000 2px solid;
      }
            .slide-out-div4 {
          padding: 20px;
          width: 230px;
          background: white;
          border: #000000 2px solid;
          height:210px;
      }
      </style>
                  

    <script language="JavaScript" type="text/JavaScript">
        //Load Onemap-----------------------------------------------------------------------------
        var OneMap = new GetOneMap('Map', 'SM');
    </script>
    <style>
        /*--------------------------Search---------------------------*/
        .button {
            display: inline-block;
            outline: none;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            font: 14px/100% Arial, Helvetica, sans-serif;
            padding: .4em 1.2em .45em;
            text-shadow: 0 1px 1px rgba(0,0,0,.3);
            margin-left: 90px;
            -webkit-border-radius: .5em;
            -moz-border-radius: .5em;
            border-radius: .5em;
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);
            box-shadow: 0 1px 2px rgba(0,0,0,.2);
        }

            .button:hover {
                text-decoration: none;
            }

            .button:active {
                position: relative;
                top: 1px;
            }

        .blue {
            color: #E9FBFE;
            border: solid 1px #00AEE8;
            background: #63D0FF;
            background: -webkit-gradient(linear, left top, left bottom, from(#63D0FF), to(#15A7E6));
            background: -moz-linear-gradient(top, #63D0FF, #15A7E6);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#63D0FF', endColorstr='#15A7E6');
        }

            .blue:hover {
                background: #f47c20;
                background: -webkit-gradient(linear, left top, left bottom, from(#75D6FF), to(#2CAFE8));
                background: -moz-linear-gradient(top, #75D6FF, #2CAFE8);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#75D6FF', endColorstr='#2CAFE8');
            }

            .blue:active {
                color: #B2ECF7;
                background: -webkit-gradient(linear, left top, left bottom, from(#15A7E6), to(#63D0FF));
                background: -moz-linear-gradient(top, #15A7E6, #63D0FF);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#15A7E6', endColorstr='#63D0FF');
            }

        input[type=search] {
            display: block;
            width: 100%;
            height: 25px;
            padding: 0 5px;
            margin-left: 10px;
            /* -webkit-box-shadow: 0 0 5px rgba(0, 0, 255, .5);
  -moz-box-shadow: 0 0 5px rgba(0, 0, 255, .5);
  -o-box-shadow: 0 0 5px rgba(0, 0, 255, .5);
  -ms-box-shadow: 0 0 5px rgba(0, 0, 255, .5);
  box-shadow: 0 0 5px rgba(0, 0, 255, .5)
	 -webkit-appearance: none;
    -webkit-border-radius:5px !important;
    border-radius:10px;*/
        }

        /* If in mobile screen with maximum width 479px. The iPhone screen resolution is 320x480 px (except iPhone4, 640x960) */
       #aaa > center > a.navbar-btn 
       {
           padding:2px 15px;
           margin-bottom:15px;
       }

        #search > table > tbody > tr:nth-child(1) > td:nth-child(3) > a {
            margin-left: 0px;
        }
    </style>
    <style>
        #Map {
            width: 100% !important;
            height: 500px !important;
        }

        #Map_root {
            width: 100% !important;
            height: 100% !important;
        }

        body > div:nth-child(6) > div > div > div > div > div.container3 {
            width: 100%;
            margin-left: 5px;
            margin-right: 5px;
        }

        .panel-default {
            width: 100% !important;
        }
  .infowindow .window .top .right .user .titlebar .title img { width:25px !important; height:25px !important; }
        #menutext {
            display: none;
        }

        #aaaaa {
            margin-top: 25px;
            margin-bottom: 50px;
            padding-top: 25px;
        }
        
        #fb-auth {
            border: 0;
background-color: transparent;
        }
        @media screen and (max-width: 1600px)
         {
             #newsfeeddiv {
                position: relative !important; left: 0px !important;top: 0px !important;max-width: 220px;margin: 0 auto 0;
             }
         }
         @media screen and (max-width: 1200px)
         {
             #aaaaa {
            margin-bottom: 100px;   
             }
             
         }
        
        @media screen and (max-width: 1200px) {
            #aaaaa
            {
                margin-top:50px;
                padding-top: 50px;
            }
        }
      

        @media screen and (max-width: 1089px) {
            #form1 > div.container > div > ul {
                margin-right: 50px;
            }

            #form1 > div.container > a > img {
                margin-left: 330px;
            }
            
            #menutext
            {
                display:none !important;
            }
             #aaaaa
            {
                margin-top: 100px;
            }
            .navbar-default .navbar-collapse {
                margin-top: 100px;
            }
        }
        
        
        
        @media screen and (max-width: 800px) {
            #form1 > div.container > a > img {
                margin-left: 230px;
            }

            #menutext {
                display: inline;
            }
        }
        
         @media screen and (max-width: 845px) {
            #form1 > div.container > a > img {
                margin-left: 230px;
            }

            #menutext {
                display: inline;
            }
        }
        
        @media screen and (max-width: 768px) 
        {
            #aaaaa
            {
                margin-top: 50px;
                
            }   
        
        }
        
        
         @media screen and (max-width: 765px)
         {
             .nav > li > a > img
             {
                 display:none;
             }
         }
           
         
        @media screen and (max-width: 320px) {
            #form1 > div.container > a > img {
                width: 80%;
            }

            #aaaaa {
                margin-top: 50px !important;
            }
        }

        @media screen and (max-width: 992px)and (min-width: 846px) {
            .container {
                width: 850px;
            
            }
        }
          @media screen and (max-width: 992px) 
        {
            .nav > li > a > img
            {
                max-width: 50% !important;
                max-height: 10% !important;   
            }
            .nav > li > a
            {
                padding: 0px 0px;
            }
            #aaaaa
            {
                margin-top:50px;
            }
            
        }
       
       
       @media screen and (max-width: 845px) and (min-width: 768px)
        { 
   #form1 > div.container > div > ul {
margin-right: 50px ;
}
        }     
       
          @media screen and (max-width: 767px) 
        {
           #menutext
           {
               display:block !important;
           }
         .nav > li > a > img {
             display:none;
            }
            
        }
        @media screen and (max-width: 588px) {
            #form1 > div.container > a > img {
               margin-left: 150px;
            }
        }

        @media screen and (max-width: 530px) {
            #form1 > div.container > a > img {
                margin-left: 80px;
            }

            #aaaaa {
                margin-top: 50px !important;
            }
        }

        @media screen and (max-width: 460px) {
            #form1 > div.container > a > img {
                margin-left: 60px;
            }
        }

        @media screen and (max-width: 430px) {
            #form1 > div.container > a > img {
                margin-left: 0px;
            }
        }

        @media screen and (max-height: 511px) {
            #aaa {
                height: 50%;
                font-size: 55%;
            }
        }
        
        #pussy
        {
            float:right;
            background-color: white;
        }
              
        
        .style1
        {
            width: 110px;
        }
        
        .style2
        {
            width: 88px;
        }
        
        .style3
        {
            width: 114px;
        }
        
        .modal-abc
        {
            height: 100%;
position: relative;
        }
        .modal-dialog
        {
            
position: absolute;
top: 25%;
width: 50%;
        }
        .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus
        {
            background-color:transparent !important;
        }
        
    </style>
     <link href="css/main.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/prism.css" rel="stylesheet" />
    <link href="css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />
 <link href="css/weather-icons.css" rel="stylesheet" type="text/css" />

 <style>
     
 .tundra .infowindow .sprite
 {
     background-image: url('images/infowindowtemplate.png');
 }
 </style>



</head>
<body class="tundra">





    <p>
        <br />
    </p>





    <!-- class = "navbar navbar-inverse" Black Nav Bar-->
    <!--"navbar navbar-default" White Nav Bar-->
    <!--"navbar navbar-inverse navbar-fixed-top" Top bar stays even if you scroll-->
    <div class="navbar navbar-default navbar-fixed-top">
        <div class="container">

            <div id="fb-root"></div>
            <script type="text/javascript" charset="utf-8" src="Scripts/onemap/facebook.js"></script>
            <div style="width: 100%">
                <div style="float: right;">
                    <button id="fb-auth">Login</button>
                </div>

                <div style="float:left;">
                <div id="google_translate_element"></div><script type="text/javascript">
                                                             function googleTranslateElementInit() {
                                                                 new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
                                                             }
</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        
                </div>
                <div style="float: right;">
              
                    <div style="margin: 4px 10px 0px 0px;" runat="server" id="welcomemessage"></div>
                </div>
            </div>

            <div style="display: none">
                <div id="loader" style="display: none">
                </div>
                <div id="user-info"></div>

                <div id="debug"></div>
                <div id="other" style="display: none">
                </div>
            </div>

        </div>
        <form id="form1" runat="server">
         <asp:HiddenField ID="hdn" runat="server" />
            <div class="container" style="min-height: 100px;">
                <a href="#" class="navbar-brand">
                    <img src="images/icons/logo.png" width="120" height="80"></a>
                <button class="navbar-toggle" data-toggle="collapse" onclick="return false;" data-target=".navHeaderCollapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <div class="collapse navbar-collapse navHeaderCollapse">
                    <ul class="nav navbar-nav navbar-right">

                    


                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/home1.png" width="70" height="65"><div id="menutext">Home</div>
                                <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li style="text-align:center;"><h3>Our Vision</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><p>We believe in providing our users with the most efficient and reliable methods in getting around Singapore.</p></li>
                             
                             <li style="text-align:center;"><h3>Our Mission</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><p>To not just present the basic functionality of a map, but also providing integration and analysis of geospatial information as part of decision making process.</p></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/HawkerCentres.png" width="70" height="65"><div id="menutext">F&B</div><b class="caret"></b></a>
                       
                            <ul class="dropdown-menu" style="width:400%;">
                            <div style="width:5%;float:left;height:50px"></div>
                            <div style="width:45%;float:left;">
                            <li ><h3>Food Centres</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="HawkerCentres" onclick="PinPointForFoodStation(map,this);" />Hawker Centres</li>
                 </div><div style="width:45%;float:left;">
                                <li ><h3>International Food</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Chinese" onclick="PinPointForFoodStation(map,this);" />Chinese</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="european" onclick="PinPointForFoodStation(map,this);" />European</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Filipino" onclick="PinPointForFoodStation(map,this);" />Filipino</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Indian" onclick="PinPointForFoodStation(map,this);" />Indian</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Japanese" onclick="PinPointForFoodStation(map,this);" />Japanese</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Korea" onclick="PinPointForFoodStation(map,this);" />Korea</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Malaysian" onclick="PinPointForFoodStation(map,this);" />Malaysian</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Thai" onclick="PinPointForFoodStation(map,this);" />Thai</li>
                               
                               </div>  <div style="width:5%;float:left;height:50px"></div>
                            </ul>
                        </li>


                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/attractions1.png" width="70" height="65"><div id="menutext">Places</div><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                             <li style="text-align:center;"><h3>Places Of Interests</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"> <input type ="checkbox" id="Arts" onclick="PinPointForPlacesOfInterest(map,this);" />Arts, culture & heritage</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Chill" onclick="PinPointForPlacesOfInterest(map,this);" />Wine & Chill</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Attractions" onclick="PinPointForPlacesOfInterest(map,this);" />Exciting attractions</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Entertainment" onclick="PinPointForPlacesOfInterest(map,this);" />Leisure & Entertainment</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Nature" onclick="PinPointForPlacesOfInterest(map,this);" />Garden & Nature</li>



             

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/help1.png" width="70" height="65"><div id="menutext">Help</div><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                             <li style="text-align:center;"><h3>Seek For Help</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="Embassies" onclick="PinPointForSeekForHelp(map,this);" />Embassies</li>
                               
                                <li style="margin-left: 10px;margin-right: 10px;"> <select id="SelectTheme" name="D1"><option value="Embassies">Embassies</option><option value="VoluntaryWelfareOrgs">Welfare Organization</option><option value="ElderCare">Elder Care</option><option value="CommuinityClubs">Ramp</option></select><br /><input id="Button2" style="width:160px" type="button" value="Polygon" onclick="toolbar.activate(esri.toolbars.Draw.POLYGON); map.hideZoomSlider();" /><br /><input id="Button3" style="width:160px" type="button" value="FreeHand Polygon" onclick="toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON); map.hideZoomSlider();" /><br /><input id="Button4" style="width:160px" type="button" value="Deactivate Drawing" onclick="toolbar.deactivate(); map.showZoomSlider(); Clear();" /><br /><div id="QueryTitle"></div><div id="QueryArea"> </div><div id="QueryLength"> </div></li>

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/health1.png" width="70" height="65"><div id="menutext">Healthcare</div><b class="caret"></b></a>
                           <ul class="dropdown-menu" style="width:400%;">
                            <div style="width:5%;float:left;height:50px"></div>
                            <div style="width:45%;float:left;">
                                <li style="text-align:center;"><h3>Settings</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type="checkbox" id="btnHeatMap1" class="queryButton queryOrange" title="Display Heatmap of Clinic/Hospital" onclick="healthHeatMapChecked(this);"/>Heat Map</li>
                                
                                </div><div style="width:45%;float:left;">

                             <li style="text-align:center;"><h3>HealthCare</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type="checkbox" id="General" onclick="PinPointForHealthcare(map, this);"/>General Hospitals</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type="checkbox" id="Communityz" onclick="PinPointForHealthcare(map, this);"/>Community Hospitals</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type="checkbox" id="Specialist" onclick="PinPointForHealthcare(map, this);"/>Specialists hospitals & institutions</li>
                                </div>  <div style="width:5%;float:left;height:50px"></div>
                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/nearby1.png" width="70" height="65"><div id="menutext">Nearby</div><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                             <li style="text-align:center;"><h3>Show Nearby</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type="button" id="btnSafetyMeasure" class="infoTempButton infoTempOrange" title="Display places nearby" value="" onclick="resultDrawSafetyLevel();" /> Nearby - <select id="safetyLevelOption" name="D2"><option value="POI">Places Of Interest</option><option value="Food">Category Of Food</option><option value="healthcare">Healthcare</option><option value="checkin">Last Checkin</option></select></li>
                               <br /> <li style="margin-left: 10px;margin-right: 10px;"><small>Buffer Dist :</small><input type="text" id="Inner" value="1"/>Km<div id="centerBuffer"><input type="button" id="myButton" class="bufferButton orange" title="Locate Nearby Buildings" onclick="safeAnalysis(this);" value="Activate Buffer" /><br /><span>Locate Nearby Buildings</span></li>
                               

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" >
                                <img src="images/icons/social1.png" width="70" height="65"><div id="menutext">Facebook</div><b class="caret"></b></a>
                            
                            
                             <ul class="dropdown-menu" style="width:400%;">
                            <div style="width:5%;float:left;height:50px"></div>
                            <div style="width:45%;float:left;">
                                <li style="text-align:center;"><h3>Settings</h3></li>
                                  <li style="margin-left: 10px;margin-right: 10px;"><input type="checkbox" id="btnHeatMap1" class="queryButton queryOrange" title="Display Heatmap of Different checkins" onclick="FBHeatMapChecked(this);"/>
                                Heat Map</li>
                                 </div><div style="width:45%;float:left;">

                                <li style="text-align:center;"><h3>Check In</h3></li>
                               
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="checkyoutube"  onclick="PinPointForYoutube(map,this);"  />Youtube</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="CHECKFB"  onclick="PinPointForFB(map,this);"  />Last Check-In</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="CHECKTWITTER"  onclick="PinPointForTwitter(map,this);"   />Tweets</li>
                                <li style="margin-left: 10px;margin-right: 10px;"><input type ="checkbox" id="CHECKCOMMEVENTS"  onclick="PinPointForFBEVENTS(map,this);"   />Community Events</li>
                               <li style="margin-left: 10px;margin-right: 10px;">Search:<input type="text" id="searchyoutube" /><input type="button" value="Submit" onclick="getSearchValue();" /></li> 
                               </div>  <div style="width:5%;float:left;height:50px"></div>
                            </ul>
                        </li>
                       
                         <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/events1.png" width="70" height="65"><div id="menutext">Home</div>
                                <b class="caret"></b></a>

                            <ul class="dropdown-menu">
                               <li style="text-align:center;"><h3>Post Event</h3></li>
                                <li style="margin-left: 10px;margin-right: 10px;">Event Name</li>
                               <li style="margin-left: 10px;margin-right: 10px;"></li>
                               <li style="margin-left: 10px;margin-right: 10px;"><input type="text" id="eventname"/></li>
                               <li style="margin-left: 10px;margin-right: 10px;">Event Description</li>
                               <li style="margin-left: 10px;margin-right: 10px;"><input type="text" id="desc"/></li>
                               <li style="margin-left: 10px;margin-right: 10px;">Event Date</li>
                               <li style="margin-left: 10px;margin-right: 10px;"><input type="date" id="eventdate"/></li>
                              <li style="margin-left: 10px;margin-right: 10px;">Event Location</li>
                              <li style="margin-right: 10px;"><input type="search" id="tblocaleSearch" list="dlSearchz" autocomplete="off" onkeyup="GetEventLocation();"placeholder="Enter your search here..."  autofocus/><datalist id="dlSearchz"></datalist></li>
                              <li style="margin-left: 10px;margin-right: 10px;"><input type="button" value="Submit" onclick="insertEventDetails();"></li>
                            
                              
                            </ul>
                        </li>
                       
                </div>
            </div>
    </div>

    <div class="container">
        <div class="jumbotron">
        </div>
    </div>


    <div class="container" id="aaaaa">
        <div style="margin-right: 550px;" class="panel panel-default">
            <div class="padd" style="margin-bottom: 10px;">
                <div class="paddright">
                    <div class="row">
                        <div id="search">
                            <table>
                                <tr>
                                    <td>Find Location
                                    </td>
                                    <td>
                                        <input type="search" id="tbSearch" list="dlSearch" autocomplete="off" onkeyup="GetSearchData();"
                                            placeholder="Enter your search here..."  autofocus  ValidationGroup="3q2wase" />
                                        <datalist id="dlSearch">
                        </datalist>
                                    </td>
                                    <td>
                                        <a class="button blue" onclick="zoomToArea(this);">Search</a>
                                        <div id="divResults">
                                        </div>
                                        <div id="divResults2">
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <span>(e.g 786 Yishun Ring Road or 307987 or Orchard Road)</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="container3">
                            <div style="width: 1060px; height: 600px;position:relative;" id="Map">
                                <div id="divrefresh">
                                    <input id="Button13" type="button" value="Refresh Map" onclick="Clear();" />
                                    <input id="Button14" type="button" value="Get Current Location" onclick="getLocation();" />
                                </div>
                               
                           
                                </div>
                                <!-- add div -->
                                             </div>
                            <div id="heatLayerDiv">
                            </div>
                            
                      
                        </div>




                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div style="" class="navbar navbar-default navbar-fixed-bottom ">
        <div id="aaa" class="container">
            <center>
           <!--<div style='position: absolute; top: 0;  left: 0; width:100%; text-align:center; vertical-align: middle;background:#7f7f7f;  background:rgba(255,255,255,0.7); height:100%;'> <style>div#tobecovered{    position: relative;  margin-top:150px; }div#tobecovered img.cover{    position: absolute;    /* position in top left of #tobecovered */    top: 400px; /* top of #tobecovered */    left: 0; /* left of #tobecovered */}    </style>  <div id='tobecoverd'>    <img style='' src='images/loading.gif' alt='text' class='cover' /></div> -->
                <p class="navbar-text">Follow us on:</p>
                <asp:Button ID="Button15" runat="server" onclick="Button15_Click" 
                    Text="logout" />
                <asp:TextBox ID="tbsearch" runat="server"></asp:TextBox>    <asp:Button ID="btnTwitter" runat="server" ValidationGroup="3q2wase" onclick="btnTwitter_Click" 
                    Text="Analyse Twitter"  /> <img visible="false" id="loadingimage" runat="server" src='images/loading.gif' alt='text' class='cover' />
                    
                <a href="https://www.facebook.com" class="navbar-btn btn-primary btn">Facebook</a>
                <a href="https://www.twitter.com" class="navbar-btn btn-info btn">Twitter</a>
                <a href="https://plus.google.com" class="navbar-btn btn-success btn">Google Plus</a>
                <a href="https://www.youtube.com" class="navbar-btn btn-danger btn ">Youtube</a>
                
            </center>
        </div>
    </div>

    <div class="modal fade" id="About" role="dialog">
    <div class="model-abc" style="width:100%;">
    <div style="margin:0 auto;width: 50%;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                 
                </div>
                <div class="modal-body" id='databody'>
                </div>
            </div>
        </div>
    </div>
  </div>
   </div>

    <div class="modal fade" id="youtube" role="dialog">
    <div class="model-abc" style="width:100%;">
    <div style="margin:0 auto;width: 50%;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-headerz">
                 
                </div>
                <div class="modal-body" id='youtubebody'>
                </div>
            </div>
        </div>
    </div>
  </div>
   </div>

    <script src="http://platform.twitter.com/widgets.js "></script>

    <script type="text/javascript" charset="utf-8" src="JQuery/jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="JQuery/jquery-ui.js"></script>
            
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/bootstrap.js"></script>
    <asp:GridView ID="FoodGrid" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
    <asp:GridView ID="PlacesOfInterestGrid" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
    <asp:GridView ID="SeekForHelpGrid" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
    <asp:GridView ID="CheckinGrid" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
     <asp:GridView ID="TwitterGrid" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
    <asp:GridView ID="HealthcareGrid" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
    <asp:GridView ID="HousingDevelopmentBoardDGV" runat="server" BackColor="#F2F2F2" BorderColor="White" ForeColor="#F2F2F2" GridLines="None">
    </asp:GridView>
    <asp:GridView ID="PrimarySchoolDGV" runat="server">
    </asp:GridView>
      <asp:GridView ID="EmbassyDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="SecondarySchoolDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="JuniorCollegeDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="PolytechnicDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="UniversityDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="livetrafficIncidentDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="ZebraCrossingDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="PedestrianCrossingDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="SchoolZoneDGV" runat="server">
    </asp:GridView>
    <asp:GridView ID="OverHeadBridgeDGV" runat="server">
    </asp:GridView>


        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="True">
    </asp:ScriptManager>
   
            <div visible="true" runat="server" id="hehehee" class="slide-out-div" style="   z-index: 1 ">
                <a class="handle" href="http://link-for-non-js-users.html" 
                    style="height: 220px !important;">Content</a>
                <h3>
                    Registration</h3>
         
             <br />
                <table class="nav-justified">
                    <tr>
                        <td class="style1">
                            Username</td>
                        <td>
                        <input type="text" id="tbusername" runat="server" style="width:105px;"/>
                           
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            Password</td>
                        <td>
                          <input type="password" id="tbpassword" runat="server" style="width:105px;"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            Contact Number</td>
                        <td>
                             <input type="text" id="tbcontactno" runat="server" style="width:104px;"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            &nbsp;</td>
                        <td>
                          <input type="button" value="Submit" onclick="registeracc();">
                           
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            &nbsp;</td>
                        <td>
                            &nbsp;</td>
                    </tr>
                </table>
            </div>
       


        <script  type="text/javascript" src="js/jquery.tabSlideOut.v1.3.js"></script>
     
     <script type = "text/javascript">
         function registeracc() {
             $.ajax({
                 type: "POST",
                 url: "Default.aspx/registeracc",
                 data: '{usernamezz: "' + document.getElementById('tbusername').value + '" , passwordzz: "' + document.getElementById('tbpassword').value + '" , contactnozz: "' + document.getElementById('tbcontactno').value + '"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: OnSuccess1212121,
                 failure: function (response) {

                 }
             });
         }
         function OnSuccess1212121(response) {
              alert(response.d);
              document.getElementById('tbusername').value = "";
              document.getElementById('tbpassword').value = "";
              document.getElementById('tbcontactno').value = "";
         }

</script>
           
   
            
   
            <div visible="true" runat="server" id="hahahah" class="slide-out-div4" style="   z-index: 1 ">
                <a class="handle4" href="http://link-for-non-js-users.html" 
                    style="height: 220px !important;">Content</a>
                <h3>
                    Login</h3>
                <br />
                <table class="nav-justified">
                    <tr>
                        <td class="style2">
                            Username</td>
                        <td class="style3">
                            <asp:TextBox ID="tbloginname" runat="server" Width="86px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                            Password</td>
                        <td class="style3">
                            <asp:TextBox ID="tbloginpw" runat="server" TextMode="Password" Width="86px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                           <br /></td>
                        <td class="style3">
                            <asp:Button ID="btnlogin" runat="server" onclick="btnlogin_Click" 
                                Text="login" />
                        </td>
                    </tr>
                </table>
            </div>
     
          
          
          
          


       

      

       

    <script type="text/javascript" src="http://code.highcharts.com/highcharts.js"></script>
    <script  type="text/javascript" src="http://code.highcharts.com/modules/exporting.js"></script>

     <script>
         $('ul.nav li.dropdown').hover(function () {
             $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
             $(this).css("background-color", "grey");
         }, function () {
             $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
             $(this).css("background-color", "transparent");
         });

         $(function () {
             $('.slide-out-div').tabSlideOut({
                 tabHandle: '.handle',                     //class of the element that will become your tab
                 pathToTabImage: 'images/icons/regbar.png',    //path to the image for the tab //Optionally can be set using css
                 imageHeight: '152px',                     //height of tab image           //Optionally can be set using css
                 imageWidth: '60px',                       //width of tab image            //Optionally can be set using css
                 tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
                 speed: 300,                               //speed of animation
                 action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                 topPos: '200px',                          //position from the top/ use if tabLocation is left or right
                 leftPos: '20px',                          //position from left/ use if tabLocation is bottom or top
                 fixedPosition: false,                     //options: true makes it stick(fixed position) on scroll
                              
             });


         });

    </script>
      <script>
          $(function () {
              $('.slide-out-div2').tabSlideOut({
                  tabHandle: '.handle2',                     //class of the element that will become your tab
                  pathToTabImage: 'images/icons/twitterbar.png', //path to the image for the tab //Optionally can be set using css
                  imageHeight: '90px',                     //height of tab image           //Optionally can be set using css
                  imageWidth: '60px',                       //width of tab image            //Optionally can be set using css
                  tabLocation: 'right',                      //side of screen where tab lives, top, right, bottom, or left
                  speed: 300,                               //speed of animation
                  action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                  topPos: '200px',                          //position from the top/ use if tabLocation is left or right
                  leftPos: '20px',
                                                            //position from left/ use if tabLocation is bottom or top
                  fixedPosition: false                      //options: true makes it stick(fixed position) on scroll
              });

          });
          $(function () { //this is the jquery slider
              $('.slide-out-div3').tabSlideOut({
                  tabHandle: '.handle3',                    //class of the element that will become your tab
                  pathToTabImage: 'images/icons/placesbar.png', //path to the image for the tab //Optionally can be set using css
                  imageHeight: '132px',                     //height of tab image           //Optionally can be set using css
                  imageWidth: '60px',                       //width of tab image            //Optionally can be set using css
                  tabLocation: 'right',                     //side of screen where tab lives, top, right, bottom, or left
                  speed: 300,                               //speed of animation
                  action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                  topPos: '505px',                          //position from the top/ use if tabLocation is left or right
                  leftPos: '20px',
                                                            //position from left/ use if tabLocation is bottom or top
                  fixedPosition: false                      //options: true makes it stick(fixed position) on scroll
              });

          });

          $(function () {
              $('.slide-out-div4').tabSlideOut({
                  tabHandle: '.handle4',                    //class of the element that will become your tab
                  pathToTabImage: 'images/icons/loginbar.png',    //path to the image for the tab //Optionally can be set using css
                  imageHeight: '152px',                     //height of tab image           //Optionally can be set using css
                  imageWidth: '60px',                       //width of tab image            //Optionally can be set using css
                  tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
                  speed: 300,                               //speed of animation
                  action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                  topPos: '505px',                          //position from the top/ use if tabLocation is left or right
                  leftPos: '20px',
                                                            //position from left/ use if tabLocation is bottom or top
                  fixedPosition: false,                     //options: true makes it stick(fixed position) on scroll
                                   
              });

          });
    </script>

 
        <div class="slide-out-div2" style="width:350px !important">
           <div id="twitterfeedtoptrend" runat="server">
          
	
    
         </div>
        </div>
                    
                      <div class="slide-out-div3" style="width:350px !important">
         
           <div id="mostvisitedplaces" runat="server">
		                  
		              
		                <!-- <i class="fa fa-arrow-down" id="nt-example3-next"></i> -->
		            </div>
                      <div id="zoomgg" runat="server">
		                  
		              
		                <!-- <i class="fa fa-arrow-down" id="nt-example3-next"></i> -->
		            </div>
        </div>
  



       




<input type="hidden" id="fb_checked">
<input type="hidden" id="tw_checked">

<div id="newsfeeddiv" runat="server" style="position: fixed; left: 40px; top: 165px; display: block; border:1;-moz-border-radius: 1px;
-webkit-border-radius: 1px;
border-radius: 1px;
-webkit-box-shadow: inset 0px 0px 5px 0px #777777;
-moz-box-shadow: inset 0px 0px 5px 0px #777777;
box-shadow: inset 0px 0px 5px 0px #777777;
-moz-transition: all 0.4s ease-out;
-webkit-transition: all 0.4s ease-out;
-o-transition: all 0.4s ease-out;
transition: all 0.4s ease-out;min-width: 150px;

min-height: 400px;">
    
        </div>

 

</form>

        <script src="js/rotating/chart.js"></script>
    <script src="js/rotating/prism.js"></script>
    <script src="js/rotating/jquery.mCustomScrollbar.min.js"></script>
    <script src="js/rotating/jquery.newsTicker.js"></script>
      
    <script type = "text/javascript">
        function getCoords() {
            $.ajax({
                type: "POST",
                url: "Default.aspx/getCoords",
                data: '{placename: "' + $('#nt-example3 li:first').text().toUpperCase() + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                failure: function (response) {

                }
            });
        }
        function OnSuccess(response) {
            // alert(response.d);
            var x = response.d.split(",")[0];
            var y = response.d.split(",")[1];
            $('#zoomgg').html("<input type ='checkbox' id='zoomtolocatez' onclick='zoommmm(" + "map" + ",\"" + x + "\",\"" + y + "\");' />Zoom to location");
        }



      




</script>
  <script>

      function graphStreamPublish(msg, slink, spicture, sname, sdescription) {
          showLoader(true);
          var x = document.getElementById("sharermsg").value;
          var lol = document.getElementById("sharemsg");  //$("#username").innerText; //.val(); //document.getElementById("sharemsg").val();
              alert(x);
              FB.api('/me/feed', 'post',
                    {
                        message: x,
                        link: slink,
                        picture: spicture,
                        name: sname,
                        description: sdescription

                    },
                function (response) {
                    showLoader(false);

                    if (!response || response.error) {
                        alert('Error occured');
                    } else {
                        alert('Post ID: ' + response.id);
                    }
                });
          
      }

      $(window).load(function () {
          $('code.language-javascript').mCustomScrollbar();
      });
      var nt_title = $('#nt-title').newsTicker({
          row_height: 40,
          max_rows: 1,
          duration: 3000,
          pauseOnHover: 0
      });
      var nt_example1 = $('#nt-example1').newsTicker({
          row_height: 80,
          max_rows: 7,
          duration: 2000,
          prevButton: $('#nt-example1-prev'),
          nextButton: $('#nt-example1-next')
      });
      var counter = 0;
      var nt_example2 = $('#nt-example2').newsTicker({
          row_height: 60,
          max_rows: 1,
          speed: 300,
          duration: 6000,
          prevButton: $('#nt-example2-prev'),
          nextButton: $('#nt-example2-next'),
          hasMoved: function () {
              $('#nt-example2-infos-container').fadeOut(200, function () {
                  $('#nt-example2-infos .infos-hour').text($('#nt-example2 li:first span').text());
                  $('#nt-example2-infos .infos-text').text($('#nt-example2 li:first').data('infos'));
                  $('#nt-example2-infos .infos-tweeter').html($('#nt-example2 li:first #info-t').html());
                  $('#nt-example2-infos .ppic').html($('#nt-example2 li:first #ppicc').html());
                  $('#nt-example2-infos .tweetll').html("<input  type='checkbox'  name='zoomtolocate" + counter + "' id='zoomtolocate" + counter + "' onclick='Clear();" + $('#nt-example2 li:first #tweetlatlong').html() + "'>Zoom to Location  " + "<input type='checkbox' id='btnHeatMap1' class='queryButton queryOrange' title='Display Heatmap of Different checkins' onclick='TwitHeatMapChecked(this);'/>HeatMap");
                  $(this).fadeIn(400);




                  counter++;
              });
          },
          pause: function () {
              $('#nt-example2 li i').removeClass('fa-play').addClass('fa-pause');
          },
          unpause: function () {
              $('#nt-example2 li i').removeClass('fa-pause').addClass('fa-play');
          }
      });
      $('#nt-example2-infos').hover(function () {
          nt_example2.newsTicker('pause');
      }, function () {
          nt_example2.newsTicker('unpause');
      });
      var state = 'stopped';
      var speed;
      var add;
      var nt_example3 = $('#nt-example3').newsTicker({
          row_height: 80,
          max_rows: 1,
          duration: 3000,
          speed: 10,
          autostart: 0,
          pauseOnHover: 0,
          hasMoved: function () {
              if (speed > 700) {
                  $('#nt-example3').newsTicker("stop");
                  console.log('stop')
                  $('#nt-example3-button').text("RESULT: " + $('#nt-example3 li:first').text().toUpperCase());
                  setTimeout(function () {
                      $('#nt-example3-button').text("START");
                      state = 'stopped';
                  }, 2500);
                  getCoords();
                  //alert($('#nt-example3 li:first').text().toUpperCase());


              }
              else if (state == 'stopping') {
                  add = add * 1.4;
                  speed = speed + add;
                  console.log(speed)
                  $('#nt-example3').newsTicker('updateOption', "duration", speed + 25);
                  $('#nt-example3').newsTicker('updateOption', "speed", speed);
              }
          }
      });

      $('#nt-example3-button').click(function () {
          if (state == 'stopped') {
              state = 'turning';
              speed = 1;
              add = 1;
              $('#nt-example3').newsTicker('updateOption', "duration", 0);
              $('#nt-example3').newsTicker('updateOption', "speed", speed);
              nt_example3.newsTicker('start');
              $(this).text("STOP");
          }
          else if (state == 'turning') {
              state = 'stopping';
              $(this).text("WAITING...");
          }
      });
        </script>



   
         <script type="text/javascript">


             function showAdmin() {
                 $('.modal-header').html('<div> <h4>Post Community Event</h4></div>');
                 $('#databody').html('<div><table><tr><td>Event Name</td><td><input type="text" id="eventname"/></td></tr><tr><td>Event Description</td><td><input type="text" id="desc"/></td></tr><tr><td>Event Date</td><td><input type="date" id="eventdate"/></td></tr><tr><td>Event Location</td><td><input type="search" id="tblocaleSearch" list="dlSearchz" autocomplete="off" onkeyup="GetEventLocation();"placeholder="Enter your search here..."  autofocus/><datalist id="dlSearchz"></datalist></td></tr><tr><td></td><td><input type="submit" onclick=""/></td></tr> </div>');
                 $('#About').modal('show');
             }

             function showmodal() {
                 $('.modal-header').html('<div> <h4>About Us</h4></div>');
                 $('#databody').html('<div><h3>Our Vision</h3> We believe in providing our users with the most efficient and reliable methods in getting around Singapore.</p></div>');
                 $('#About').modal('show');
             }
             function showFood() {
                 $('.modal-header').html('<div> <h4>Food Centres</h4></div>');
                 $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="HawkerCentres" onclick="PinPointForFoodStation(map,this);" />Hawker Centres</tr></div>');
                 if (localStorage.getItem("HawkerCentres") == "checked") {
                     document.getElementById("HawkerCentres").checked = true;
                 }

                 $('#About').modal('show');
             }


             function showInternationalFood() {
                 $('.modal-header').html('<div> <h4>International Cuisine</h4></div>');
                 $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="Chinese" onclick="PinPointForFoodStation(map,this);" />Chinese</tr> </br><tr><input type ="checkbox" id="european" onclick="PinPointForFoodStation(map,this);" />European</tr> </br><tr><input type ="checkbox" id="Filipino" onclick="PinPointForFoodStation(map,this);" />Filipino</tr> </br><tr><input type ="checkbox" id="Indian" onclick="PinPointForFoodStation(map,this);" />Indian</tr></br><tr><input type ="checkbox" id="Japanese" onclick="PinPointForFoodStation(map,this);" />Japanese</tr> </br><tr><input type ="checkbox" id="Korea" onclick="PinPointForFoodStation(map,this);" />Korea</tr></br><tr><input type ="checkbox" id="Malaysian" onclick="PinPointForFoodStation(map,this);" />Malaysian</tr></br><tr><input type ="checkbox" id="Thai" onclick="PinPointForFoodStation(map,this);" />Thai</tr></div>');
                 if (localStorage.getItem("Chinese") == "checked") {
                     document.getElementById("Chinese").checked = true;
                 }
                 if (localStorage.getItem("european") == "checked") {
                     document.getElementById("european").checked = true;
                 }
                 if (localStorage.getItem("Filipino") == "checked") {
                     document.getElementById("Filipino").checked = true;
                 }
                 if (localStorage.getItem("Indian") == "checked") {
                     document.getElementById("Indian").checked = true;
                 }
                 if (localStorage.getItem("Japanese") == "checked") {
                     document.getElementById("Japanese").checked = true;
                 }
                 if (localStorage.getItem("Korea") == "checked") {
                     document.getElementById("Korea").checked = true;
                 }
                 if (localStorage.getItem("Malaysian") == "checked") {
                     document.getElementById("Malaysian").checked = true;
                 }
                 if (localStorage.getItem("Thai") == "checked") {
                     document.getElementById("Thai").checked = true;
                 }
                 $('#About').modal('show');
             }

             function showCheckIn() { // this
                 $('.modal-header').html('<div> <h4>Social Media</h4></div>');
                 $('#databody').html('<div><input type="checkbox" id="btnHeatMap1" class="queryButton queryOrange" title="Display Heatmap of Different checkins" onclick="FBHeatMapChecked(this);"/></td><td>Heat Map</td></tr></br><tr><td><input type ="checkbox" id="checkyoutube"  onclick="PinPointForYoutube(map,this);"  /></td><td>Youtube</td></tr></br><tr><td><input type ="checkbox" id="CHECKFB"  onclick="PinPointForFB(map,this);"  /></td><td>Last Check-In</td></tr></br><tr><td><input type ="checkbox" id="CHECKTWITTER"  onclick="PinPointForTwitter(map,this);"   /></td><td>Tweets</td></tr></br><tr><td><input type ="checkbox" id="CHECKCOMMEVENTS"  onclick="PinPointForFBEVENTS(map,this);"   /></td><td>Community Events</td></tr></br><tr><td>Search:</td><td><input type="text" id="searchyoutube" /></td><td><input type="submit" onclick="getSearchValue();" /></td></tr></table></div>');
                 if (localStorage.getItem("CHECKFB") == "checked") {
                     document.getElementById("CHECKFB").checked = true;
                 }
                 if (localStorage.getItem("CHECKTWITTER") == "checked") {
                     document.getElementById("CHECKTWITTER").checked = true;
                 }
                 if (localStorage.getItem("CHECKCOMMEVENTS") == "checked") {
                     document.getElementById("CHECKCOMMEVENTS").checked = true;
                 }
                 if (localStorage.getItem("btnHeatMap1") == "checked") {
                     document.getElementById("btnHeatMap1").checked = true;

                 }

                 $('#About').modal('show');
             }

             function showPlacesOfInterest() {
                 $('.modal-header').html('<div> <h4>Places of interest</h4></div>');
                 $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="Arts" onclick="PinPointForPlacesOfInterest(map,this);" />Arts, culture & heritage</tr> </br><tr><input type ="checkbox" id="Chill" onclick="PinPointForPlacesOfInterest(map,this);" />Wine & Chill</tr> </br><tr><input type ="checkbox" id="Attractions" onclick="PinPointForPlacesOfInterest(map,this);" />Exciting attractions</tr> </br><tr><input type ="checkbox" id="Entertainment" onclick="PinPointForPlacesOfInterest(map,this);" />Leisure & Entertainment</tr></br><tr><input type ="checkbox" id="Nature" onclick="PinPointForPlacesOfInterest(map,this);" />Garden & Nature</tr> </br><tr></div>');
                 if (localStorage.getItem("Arts") == "checked") {
                     document.getElementById("Arts").checked = true;
                 }
                 if (localStorage.getItem("Chill") == "checked") {
                     document.getElementById("Chill").checked = true;
                 }
                 if (localStorage.getItem("Attractions") == "checked") {
                     document.getElementById("Attractions").checked = true;
                 }
                 if (localStorage.getItem("Entertainment") == "checked") {
                     document.getElementById("Entertainment").checked = true;
                 }
                 if (localStorage.getItem("Nature") == "checked") {
                     document.getElementById("Nature").checked = true;
                 }
                 $('#About').modal('show');
             }

             function showSeekForHelp() {
                 $('.modal-header').html('<div> <h4>Seek for help</h4></div>');
                 //esriToolbar.activate(esri.toolbars.Draw.POLYGON);map.hideZoomSlider();
                 //esriToolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);map.hideZoomSlider();
                 //esriToolbar.deactivate();map.showZoomSlider();Clear();
                 $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="Embassies" onclick="PinPointForSeekForHelp(map,this);" />Embassies</tr> </br><tr><input type ="checkbox" id="GRC" onclick="PinPointForSeekForHelp(map,this);" />GRCs</tr> </br><tr><input type ="checkbox" id="Towncouncils" onclick="PinPointForSeekForHelp(map,this);" />Town councils</tr> </br><tr><input type ="checkbox" id="Community" onclick="PinPointForSeekForHelp(map,this);" />Community Centres</tr> </br><tr>  <select id="SelectTheme" name="D1"><option value="Embassies">Embassies</option><option value="VoluntaryWelfareOrgs">Welfare Organization</option><option value="ElderCare">Elder Care</option><option value="CommuinityClubs">Ramp</option></select><br /><input id="Button2" style="width:160px" type="button" value="Polygon" onclick="toolbar.activate(esri.toolbars.Draw.POLYGON); map.hideZoomSlider();" /><br /><input id="Button3" style="width:160px" type="button" value="FreeHand Polygon" onclick="toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON); map.hideZoomSlider();" /><br /><input id="Button4" style="width:160px" type="button" value="Deactivate Drawing" onclick="toolbar.deactivate(); map.showZoomSlider(); Clear();" /><br /><div id="QueryTitle"></div><div id="QueryArea"> </div><div id="QueryLength"> </div></div>');
                 if (localStorage.getItem("Embassies") == "checked") {
                     document.getElementById("Embassies").checked = true;
                 }
                 if (localStorage.getItem("GRC") == "checked") {
                     document.getElementById("GRC").checked = true;
                 }
                 if (localStorage.getItem("Towncouncils") == "checked") {
                     document.getElementById("Towncouncils").checked = true;
                 }
                 if (localStorage.getItem("Community") == "checked") {
                     document.getElementById("Community").checked = true;
                 }
                 $('#About').modal('show');
                 twttr.widgets.load();
             }

             function showHealthcare() {
                 $('.modal-header').html('<div> <h4>Healthcare</h4></div>');
                 //heatInit();getHeatmapHealth();changeMapIcon(this);
                 $('#databody').html('<div><table><tr><td><input type="checkbox" id="btnHeatMap1" class="queryButton queryOrange" title="Display Heatmap of Clinic/Hospital" onclick="healthHeatMapChecked(this);"/></td><td>Heat Map</td></tr> <tr><td><input type="checkbox" id="btnHandPoint" class="queryButton queryOrange" title="Click to add a Point" onclick="createPointToolBar();"/></td><td>Point Location</td></tr></table> <small style="color:grey;"><b>Point to Nearest Hospital/Clinic</b></small><br /><br /><table><tr><td><input type="checkbox" id="General" onclick="PinPointForHealthcare(map, this);"/></td><td>General Hospitals</td></tr><tr><td><input type="checkbox" id="Community" onclick="PinPointForHealthcare(map, this);"/></td><td>Community Hospitals</td></tr>  <tr><td><input type="checkbox" id="Specialist" onclick="PinPointForHealthcare(map, this);"/></td><td>Specialists hospitals & institutions</td></tr></table></div>');
                 if (localStorage.getItem("General") == "checked") {
                     document.getElementById("General").checked = true;
                 }
                 if (localStorage.getItem("Community") == "checked") {
                     document.getElementById("Community").checked = true;
                 }
                 if (localStorage.getItem("Specialist") == "checked") {
                     document.getElementById("Specialist").checked = true;
                 }
                 $('#About').modal('show');
             }

             function showSafetyAnalysis() {
                 $('.modal-header').html('<div> <h4>Query Places</h4></div>');
                 $('#databody').html('<div><input type="button" id="btnSafetyMeasure" class="infoTempButton infoTempOrange" title="Display places nearby" value="" onclick="resultDrawSafetyLevel();" /> Nearby - <select id="safetyLevelOption" name="D2"><option value="POI">Places Of Interest</option><option value="Food">Category Of Food</option><option value="Help">Help</option><option value="healthcare">Healthcare</option><option value="checkin">Last Checkin</option></select><br /><br /><small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buffer Dist :&nbsp;</small><input type="text" id="Inner" value="1"/>Km<div id="centerBuffer"><input type="button" id="myButton" class="bufferButton orange" title="Locate Nearby Buildings" onclick="safeAnalysis(this);" value="Activate Buffer" /><br /><span>Locate Build to Order HDB</span></div></div>');
                 $('#About').modal('show');
             }


            

    </script>
  
  


</body>
</html>
