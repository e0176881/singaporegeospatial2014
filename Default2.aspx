<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default2.aspx.cs" Inherits="Default2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Home Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-translate-customization" content="5efc71db34a2ea39-4f964eef36836a29-gf70e15d9d76f8e80-e"></meta>
    	 <%--Javascript Functions and Features--%>
  
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
		<script src="Scripts\slider\jquery.carouFredSel-6.0.4-packed.js" type="text/javascript"></script>
		<script type="text/javascript">
		    $(function () {

		        $('#carousel span').append('<img src="img/gui/carousel_glare.png" class="glare" />');
		        $('#thumbs a').append('<img src="img/gui/carousel_glare_small.png" class="glare" />');

		        $('#carousel').carouFredSel({
		            responsive: true,
		            circular: false,
		            auto: false,
		            items: {
		                visible: 1,
		                width: 200,
		                height: '56%'
		            },
		            scroll: {
		                fx: 'directscroll'
		            }
		        });

		        $('#thumbs').carouFredSel({
		            responsive: true,
		            circular: false,
		            infinite: false,
		            auto: false,
		            prev: '#prev',
		            next: '#next',
		            items: {
		                visible: {
		                    min: 2,
		                    max: 6
		                },
		                width: 150,
		                height: '66%'
		            }
		        });

		        $('#thumbs a').click(function () {
		            $('#carousel').trigger('slideTo', '#' + this.href.split('#').pop());
		            $('#thumbs a').removeClass('selected');
		            $(this).addClass('selected');
		            return false;
		        });

		    });
		</script>




 

   
  


   
   <style type="text/css">
			
			
		
			#wrapper {
				
				width: 100%;
				left: 25%;
				top: 50px;
			}
			#carousel-wrapper {
				padding-bottom: 10px;
				position: relative;
			}
			#carousel, #thumbs {
				overflow: hidden;
			}
			#carousel-wrapper .caroufredsel_wrapper {
				border-radius: 10px;
				box-shadow: 0 0 5px #899;
			}

			#carousel span, #carousel img,
			#thumbs a, #thumbs img  {
				display: block;
				float: left;
			}
			#carousel span, #carousel a,
			#thumbs span, #thumbs a {
				position: relative;
			}
			#carousel img,
			#thumbs img {
				border: none;
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}
			#carousel img.glare,
			#thumbs img.glare {
				width: 102%;
				height: auto;
			}

			#carousel span {
				width: 554px;
				height: 313px;
			}

			#thumbs-wrapper {
				padding: 20px 40px;
				position: relative;
			}
			#thumbs a {
				border: 2px solid #899;
				width: 150px;
				height: 100px;
				margin: 0 10px;
				overflow: hidden;
				border-radius: 10px;
				
				-webkit-transition: border-color .5s;
				-moz-transition: border-color .5s;
				-ms-transition: border-color .5s;
				transition: border-color .5s;
			}
			#thumbs a:hover, #thumbs a.selected {
				border-color: #566;
			}
			
			#wrapper img#shadow {
				width: 100%;
				position: absolute;
				bottom: 0;
			}

			#prev, #next {
				background: transparent url('img/gui/carousel_nav.png') no-repeat 0 0;
				display: block;
				width: 19px;
				height: 20px;
				margin-top: -10px;
				position: absolute;
				top: 50%;
			}
			#prev {
				background-position: 0 0;
				left: 10px;
			}
			#next {
				background-position: -19px 0;
				right: 10px;
			}			
			#prev:hover { 
				background-position: 0 -20px;				
			}
			#next:hover {
				background-position: -19px -20px;				
			}
			#prev.disabled, #next.disabled {
				display: none !important;
			}
			
		
		.style1
       {
       }
       .style2
       {
           width: 78px;
       }
			
		
		</style>


</head>
<body class="tundra">





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
                    <div style="margin: 4px 10px 0px 0px;" id="welcomemessage"></div>
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
            <div class="container" style="min-height: 100px;">
                <a href="#" class="navbar-brand">
                    <img src="images/icons/header.jpg" width="250" height="60"></a>
                <button class="navbar-toggle" data-toggle="collapse" onclick="return false;" data-target=".navHeaderCollapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <div class="collapse navbar-collapse navHeaderCollapse">
                    <ul class="nav navbar-nav navbar-right">

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/house-icon1.png" width="70" height="65"><div id="menutext">Home</div>
                                <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showmodal();return false;'>About Us</a></li>
                                <li><a href="#">Videos</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/HawkerCentres.png" width="70" height="65"><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showFood();return false;'>Food Centres</a></li>
                                <li><a href="#" onclick='showInternationalFood();return false;'>International Food</a></li>

                            </ul>
                        </li>


                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/interest-icon1.png" width="70" height="65"><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showPlacesOfInterest();return false;'>Places of interest</a></li>

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/help-icon1.png" width="70" height="65"><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showSeekForHelp();return false;'>Seek for help</a></li>

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="#" width="70" height="65"><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showHealthcare();return false;'>Healthcare</a></li>

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="#" width="70" height="65"><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showSafetyAnalysis();return false;'>Healthcare</a></li>

                            </ul>
                        </li>

                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="images/icons/check-in-icon1.png" width="70" height="65"><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" onclick='showCheckIn();return false;'>Check In</a></li>

                            </ul>
                        </li>
                </div>
            </div>
    </div>

    <div class="container">
        <div class="jumbotron">
        </div>
    </div>


    
                    <div class="row">
                      
                        </div>
                        <div class="container" style="margin-bottom: 70px;">
                            <div style="width: 1060px; height: 600px; margin-top:30px; id="Map">
                            					<div class = "col-md-6">
						<h3><div id="setplacename" runat="server"></div>
                           </h3>
						<p>                      <div id="wrapper">
			<div id="carousel-wrapper">
				<img id="shadow" src="img/gui/carousel_shadow.png" />
				<div id="carousel">
					<span id="pixar"><img src="img/large/pixar.jpg" /></span>
					<span id="bugs"><img src="img/large/bugs.jpg" /></span>
					<span id="cars"><img src="img/large/cars.jpg" /></span>
					<span id="incred"><img src="img/large/incred.jpg" /></span>
					<span id="monsters"><img src="img/large/monsters.jpg" /></span>
					<span id="nemo"><img src="img/large/nemo.jpg" /></span>
					<span id="rat"><img src="img/large/rat.jpg" /></span>
					<span id="toystory"><img src="img/large/toystory.jpg" /></span>
					<span id="up"><img src="img/large/up.jpg" /></span>
					<span id="walle"><img src="img/large/walle.jpg" /></span>
				</div>
			</div>
			<div id="thumbs-wrapper">
				<div id="thumbs">
					<a href="#pixar" class="selected"><img src="img/small/pixar.jpg" /></a>
					<a href="#bugs"><img src="img/small/bugs.jpg" /></a>
					<a href="#cars"><img src="img/small/cars.jpg" /></a>
					<a href="#incred"><img src="img/small/incred.jpg" /></a>
					<a href="#monsters"><img src="img/small/monsters.jpg" /></a>
					<a href="#nemo"><img src="img/small/nemo.jpg" /></a>
					<a href="#rat"><img src="img/small/rat.jpg" /></a>
					<a href="#toystory"><img src="img/small/toystory.jpg"  /></a>
					<a href="#up"><img src="img/small/up.jpg" /></a>
					<a href="#walle"><img src="img/small/walle.jpg" /></a>
				</div>
				<a id="prev" href="#"></a>
				<a id="next" href="#"></a>
			</div>
		</div>
         <asp:Label ID="LabelPlaceName" runat="server" Text="Label"></asp:Label>
        </p>  
					</div>
                    <div class = "col-md-6">
						<h3>Description</h3>
						<p> <div id="setdescription" runat="server"></div></p>

					    <table class="nav-justified">
                            <tr>
                                <td align="left" class="style1" colspan="2">
                              <center> <h1>    Reviews </h1></center> </td> 
                            </tr>
                            <tr>
                            <td align="left" class="style1" colspan="2">
                              <center><div id="setreviews" runat="server"></div></center> </td> 
                            </tr>
                            <tr>
                                <td align="left" class="style1" colspan="2">
                                    &nbsp;</td>
                            </tr>
                            <tr>
                                <td class="style2">
                                    Comments:</td>
                                <td>
                                    <asp:TextBox ID="tbcomments" runat="server" Height="55px" TextMode="MultiLine" 
                                        Width="443px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="style2">
                                    &nbsp;</td>
                                <td>
                                    &nbsp;</td>
                            </tr>
                            <tr>
                                <td class="style2">
                                    &nbsp;</td>
                                <td>
                                    <asp:Button ID="btnSubmit" runat="server" Text="Submit" 
                                        onclick="btnSubmit_Click" />
                                </td>
                            </tr>
                        </table>
					</div>
                            </div>
            </div>
        </div>
    </div>

    <div style="" class="navbar navbar-default navbar-fixed-bottom ">
        <div id="aaa" class="container">
            <center>
                <p class="navbar-text">Follow us on:</p>
                <a href="https://www.facebook.com" class="navbar-btn btn-primary btn">Facebook</a>
                <a href="https://www.twitter.com" class="navbar-btn btn-info btn">Twitter</a>
                <a href="https://plus.google.com" class="navbar-btn btn-success btn">Google Plus</a>
                <a href="https://www.youtube.com" class="navbar-btn btn-danger btn ">Youtube</a>
            </center>
        </div>
    </div>

    <div class="modal fade" id="About" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                </div>
                <div class="modal-body" id='databody'>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        function showmodal() {
            $('.modal-header').html('<div> <h4>About Us</h4></div>');
            $('#databody').html('<div><h3>Our Vision</h3> We believe in providing our users with the most efficient and reliable methods in getting around Singapore.</p></div>');
            $('#About').modal('show');
        }
        function showFood() {
            $('.modal-header').html('<div> <h4>Food Centres</h4></div>');
            $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="HawkerCentres" onclick="PinPointForFoodStation(map,this);" />Hawker Centres</tr></div>');
            $('#About').modal('show');
        }


        function showInternationalFood() {
            $('.modal-header').html('<div> <h4>International Cuisine</h4></div>');
            $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="Chinese" onclick="PinPointForFoodStation(map,this);" />Chinese</tr> </br><tr><input type ="checkbox" id="European" onclick="PinPointForFoodStation(map,this);" />European</tr> </br><tr><input type ="checkbox" id="Filipino" onclick="PinPointForFB(map,this);" />Filipino</tr> </br><tr><input type ="checkbox" id="Indian" onclick="PinPointForFB(map,this);" />Indian</tr></br><tr><input type ="checkbox" id="Japanese" onclick="PinPointForFB(map,this);" />Japanese</tr> </br><tr><input type ="checkbox" id="Korea" onclick="PinPointForFB(map,this);" />Korea</tr></br><tr><input type ="checkbox" id="Malaysian" onclick="PinPointForFB(map,this);" />Malaysian</tr></br><tr><input type ="checkbox" id="Thai" onclick="PinPointForFB(map,this);" />Thai</tr></div>');
            $('#About').modal('show');
        }

        function showCheckIn() {
            $('.modal-header').html('<div> <h4>Check In</h4></div>');
            $('#databody').html('<div><table></br><tr><input type ="checkbox" id="CheckIn" onclick="PinPointForFB(map,this);" />Last checkin</tr><tr><input type ="checkbox" id="heatMpcheck" onclick="PinPointForheat(map,this);" />Heatmap checkin</tr> </div>');
            $('#About').modal('show');
        }

        function showPlacesOfInterest() {
            $('.modal-header').html('<div> <h4>Places of interest</h4></div>');
            $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="Arts" onclick="PinPointForPlacesOfInterest(map,this);" />Arts, culture & heritage</tr> </br><tr><input type ="checkbox" id="Chill" onclick="PinPointForPlacesOfInterest(map,this);" />Wine & Chill</tr> </br><tr><input type ="checkbox" id="Attractions" onclick="PinPointForPlacesOfInterest(map,this);" />Exciting attractions</tr> </br><tr><input type ="checkbox" id="Entertainment" onclick="PinPointForPlacesOfInterest(map,this);" />Leisure & Entertainment</tr></br><tr><input type ="checkbox" id="Nature" onclick="PinPointForPlacesOfInterest(map,this);" />Garden & Nature</tr> </br><tr></div>');
            $('#About').modal('show');
        }

        function showSeekForHelp() {
            $('.modal-header').html('<div> <h4>Seek for help</h4></div>');
            $('#databody').html('<div><table></br> <tr><input type ="checkbox" id="Embassies" onclick="PinPointForSeekForHelp(map,this);" />Embassies</tr> </br><tr><input type ="checkbox" id="GRC" onclick="PinPointForSeekForHelp(map,this);" />GRCs</tr> </br><tr><input type ="checkbox" id="Town councils" onclick="PinPointForSeekForHelp(map,this);" />Town councils</tr> </br><tr><input type ="checkbox" id="Community" onclick="PinPointForSeekForHelp(map,this);" />Community Centres</tr> </br><tr></div>');
            $('#About').modal('show');
            twttr.widgets.load();
        }

        function showHealthcare() {
            $('.modal-header').html('<div> <h4>Healthcare</h4></div>');
            $('#databody').html('<div><table><tr><td><input type="checkbox" id="btnHeatMap1" class="queryButton queryOrange" title="Display Heatmap of Clinic/Hospital" onclick="heatInit();getHeatmapHealth();changeMapIcon(this);"/></td><td>Heat Map</td></tr> <tr><td><input type="checkbox" id="btnHandPoint" class="queryButton queryOrange" title="Click to add a Point" onclick="createPointToolBar();"/></td><td>Point Location</td></tr></table> <small style="color:grey;"><b>Point to Nearest Hospital/Clinic</b></small><br /><br /><table><tr><td><input type="checkbox" id="General" onclick="PinPointForHealthcare(map, this);"/></td><td>General Hospitals</td></tr><tr><td><input type="checkbox" id="Community" onclick="PinPointForHealthcare(map, this);"/></td><td>Community Hospitals</td></tr>  <tr><td><input type="checkbox" id="Specialist" onclick="PinPointForHealthcare(map, this);"/></td><td>Specialists hospitals & institutions</td></tr></table></div>');
            $('#About').modal('show');
        }

        function showSafetyAnalysis() {
            $('.modal-header').html('<div> <h4>Safety Analysis</h4></div>');
            $('#databody').html('<div><input type="button" id="btnSafetyMeasure" class="infoTempButton infoTempOrange" title="Display School Accident Level" value="" onclick="resultDrawSafetyLevel();" /> Safety Level - <select id="safetyLevelOption" name="D2"><option value="Primary">Primary</option><option value="Secondary">Secondary</option><option value="JuniorCollege">JuniorCollege</option><option value="Polytechnic">Polytechnic</option><option value="University">University</option></select><br /><input type="button" id="btnSafetyMeasure2" class="infoTempButton infoTempOrange" title="Display School Accident Case" value="" onclick="" /> No. Safety Case<br /><br /><small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buffer Dist :&nbsp;</small><input type="text" id="Inner" value="1"/>Km<div id="centerBuffer"><input type="button" id="myButton" class="bufferButton orange" title="Locate Build to Order HDB" onclick="safeAnalysis(this);" value="Activate Buffer" /><br /><span>Locate Build to Order HDB</span></div></div>');
            $('#About').modal('show');
        }


    </script>
     
		
 
    


    <script src="js/bootstrap.js"></script>


    </form>

 
</body>
</html>
