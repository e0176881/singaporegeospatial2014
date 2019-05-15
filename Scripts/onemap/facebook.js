/*--------------------------------------------@AUTHOR- MINGXUAN-----------------------------------------------*/
var button;
var userInfo;
var updateButtonCalledOnce = false;
var insertsessioncalledonce = false;
var isLoggedIn = false;

window.fbAsyncInit = function () {
    FB.init({ appId: '316975208433000',
        status: true,
        cookie: true,
        xfbml: true,
        oauth: true
    });

    showLoader(true);

    function updateButton(response) {

        if (updateButtonCalledOnce) {
            return;
        }

        updateButtonCalledOnce = true;
        button = document.getElementById('fb-auth');
        userInfo = document.getElementById('user-info');

        if (response.authResponse) {
            
            isLoggedIn = true;

            //user is already logged in and connected
            FB.api('/me', function (info) {
                login(response, info);
             
            });

            button.innerHTML = "<img style='max-height: 40px;' src='images/facebooklogout.png' >";
        } else {
            //user is not connected to your app or logged out
            button.innerHTML = "<img style='max-height: 40px;'  src='images/facebooksignin.png' >";
            
        }

        button.onclick = function () {

            showLoader(true);

            if (isLoggedIn) {
                isLoggedIn = false;
                FB.logout(function (response) {
                    logout(response);
                });
                return;
            }

            FB.login(function (response) {
                if (response.authResponse) {
                    isLoggedIn = true;
                    FB.api('/me', function (info) {
                        login(response, info);
                    });
                } else {
                    //user cancelled login or did not grant authorization
                    showLoader(false);
                }
            }, { scope: 'email,user_birthday,status_update,publish_stream,user_about_me,user_location,user_checkins,user_status,friends_status,friends_checkins,friends_location' });
        }

        FB.Event.unsubscribe('auth.statusChange', updateButton);
    }

    // run once with current status and whenever the status changes
    FB.getLoginStatus(updateButton);
    FB.Event.subscribe('auth.statusChange', updateButton);
};
(function () {
    var e = document.createElement('script'); e.async = true;
    e.src = 'https://connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
} ());

function login(response, info) {
    if (response.authResponse) {
        var accessToken = response.authResponse.accessToken;

        userInfo.innerHTML = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name
                                            + "<br /> Your Access Token: " + accessToken;
        button.innerHTML = "<img style='max-height: 40px;' src='images/facebooklogout.png' >";
        showLoader(false);
        document.getElementById('other').style.display = "block";
        document.getElementById('welcomemessage').style.display = "block";
        
        fqlQuery();
        facebookgraph();
        insertSession(info.name);
      $('#hahahah').css('display', 'none');
      $('#hehehee').css('display', 'none');
    //  document.getElementById('<%= hehehee.ClientId%>').style.visibility = "hidden"; 
          
        
       
       
    }
}

function logout(response) {
    userInfo.innerHTML = "";
    button.innerHTML = 'Login';
    document.getElementById('other').style.display = "none";
    document.getElementById('welcomemessage').style.display = "none";
    showLoader(false);
    $('#hahahah').css('display', 'block');
    $('#hehehee').css('display', 'block');
    ClearSession();     
}

var fname;
var ht;
var s3x;
var lat = "1.281236"; //Should be string for the api
var long = "103.854840"; //Should be string for the api
var message = "";

function addEntry(name, hometown, sex, lat, long, message) {

    if (!isLoggedIn) {
        //Do not add entry when is not logged
        return;
    }

    /*
    Api types : (string names, string hometown , string sex, string latitude, string longitude , string message)
    */
    if (typeof (name) == 'undefined') {
        name = "";
    }

    if (typeof (hometown) == 'undefined') {
        hometown = "";
    }

    if (typeof (sex) == 'undefined') {
        sex = "";
    }

    if (typeof (lat) == 'undefined') {
        lat = "1.281236";
    }

    if (typeof (long) == 'undefined') {
        long = "103.854840";
    }
    
    if (typeof (message) == 'undefined') {
        message = "";
    }


    if (name == "" &&
        sex == "" &&
        hometown == "" &&
        sex == "" &&
        lat == "" &&
        long == "" &&
        message == "") {
        console.error("Please set the add entry parameters");
    }

    var data = {
        names: name + "",//convert to string to match the api
        hometown: hometown + "",
        sex: sex + "",
        latitude: lat + "",
        longitude: long + "",
        message: message + ""
    };

    $.post("WebService.asmx/insertFBInfo", data);
}

function facebookgraph() {
    FB.api('/193997537289496/events', function (info) {

         // console.log(info);

        for (var i = 0; i < info.data.length; i++) {
            var newtimezone;
            if (info.data[i].timezone == undefined) {
                info.data[i].timezone = 'unknown';
            }
            //callback(info.data[i].id);
            callback222(info.data[i].id, info.data[i].name, info.data[i].start_time, info.data[i].timezone, info.data[i].location);
         


        }




    });
    var callback222 = function (eventid, namee, st, tz, loc) {
        FB.api('/' + eventid, function (infoz) {

           // console.log(infoz);
            callback(eventid, namee, st, tz, loc, infoz.description);
          
        });
    }
    var callback = function (eventid, namee, st, tz, loc, descriptionzz) {
        // var callback = function (namee, st, tz, loc) {
        FB.api('/' + eventid + '/feed', function (infoz) {
            var sharecountz;
            var latzzz;
            var longzzz;
            var msgzzz;
            var postid;
            console.log(infoz);
            if (infoz.data.length == 0) {

                sharecountz = 0;
                postid = "NIL";
                //alert(sharecountz);
            }
            else {
                for (var a = 0; a < infoz.data.length; a++) {
                    postid = infoz.data[a].id;
                    if (infoz.data[a].shares == undefined) {
                        sharecountz = 0;
                    }
                    else {
                        sharecountz = infoz.data[a].shares.count;
                    }




                    //     alert(eventid);
                    /* if (infoz.data[a].shares != undefined && infoz.data[a].message != undefined && infoz.data[a].place != undefined) {
                    callback2(eventid, infoz.data[a].id, namee, st, tz, loc, infoz.data[a].message, infoz.data[a].shares.count, infoz.data[a].place.location.latitude, infoz.data[a].place.location.longitude);
                    }
                    else
                    {
                    if (infoz.data[a].message == undefined) 
                    {
                    return;
                    }
                    if (infoz.data[a].place == undefined) {
                    return;
                    }

                    if(infoz.data[a].shares == undefined)
                    {
                    callback2(eventid, infoz.data[a].id, namee, st, tz, loc, infoz.data[a].message, 0, infoz.data[a].place.location.latitude, infoz.data[a].place.location.longitude);
                    }
				
                    } */


                }

              
            }
  callback2(eventid, postid, namee, st, tz, loc, descriptionzz, sharecountz);
              

        });
    }

    var callback2 = function (eventid, postid, namee, st, tz, loc, msg, sharecount) {
        FB.api('/' + postid + '/likes', function (infozz) {



            callback3(eventid, postid, namee, st, tz, loc, msg, infozz.data.length, sharecount);




        });
    }
    var callback3 = function (eventid, postid, namee, st, tz, loc, msg, likes, sharecount) {
        FB.api('/' + postid + '/comments', function (infozz) {

            callback4(eventid, postid, namee, st, tz, loc, msg, likes, infozz.data.length, sharecount);







        });
    }

    var callback4 = function (eventid, postid, namee, st, tz, loc, msg, likes, comments, sharecount) {
        FB.api('/' + eventid + '/attending', function (infozz) {

            //   console.log(infozz);
            if (infozz.data.length == 0) {
                infozz.data.length = 0;
            }

            /*   document.getElementById('welcome').innerHTML +=
            "Event ID : " + eventid + "<br>" +
            "Event: " + namee + "<br>" +
            "StartDate : " + st + "<br>" +
            "Timezone : " + tz + "<br>" +
            "Location : " + loc + "<br>" +
            "Event Desc : " + msg + "<br>" +
            "No Of Attendees : " + infozz.data.length + "<br>" +
            "Likes :" + likes + "<br>" +
            "Shares :" + sharecount + "<br>" +
            "Comments :" + comments + "<br><br>"; */
            InsertFBEvents(eventid, namee, st, tz, loc, msg, infozz.data.length, likes, sharecount, comments);




        });
    }
}

function InsertFBEvents(eventid, eventname, startdate, timezone, location, eventinfo, NoOfAttendees, Likes, Shares, Comments) {
    
		    $.ajax({
		        type: "POST",
		        url: "Default.aspx/InsertFBEvents",
		        data: '{eventid: "' + eventid + '", eventname: "' + eventname + '" , startdate: "' + startdate + '" , timezone: "' + timezone + '" , location: "' + location + '" , eventinfo: "' + escape(eventinfo) + '" , attendees: "' + NoOfAttendees + '" , likes: "' + Likes + '" , shares: "' + Shares + '" , comments: "' + Comments + '" }',
		        contentType: "application/json; charset=utf-8",
		        dataType: "json",
		        success: OnSuccesszz,
		        failure: function (response) {

		        }
		    });
		}
		function OnSuccesszz(response) {

		    console.log(response.d);   
             
		   
		}




function fqlQuery() {

    console.log("Running query");

    var country = 'idk';
   
    showLoader(true);

    FB.api('/me', function (response) {

   
        showLoader(false);

        document.getElementById('welcomemessage').innerHTML = 'Welcome ' + response.name + "<br/>";

      

        var fbql = 'SELECT id, message, author_uid, page_id, tagged_uids, timestamp, coords FROM location_post WHERE author_uid = me() LIMIT 1';

        var query = FB.Data.query(fbql, response.id);

        query.wait(function (rows) {

            if (rows.length == 0) {
                //This will add an entry but no data received from facebook.
                addEntry(response.name,
                         "Singapore", //Take only the country
                         response.gender,
                        "1.281236", "103.854840", "");
                return;
            }

            var row = rows[0];

            if (typeof (row.coords) != 'undefined') {
                //if coords found add new entry with coordinates and data received from facebook.
                addEntry(response.name,
                         response.hometown.name.split(",")[1], //Take only the country
                         response.gender,
                         row.coords.latitude,
                         row.coords.longitude,
                         row.message);
            }
        });



        //end of fb.api
    });

    
   
}



function SuccessTestService(responce) {
    alert(eval(responce.d));
    
}


function ajaxCallFailed(error) {
    alert('error: ' + error);

}

function insertSession(sessionname) {
    $.ajax({
        type: "POST",
        url: "Default.aspx/insertSession",
        data: '{sessionnamez: "' + sessionname + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessfuck,
        failure: function (response) {

        }
    });
}
function OnSuccessfuck(response) {
    
  
}

function ClearSession() {
    $.ajax({
        type: "POST",
        url: "Default.aspx/ClearSession",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "",
        success: OnSuccessfuck1,
        failure: function (response) {

        }
    });
}
function OnSuccessfuck1(response) {


}

function showLoader(status) {
    if (status)
        document.getElementById('loader').style.display = 'block';
    else
        document.getElementById('loader').style.display = 'none';
}
 