window.fbAsyncInit = function () {
    FB.init({
        appId: '316975208433000',
        status: true,
        xfbml: true

    });

    FB.login(function (response) {
        // handle the response
    }, { scope: 'email,user_birthday,status_update,publish_stream,user_about_me,user_location,user_checkins,user_status,friends_status,friends_checkins,friends_location' });

    var eventmsg;

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessToken = response.authResponse.accessToken;
            var id = '644337815639241';


            FB.api('/503767193032453/events', function (info) {

                //   console.log(info);

                for (var i = 0; i < info.data.length; i++) {
                    var newtimezone;
                    if (info.data[i].timezone == undefined) {
                        info.data[i].timezone = 'unknown';
                    }
                    //callback(info.data[i].id);
                    callback(info.data[i].id, info.data[i].name, info.data[i].start_time, info.data[i].timezone, info.data[i].location);
                    //alert(info.data[i].description);


                }




            });

            var callback = function (eventid, namee, st, tz, loc) {
                // var callback = function (namee, st, tz, loc) {
                FB.api('/' + eventid + '/feed', function (infoz) {

                    console.log(infoz);
                    for (var a = 0; a < infoz.data.length; a++) {

                        if (infoz.data[a].shares != undefined) {


                            if (infoz.data[a].message != undefined) {


                                callback2(eventid, infoz.data[a].id, namee, st, tz, loc, infoz.data[a].message, infoz.data[a].shares.count);
                            }

                        }
                        else {
                            if (infoz.data[a].message != undefined) {


                                callback2(eventid, infoz.data[a].id, namee, st, tz, loc, infoz.data[a].message, 0);
                            }

                        }






                    }

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

                    console.log(infozz);
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

                             InsertFBEvents(eventid,namee,st,tz,loc,msg,infozz.data.length,likes,sharecount,comments);




                });
            }


        };
    });


}

		(function (d, s, id) {
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {
		        return;
		    }
		    js = d.createElement(s);
		    js.id = id;
		    js.src = "//connect.facebook.net/en_US/all.js";
		    fjs.parentNode.insertBefore(js, fjs);
		} (document, 'script', 'facebook-jssdk'));


		function InsertFBEvents(eventid,eventname,startdate,timezone,location,EventDesc,NoOfAttendees,Likes,Shares,Comments) {
		    $.ajax({
		        type: "POST",
		        url: "Default.aspx/InsertFBEvents",
		        data: '{eventid: "' + eventid + '"}',
		        contentType: "application/json; charset=utf-8",
		        dataType: "json",
		        success: OnSuccess,
		        failure: function (response) {

		        }
		    });
		}
		function OnSuccess(response) {
		     alert(response.d);
		   
		}