using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Google.Apis.Services;
using Google.GData.YouTube;
using Google.YouTube;
using Google.GData.Client;
using Google.GData.Extensions.MediaRss;

public partial class FacebookShare : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        YouTubeRequestSettings yy = new YouTubeRequestSettings("aa", "AIzaSyC6No029dfRA2FiZ5Hi3bRSAtWhSzDmRNE");
        YouTubeRequest request = new YouTubeRequest(yy);
        YouTubeQuery query = new YouTubeQuery(YouTubeQuery.DefaultVideoUri + "?region=SG");

        //order results by the number of views (most viewed first)
      //  query.OrderBy = "viewCount";

        // search for puppies and include restricted content in the search results
        // query.SafeSearch could also be set to YouTubeQuery.SafeSearchValues.Moderate
        query.Query = "People's Action Party";
        query.SafeSearch = YouTubeQuery.SafeSearchValues.None;

        Feed<Video> videoFeed = request.Get<Video>(query);
      
        printVideoFeed(videoFeed);
    }


    public void printVideoEntry(Video video)
    {


        youtubevideo.InnerHtml += "VideoID : " + video.VideoId + "<br>" + 
          "Title: " + video.Title + "<br>" +
          "Description : " + video.Description + "<br>" +
           "Uploaded by: " + video.Uploader + "<br>" +
           "URL: " + video.WatchPage + "<br>" ;
        if (video.YouTubeEntry.Location != null)
        {
             youtubevideo.InnerHtml += "Latitude: " + video.YouTubeEntry.Location.Latitude +  "<br>" +
            "Longitude: " + video.YouTubeEntry.Location.Longitude +  "<br>";
        }
        if (video.Media != null && video.Media.Rating != null)
        {
            youtubevideo.InnerHtml += "Restricted in: " + video.Media.Rating.Country + "<br>";
        }
            if (video.RatingAverage != -1)
            {
                youtubevideo.InnerHtml += "Average rating: " + video.RatingAverage + "<br>";
            }
            if (video.ViewCount != -1)
            {
                youtubevideo.InnerHtml += "View count: " + video.ViewCount + "<br>";
            }
            if (video.CommmentCount != -1)
            {
                youtubevideo.InnerHtml += "Comment count: " + video.CommmentCount + "<br><br>";
            }
            else
            {
                youtubevideo.InnerHtml += "<br>";
            }
         
        
    }

    public void printVideoFeed(Feed<Video> feed)
    {
        foreach (Video entry in feed.Entries)
        {
            printVideoEntry(entry);
        }
      
    }
}