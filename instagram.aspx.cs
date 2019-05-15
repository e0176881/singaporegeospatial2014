using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class instagram : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var clientId = "769313f94a484b869c8e3ec8f0f44936";
        var clientSecret = "9054ca26824d4a0cab5e09964434279d";
        var redirectUri = "http://localhost:2848/Foreigners@SG/default.aspx";
        var config = new InstaSharp.InstagramConfig("https://api.instagram.com/v1",
                "https://api.instagram.com/oauth", clientId,
                clientSecret, redirectUri);
        var tags = new InstaSharp.Endpoints.Media.Unauthenticated(config);
      //  tags.Uri = "https://api.instagram.com/v1/media/search";
        var result = tags.Search(1.2777459830532, 103.8471120197759);
        //foreach (var gg in result.Data)
        //{
        //    string thumbnail = gg.Images.Thumbnail.Url;
        //}
      
      
    }
  
}