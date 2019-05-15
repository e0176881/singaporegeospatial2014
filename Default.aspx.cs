using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using TwitterABC;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Configuration;
using Salt_Password_Sample;
using System.Xml;
using ReamSGOneMap.Utils;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using System.Collections;
using SMS;
using Google.YouTube;
using Google.GData.YouTube;
using Google.GData.Client;
using System.Net;
using System.IO;
using Tweetinvi;
using Tweetinvi.Core.Enum;


public partial class _Default : System.Web.UI.Page
{
    GeoCoordinates geoLLa;


    string[] ggz = new string[10];

   

    protected void Page_Load(object sender, EventArgs e)
    {

        if (Session["username"] == null)
        {
            hahahah.Visible = true;
            hehehee.Visible = true;

        }
        else
        {
            hahahah.Visible = false;
            hehehee.Visible = false;
        }
        TwitterCredentials.SetCredentials("329640683-JLYS3pwDm2HJspB9GT49DmFzaeyKqSPXe89I4YDY", "faOYo86yG8k6OWZzin6GONyELGmMTI5jhqa7riQB3RxfW", "YlPxqfbrwkQIaw0bLYJDLJW7E", "ifIh1cWabwSr5Jg7aqsqR2NANUBX25vWofcnBa1gSiRpTq3yZh");

        Search_SearchTweet();

        getPlaces();
        // put codes here
        if (!IsPostBack)
        {
            LoadEvents();
        }


    }
    private void Search_SearchTweet()
    {
        // tis the code
        // Complex search


        string keyword;



        string feed = "";
        feed += "<a class='handle2' style='height: 220px !important;' href='http://link-for-non-js-users.html'>Content</a><div id='nt-example2-container'><ul id='nt-example2' style='height: 60px; overflow: hidden;'>";



        string x = "";
        string y = "";
        string cooords = "";
        string coord = "";
        string profilepic = "";
        string tweetposter = "";
        int favcount = 0;
        int favcount1 = 0;
        string message = "";
        string message1 = "";
        int countRT = 0;
        int countRT1 = 0;
        int numberofretweets = 0;





      //  var user = Tweetinvi.User.GetUserFromScreenName("TrendsSingapore");
     //   var timelineTweets = user.GetUserTimeline();
        var timelineParameter = Timeline.CreateUserTimelineRequestParameter("TrendsSingapore");
        timelineParameter.ExcludeReplies = true;
        timelineParameter.TrimUser = true;
        timelineParameter.IncludeRTS = false;
        timelineParameter.IncludeContributorDetails = false;
      //  timelineParameter.IncludeEntities = false;
        timelineParameter.MaximumNumberOfTweetsToRetrieve = 25;
        var tweets1 = Timeline.GetUserTimeline(timelineParameter);
        int counterr = 0;
        foreach (var tweet in tweets1)
        {
           
            int counterr2 = 0;
            foreach (var hashtagz in tweet.Hashtags)
            {
                if (counterr2 == 1)
                {
                    break;
                }
                for (int etz = 0; etz < ggz.Length; etz++)
                {
                    if (ggz[etz] == null)
                    {
                        if (checkArray(hashtagz.Text) == false)
                        {
                            ggz[etz] = hashtagz.Text;
                            var searchParameter = Search.GenerateSearchTweetParameter(hashtagz.Text); // change teh parameter
                            searchParameter.Lang = Language.English;
                            searchParameter.SearchType = SearchResultType.Mixed;
                            searchParameter.MaximumNumberOfResults = 40;
                            var tweets = Search.SearchTweets(searchParameter);
                            keyword = searchParameter.SearchQuery;
                            cooords = "";
                            foreach (var gg in tweets)
                            {
                                // username
                                message1 = gg.Text;
                                countRT1 = gg.RetweetCount;
                                favcount1 = gg.FavouriteCount;
                                if (gg.RetweetCount >= numberofretweets)
                                {

                                    message = gg.Text;
                                    //   string gg = ParseTweet(message);
                                    countRT = gg.RetweetCount;
                                    favcount = gg.FavouriteCount;
                                    tweetposter = gg.Creator.ToString();
                                    profilepic = gg.Creator.ProfileImageUrl.ToString();

                                }
                                if (gg.Coordinates != null)
                                {
                                    coord = gg.Coordinates.ToString();

                                    y = gg.Coordinates.Longitude.ToString();
                                    x = gg.Coordinates.Latitude.ToString();
                                    //zoomTo(\"" + geoLL.X + "\",\"" + geoLL.Y + "\");
                                    geoLLa = new GeoCoordinates(double.Parse(y.TrimStart()), double.Parse(x), true);
                                    //cooords += "zoomTo(\"" + geoLLa.X + "\",\"" + geoLLa.Y + "\");";
                                    cooords += "zoomTo(" + "map" + ",\"" + geoLLa.X + "\",\"" + geoLLa.Y + "\",\"" + keyword + "\",\"" + RemoveSpecialCharacters(message1) + "\",\"" + countRT1 + "\",\"" + favcount1 + "\");";
                                }

                            }

                            feed += "<li data-infos='" + message + "'><i class='fa fa-fw state fa-pause'></i>" + "#" + keyword + "<div style='float:right;'> <img src='images/retweet.png' style='max-width:30px;'/> " + countRT + " <img src='images/Favourite.png' style='max-width:30px;'/> " + favcount + "</div><div id='info-t' style='display:none;'><a href='http://twitter.com/" + tweetposter + "' >" + tweetposter + "</a></div><div id='ppicc' style='display:none;'><a href='http://twitter.com/" + tweetposter + "' ><img src='" + profilepic + "' style='height:25px;'/></a></div><div id='tweetlatlong'>" + cooords + "</div></li>";
                        }
                    }
                }
                break;
                counterr2++;
            }
            counterr++;
        }
        feed += "</ul><div id='nt-example2-infos-container' style='display: block;'><div id='nt-example2-infos-triangle'></div><div id='nt-example2-infos' class='row'><div class='col-xs-4 centered' style='width:20% !important; padding-left:0 !important;padding-right:0 !important;'><i class='fa fa-arrow-left' id='nt-example2-prev'></i><i class='fa fa-arrow-right' id='nt-example2-next'></i></div><div class='col-xs-8' style='height: 110px !important;width:80% !important;padding-left:0 !important;padding-right:0 !important;'><div class='infos-text' style='height:75%;'></div><div style='margin-top:10px;height:15%;float:right;' ><div class='ppic' style='float:left;'></div><div class='infos-tweeter' style='float:left;'></div></div><div class='tweetll' style='margin-top:40px'></div></div></div></div>";


        twitterfeedtoptrend.InnerHtml = feed + "</div>";

    }
    public static string RemoveSpecialCharacters(string input)
    {
        Regex r = new Regex("(?:[^a-z0-9://. ]|(?<=['\"])s)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
        return r.Replace(input, String.Empty);
    }
    private void LoadEvents()
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string strCommandText = "SELECT * FROM Event Order by 'EventID' ASC";
        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();

        newsfeeddiv.InnerHtml += "<div id='nt-example1-container' style='max-width: 220px;'><i class='fa fa-arrow-up' id='nt-example1-prev'></i><ul id='nt-example1' style='position: relative;height: 240px; overflow: hidden;width:100%; margin:0; padding:0;max-width: 220px;'>";

        int functionno = 0;

        while (reader.Read())
        {

            string eventname = "";
            if (reader["EventName"].ToString().Length > 30)
            {
                eventname = reader["EventName"].ToString().Substring(0, 30) + "...";
            }
            else
            {
                eventname = reader["EventName"].ToString();
            }

            newsfeeddiv.InnerHtml += "<script type='text/javascript'> function newsfeed" + functionno + "(){ $('.modal-header').html('<div> <h4>" + reader["EventName"].ToString() + "</h4><div id=pussy><p> Posted By: " + reader["username"].ToString() + "</p></div></div>');  $('#databody').html('<div>" + reader["EventDesc"].ToString() + "</div>');  $('#About').modal('show'); }</script>";


            newsfeeddiv.InnerHtml += "<li style=''><div style='width:100%;'><a  onclick='newsfeed" + functionno + "();' style='width:100%;word-wrap: break-word;'>" + eventname + "</a></div> ";
            //     zoomTo(\"" + geoLL.X + "\",\"" + geoLL.Y + "\");
            newsfeeddiv.InnerHtml += "<div style='float:left; font-size:8pt;'>- By " + reader["username"].ToString() + "</div><div style='float:right'>";

            newsfeeddiv.InnerHtml += "<a onclick='share(\"" + reader["EventName"].ToString() + "\",\"" + reader["EventDesc"].ToString() + "\");' ><img class='sharebutton' src='images/share-button-facebook.png' style='max-width:60px;' /></a></li>";
            //graphStreamPublish(msg, slink, spicture, sname, sdescription)

            functionno++;
        }
        newsfeeddiv.InnerHtml += "</ul><i class='fa fa-arrow-down' id='nt-example1-next'></i></div>";
        // newsfeeddiv.InnerHtml += "	<script type='text/javascript'>$(function(){$('#vertical-ticker').totemticker({row_height:'100px',next:'#ticker-next',previous:'#ticker-previous',stop:'#stop',start:'#start',mousestop:true,});});</script>";
    }
    private bool checkArray(string name)
    {
        bool result = false;
        for (int i = 0; i < ggz.Length; i++)
        {
            if (ggz[i] == name)
            {
                result = true;
                return result;
            }

        }
        return result;
    }



    [System.Web.Services.WebMethod]
    protected void showFoodStation(object sender, EventArgs e)
    {
        localhost.WebService food = new localhost.WebService();

        FoodGrid.DataSource = food.getFoodStation();
        FoodGrid.DataBind();

    }
    [System.Web.Services.WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]

    public static String GetGraphDataForId(string placeName)
    {

        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT count(placename) as 'No of Visits' , hometown FRom facebook Where placename LIKE '%" + placeName.TrimEnd() + "%' group by hometown ";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet("NewDataSet");
        da.Fill(ds, "GraphData");
        sqlConnection1.Close();
        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

        var list = from s in ds.Tables["GraphData"].AsEnumerable()
                   select new CheckinCount()
                   {
                       count = Convert.ToInt32(s["No of Visits"]),
                       PlaceName = s["hometown"].ToString()

                   };
        string res = (serializer.Serialize(list.ToList()));
        return res;
    }

    string pn = "";
    string lat = "";
    string lng = "";

    string feed = "";
    private void getPlaces()
    {
        GeoCoordinates geoLL;

        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string strCommandText = "SELECT placename, count(placename) FRom facebook GROUP BY placename HAVING COUNT(placename) > 1";
        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();

        feed += "<a class='handle3' style='height: 220px !important;' href='http://link-for-non-js-users.html'>Content</a>  <div id='nt-example3-container'> 	  <ul style='margin-right: 30px;' id='nt-example3'>";
        while (reader.Read())
        {


            pn = reader["placename"].ToString();
            feed += "<li style='font-size: 10pt;'>" + pn + "</li>";

        }


        XmlDocument xDoc = new XmlDocument();
        xDoc.Load("https://maps.googleapis.com/maps/api/geocode/xml?address=" + pn + "&sensor=false&region=sg");
        lat = xDoc.SelectSingleNode("/GeocodeResponse/result/geometry/location/lat").InnerText;
        lng = xDoc.SelectSingleNode("/GeocodeResponse/result/geometry/location/lng").InnerText;

        geoLL = new GeoCoordinates(double.Parse(lng.TrimStart()), double.Parse(lat), true); //zoomTo(\"" + geoLL.X + "\",\"" + geoLL.Y + "\");
        mostvisitedplaces.InnerHtml = feed + " </div>" + " <span class='button' id='nt-example3-button' style='margin-left: 30px !important; '>START</span>";

    }

    [System.Web.Services.WebMethod()]
    public static string getCoords(string placename)
    {
        string gg;
        XmlDocument xDoc = new XmlDocument();
        xDoc.Load("https://maps.googleapis.com/maps/api/geocode/xml?address=" + placename + "&sensor=false&region=sg");
        var lat = xDoc.SelectSingleNode("/GeocodeResponse/result/geometry/location/lat").InnerText;
        var lng = xDoc.SelectSingleNode("/GeocodeResponse/result/geometry/location/lng").InnerText;

        var geoLL = new GeoCoordinates(double.Parse(lng.TrimStart()), double.Parse(lat), true);

        gg = geoLL.X + "," + geoLL.Y;
        return gg;
    }


    [System.Web.Services.WebMethod()]
    public static string getlatlong(string coordxy)
    {
        GeoCoordinates geoLL;
        string gg;

        string[] coords = coordxy.Split(',');
        string x = coords[0];
        string y = coords[1];
        geoLL = new GeoCoordinates(double.Parse(y.TrimStart()), double.Parse(x), false);

        gg = geoLL.Latitude + "," + geoLL.Longitude;
        string wunderground_key = "3d75fcdb57d2a878";

        string aa = parse("http://api.wunderground.com/api/" + wunderground_key + "/geolookup/conditions/forecast/q/" + gg + ".xml");

        return aa;

    }


    private static string parse(string input_xml)
    {

        //Variables
        string place = "";
        string obs_time = "";
        string weather1 = "";
        string temperature_string = "";
        string relative_humidity = "";
        string wind_string = "";
        string pressure_mb = "";
        string dewpoint_string = "";
        string visibility_km = "";
        string latitude = "";
        string longitude = "";
        string icon_url = "";
        XmlDocument xDoc = new XmlDocument();
        xDoc.Load(input_xml);
        place = xDoc.SelectSingleNode("//display_location/full").InnerText;
        obs_time = xDoc.SelectSingleNode("//observation_time").InnerText;
        weather1 = xDoc.SelectSingleNode("//weather").InnerText;
        temperature_string = xDoc.SelectSingleNode("//temperature_string").InnerText;

        relative_humidity = xDoc.SelectSingleNode("//relative_humidity").InnerText;
        wind_string = xDoc.SelectSingleNode("//wind_string").InnerText;
        pressure_mb = xDoc.SelectSingleNode("//pressure_mb").InnerText;
        icon_url = xDoc.SelectSingleNode("//icon_url").InnerText;
        xDoc = null;
        GC.Collect();


        //dewpoint_string = xDoc.SelectSingleNode("//dewpoint_string").InnerText;
        //visibility_km = xDoc.SelectSingleNode("//visibility_km").InnerText;
        //pressure_mb = xDoc.SelectSingleNode("//pressure_mb").InnerText;

        //var cli = new WebClient();
        //string weather = cli.DownloadString(input_xml);

        //using (XmlReader reader = XmlReader.Create(new StringReader(weather)))
        //{
        //    // Parse the file and display each of the nodes.
        //    while (reader.Read())
        //    {
        //        switch (reader.NodeType)
        //        {
        //            case XmlNodeType.Element:
        //                if (reader.Name.Equals("full"))
        //                {
        //                    reader.Read();
        //                    place = reader.Value;
        //                }
        //                else if (reader.Name.Equals("observation_time"))
        //                {
        //                    reader.Read();
        //                    obs_time = reader.Value;
        //                }
        //                else if (reader.Name.Equals("weather"))
        //                {
        //                    reader.Read();
        //                    weather1 = reader.Value;
        //                }
        //                else if (reader.Name.Equals("temperature_string"))
        //                {
        //                    reader.Read();
        //                    temperature_string = reader.Value;
        //                }
        //                else if (reader.Name.Equals("relative_humidity"))
        //                {
        //                    reader.Read();
        //                    relative_humidity = reader.Value;
        //                }
        //                else if (reader.Name.Equals("wind_string"))
        //                {
        //                    reader.Read();
        //                    wind_string = reader.Value;
        //                }
        //                else if (reader.Name.Equals("pressure_mb"))
        //                {
        //                    reader.Read();
        //                    pressure_mb = reader.Value;
        //                }
        //                else if (reader.Name.Equals("dewpoint_string"))
        //                {
        //                    reader.Read();
        //                    dewpoint_string = reader.Value;
        //                }
        //                else if (reader.Name.Equals("visibility_km"))
        //                {
        //                    reader.Read();
        //                    visibility_km = reader.Value;
        //                }
        //                else if (reader.Name.Equals("latitude"))
        //                {
        //                    reader.Read();
        //                    latitude = reader.Value;
        //                }
        //                else if (reader.Name.Equals("longitude"))
        //                {
        //                    reader.Read();
        //                    longitude = reader.Value;
        //                }

        //                break;
        //        }
        //    }
        //}

        return weather1 + "," + temperature_string + "," + relative_humidity + "," + wind_string + "," + pressure_mb + "," + icon_url;

    }


    static string searchtext;
    [System.Web.Services.WebMethod()]
    public static string getSearchVal(string searchvar)
    {
        searchtext = searchvar;
        YouTubeRequestSettings yy = new YouTubeRequestSettings("unitysg", "AIzaSyAS1TLHGyfD6yP596kpmckOhUepSPmo8hM");
        YouTubeRequest request = new YouTubeRequest(yy);
        YouTubeQuery query = new YouTubeQuery(YouTubeQuery.DefaultVideoUri + "?region=SG&v=2");

        //order results by the number of views (most viewed first)
        // query.OrderBy = "viewCount";

        // search for puppies and include restricted content in the search results
        // query.SafeSearch could also be set to YouTubeQuery.SafeSearchValues.Moderate
        query.Query = searchvar;
        query.SafeSearch = YouTubeQuery.SafeSearchValues.None;

        Feed<Video> videoFeed = request.Get<Video>(query);

        if (printVideoFeed(videoFeed) == true)
        {
            return "Success";
        }
        else
        {
            return "Fail";
        }
    }

    public static bool printVideoFeed(Feed<Video> feed)
    {
        foreach (Video entry in feed.Entries)
        {
            InsertprintVideoEntry(entry);
        }
        return true;
    }
    public static void InsertprintVideoEntry(Video video)
    {

        int likes, dislikes;

        if (checkforDupVideoID(video.VideoId) != true)
        {

            if (video.YouTubeEntry.YtRating == null)
            {
                likes = -1;
                dislikes = -1;
            }
            else
            {
                likes = int.Parse(video.YouTubeEntry.YtRating.NumLikes);
                dislikes = int.Parse(video.YouTubeEntry.YtRating.NumDislikes);
            }


            if (video.YouTubeEntry.Location != null)
            {
                GeoCoordinates geoLL = new GeoCoordinates(double.Parse(video.YouTubeEntry.Location.Longitude.ToString()), double.Parse(video.YouTubeEntry.Location.Latitude.ToString()), true);
                string strCommandText = "";
                string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
                SqlConnection myConnect = new SqlConnection(strConnectionString);
                strCommandText = "INSERT INTO youtube(youtubeid,title,description,uploader,url,X,Y,Rating,viewcount,commentcount,likes,dislikes,SearchText)VALUES('" + video.VideoId + "', @title ,  @description ,'" + video.Uploader + "','" + video.WatchPage + "','" + geoLL.X + "','" + geoLL.Y + "','" + video.RatingAverage.ToString() + "','" + video.ViewCount.ToString() + "','" + video.CommmentCount.ToString() + "','" + likes + "','" + dislikes + "', @searchvalue)";
                try
                {
                    myConnect.Open();
                    SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
                    cmd.Parameters.AddWithValue("@title", video.Title.ToString());
                    cmd.Parameters.AddWithValue("@description", video.Description.ToString());
                    cmd.Parameters.AddWithValue("@searchvalue", searchtext);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {

                }
                finally
                {
                    myConnect.Close();
                }

            }

        }


    }
    private static bool checkforDupVideoID(string id)
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string query = "select * from youtube WHERE youtubeid =@value";
        SqlCommand cmd = new SqlCommand(query, myConnect);
        cmd.Parameters.AddWithValue("@value", id);
        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            return true;
            myConnect.Close();
        }
        else
        {
            return false;
            myConnect.Close();
        }

    }
    protected void btnTwitter_Click(object sender, EventArgs e)
    {
        //public string[] messages;
        //public int[] countretweet;
        //public string[] geolocation;
        //public string ashtag;
        //public int[] avcount;
        //public string[] geo;
        //public DateTime[] dt;
        //public string[] platform;



        //twitterloading.Visible = true;
        loadingimage.Visible = true;
        btnTwitter.Visible = false;
        string message = "";
        string retweetcount = "";
        string favcount = "";
        string coord = "";
        string dt = "";
        string platform = "";


       



        string key;
        if (tbsearch.Text.Contains("#"))
        {

            key = "%23" + tbsearch.Text.Replace("#", "");
        }
        else
        {
            key = "%23" + tbsearch.Text;
        }


        var searchParameter = Search.GenerateSearchTweetParameter(key); // change teh parameter
        searchParameter.Lang = Language.English;
        searchParameter.SearchType = SearchResultType.Mixed;
        searchParameter.MaximumNumberOfResults = 100;
        var tweets = Search.SearchTweets(searchParameter);
         Tweets twitter = new Tweets();
        foreach (var twit in tweets)
        {

           
            twitter.Hashtag = key.Replace("%23", "");
            twitter.Message =  twit.Text;
            twitter.Countretweet = twit.RetweetCount;
            twitter.Favcount = twit.FavouriteCount;
            if (twit.Coordinates != null)
            {
                double x = twit.Coordinates.Latitude;
                double y = twit.Coordinates.Longitude;
                coord= x + "," + y;
            }
            else
            {
                coord = "";
            }
            twitter.Geolocation = coord;
            twitter.UniqueID = twit.Id;

            twitter.DT = twit.CreatedAt;
            platform = twit.Source;

            if (platform.Contains("android"))
            {
                twitter.Platform = "Android";
                //twitter.platform[i] = "Android";
            }
            else if (platform.Contains("iphone"))
            {
                twitter.Platform = "Iphone";
                //twitter.platform[i] = "Iphone";
            }
            else if (platform.Contains("windows"))
            {
                twitter.Platform = "windowsphone";
                // twitter.platform[i] = "windowsphone";
            }
            else
            {
                twitter.Platform = "Others";
                //  twitter.platform[i] = "Others";
            }
            //twitterloading.Visible = false;
            twitter.insertTwitter(twitter);
            loadingimage.Visible = false;
            btnTwitter.Visible = true;

        }
    }
    [WebMethod]
    public static string registeracc(string usernamezz, string passwordzz, string contactnozz)
    {

        string password = Helper.ComputeHash(passwordzz, "SHA512", null);

        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);



        //TODO :  possibly retrieve RFID ID by scanning the RFID card.
        string strCommandText = "INSERT INTO Account(username,password,contactno,role)VALUES('" + usernamezz + "','" + password + "','" + int.Parse(contactnozz) + "','" + 0 + "')";

        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);

        myConnect.Open();
        cmd.ExecuteNonQuery();
        myConnect.Close();

        return "success";
    }

    /* protected void btnregister_Click(object sender, EventArgs e)
     {
         string username = tbusername.Text;
         string password = Helper.ComputeHash(tbpassword.Text, "SHA512", null);
         int contactno = int.Parse(tbcontactno.Text);
         string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
         SqlConnection myConnect = new SqlConnection(strConnectionString);



         //TODO :  possibly retrieve RFID ID by scanning the RFID card.
         string strCommandText = "INSERT INTO Account(username,password,contactno)VALUES('" + username + "','" + password + "','" + contactno + "')";

         SqlCommand cmd = new SqlCommand(strCommandText, myConnect);

         myConnect.Open();
         cmd.ExecuteNonQuery();
         myConnect.Close();
         Response.Write(@"<script language='javascript'>alert('Successfully registered');return false;</script>");
         tbcontactno.Text = "";
         tbpassword.Text = "";
         tbusername.Text = "";
     } */
    protected void btnlogin_Click(object sender, EventArgs e)
    {

        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string strCommandText = "SELECT username, password from Account";
        strCommandText += " WHERE UserName=@uname";
        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
        cmd.Parameters.AddWithValue("@uname", tbloginname.Text);
        cmd.Parameters.AddWithValue("@pwd", tbloginpw.Text);



        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.Read())
        {

            string username = reader["username"].ToString();
            string password = reader["password"].ToString();
            bool flag = Helper.VerifyHash(tbloginpw.Text, "SHA512", password);


            if (flag == true)
            {

                Session["username"] = reader["username"].ToString();
                Response.Write(@"<script language='javascript'>alert('Successful Login'); return false;</script>");

            }
            else
            {
                Response.Write(@"<script language='javascript'>alert('Invalid PW'); return false;</script>");
                return;
            }
        }
        else
        {
            Response.Write(@"<script language='javascript'>alert('Invalid Username'); return false;</script>");
            return;
        }
        Response.Redirect(Request.RawUrl);
    }

    private static void notifyUser(string eventplace)
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string strCommandText = "SELECT * FROM Account";
        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);

        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        while (reader.Read())
        {

            string username = reader["username"].ToString();
            Int64 contactno = Int64.Parse(reader["contactno"].ToString());
            string text = "Dear " + username + "," + "A new event has been organised , and it will be held at " + eventplace;
            SmsResponse response = new SmsSender().SendSMS("8bb51572", "ed321935", "65" + contactno, text);
        }
    }
    [System.Web.Services.WebMethod()]
    public static bool InsertFBEvents(string eventid, string eventname, string startdate, string timezone, string location, string eventinfo, int attendees, int likes, int shares, int comments)
    {
       
        string lat;
        string lng;
        if (checkforDupID(eventid) != true)
        {
            notifyUser(location);
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("https://maps.googleapis.com/maps/api/geocode/xml?address=" + location + "&sensor=false&region=sg");
            lat = xDoc.SelectSingleNode("/GeocodeResponse/result/geometry/location/lat").InnerText;
            lng = xDoc.SelectSingleNode("/GeocodeResponse/result/geometry/location/lng").InnerText;

            GeoCoordinates geoLL = new GeoCoordinates(double.Parse(lng.TrimStart()), double.Parse(lat), true);


            string strCommandText = "";
            string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
            SqlConnection myConnect = new SqlConnection(strConnectionString);
            strCommandText = "INSERT INTO FBEvents(eventID,Event,StartDate,Timezone,Location,EventInfo,NoOfAttendees,Likes,Shares,Comments,X,Y)VALUES('" + eventid + "', @eventname ,'" + startdate + "' ,'" + timezone + "' ,'" + location + "', @eventinfo,'" + attendees + "','" + likes + "','" + shares + "','" + comments + "','" + geoLL.X + "','" + geoLL.Y + "')";
            try
            {
                myConnect.Open();
                SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
                cmd.Parameters.AddWithValue("@eventname", eventname);
                cmd.Parameters.AddWithValue("@eventinfo", eventinfo);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                myConnect.Close();
            }


            return true;
        }
        else
        {
            return false;
        }
    }
    private static bool checkforDupID(string id)
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string query = "select * from FBEvents WHERE eventID =@value";
        SqlCommand cmd = new SqlCommand(query, myConnect);
        cmd.Parameters.AddWithValue("@value", id);
        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            return true;
            myConnect.Close();
        }
        else
        {
            return false;
            myConnect.Close();
        }

    }
    [WebMethod(enableSession: true)]
    public static void insertSession(string sessionnamez)
    {

        if (HttpContext.Current.Session["username"] == null)
        {
            HttpContext.Current.Session["username"] = sessionnamez;




        }


    }
    [WebMethod(enableSession: true)]
    public static void ClearSession()
    {
        HttpContext.Current.Session.Clear();

    }
    public static bool isnotafbuser(string usernameabcabc)
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string strCommandText = "SELECT * from Account";
        strCommandText += " WHERE UserName=@uname";
        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
        cmd.Parameters.AddWithValue("@uname", usernameabcabc);

        bool gotacc;
        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.HasRows)
        {

            gotacc = true;


        }

        else
        {
            gotacc = false;
        }
        return gotacc;
    }

    [WebMethod(enableSession: true)]
    public static string InsertEventDetailsz(string eventname, string eventdescz, string eventdate, string eventplace, string coordX, string coordY)
    {
        string gg;

        if (HttpContext.Current.Session["username"] != null)
        {
            if (HttpContext.Current.Session["username"] != null && isnotafbuser(HttpContext.Current.Session["username"].ToString()) != true)
            {
                gg = "fb";
                return gg;
            }
            if (isAdmin(HttpContext.Current.Session["username"].ToString()) != true)
            {
                gg = "noadmin";
                return gg;
            }
            string strCommandText = "";
            string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
            SqlConnection myConnect = new SqlConnection(strConnectionString);
            strCommandText = "INSERT INTO Event(EventName,EventDesc,EventDate,EventLocation,X,Y,username)VALUES(@eventname, @eventdescz, @eventdate,'" + eventplace + "','" + coordX + "','" + coordY + "' , @username)";
            SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
            cmd.Parameters.AddWithValue("@eventname", eventname);
            cmd.Parameters.AddWithValue("@eventdescz", eventdescz);
            cmd.Parameters.AddWithValue("@eventdate", DateTime.Parse(eventdate));
            cmd.Parameters.AddWithValue("@username", HttpContext.Current.Session["username"].ToString());
            myConnect.Open();
            cmd.ExecuteNonQuery();
            myConnect.Close();
           // notifyUser(eventplace);
            gg = "true";

        }
        else
        {
            gg = "fail";
        }
        return gg;

    }

    public static bool isAdmin(string usernamez)
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);
        string strCommandText = "SELECT * from Account";
        strCommandText += " WHERE UserName=@uname";
        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
        cmd.Parameters.AddWithValue("@uname", usernamez);

        int role;
        bool isanadmin = false;
        myConnect.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.Read())
        {

            role = int.Parse(reader["role"].ToString());
            if (role == 1)
            {
                isanadmin = true;
            }
            else
            {
                isanadmin = false;
            }


        }

        return isanadmin;
    }

    public JavaScriptSerializer javaSerial = new JavaScriptSerializer();
    [System.Web.Services.WebMethod]
    public static string getVideos(string searchq)
    {
        YouTubeRequestSettings yy = new YouTubeRequestSettings("unitysg", "AIzaSyAS1TLHGyfD6yP596kpmckOhUepSPmo8hM");
        YouTubeRequest request = new YouTubeRequest(yy);
        YouTubeQuery query = new YouTubeQuery(YouTubeQuery.DefaultVideoUri + "?region=SG&v=2");

        //order results by the number of views (most viewed first)
        //   query.OrderBy = "viewCount";

        // search for puppies and include restricted content in the search results
        // query.SafeSearch could also be set to YouTubeQuery.SafeSearchValues.Moderate
        query.Query = searchq.TrimEnd();
        query.SafeSearch = YouTubeQuery.SafeSearchValues.None;
        string[] url = new string[5];
        int viewcount = 0;
        int totalrelatedvideos = 0;
        Feed<Video> videoFeed = request.Get<Video>(query);

        printVideoFeed(videoFeed);
        int i = 0;
        foreach (Video entry in videoFeed.Entries)
        {
            if (i == 5)
            {
                break;
            }
            else
            {
                url[i] = entry.WatchPage.ToString();
                viewcount = int.Parse(entry.ViewCount.ToString());
                totalrelatedvideos = int.Parse(videoFeed.TotalResults.ToString());
            }
            i++;
        }

        return new JavaScriptSerializer().Serialize(url) + "," + viewcount + "," + totalrelatedvideos;
    }
    [System.Web.Services.WebMethod]
    public static string getRelatedInsta(string searchtag)
    {
        List<string> list = new List<string>();
        List<string> listz = new List<string>();
        var clientId = "769313f94a484b869c8e3ec8f0f44936";
        var clientSecret = "9054ca26824d4a0cab5e09964434279d";
        var redirectUri = "http://localhost:2848/Foreigners@SG/default.aspx";
        var config = new InstaSharp.InstagramConfig("https://api.instagram.com/v1",
                "https://api.instagram.com/oauth", clientId,
                clientSecret, redirectUri);
        var tags = new InstaSharp.Endpoints.Tags.Unauthenticated(config);
        var result = tags.Recent(RemoveSpecialCharacters(searchtag.Replace(" ", String.Empty)));
        int i = 0;
        foreach (var gg in result.Data)
        {
            if (i == 4)
            {
                break;
            }

            list.Add(gg.Images.StandardResolution.Url + "~" + gg.Link.ToString());
            //listz.Add(gg.Link.ToString());
            i++;

        }
        return new JavaScriptSerializer().Serialize(list); //+ "\\" + new JavaScriptSerializer().Serialize(listz);
    }

    protected void Button15_Click(object sender, EventArgs e)
    {
        Session.Clear();
        Response.Redirect(Request.RawUrl);
    }
}

