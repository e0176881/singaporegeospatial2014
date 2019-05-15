using System;
using System.Net;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;
using System.Data.Sql;
using ReamSGOneMap.Utils;
using System.IO;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Web.Script.Services;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    string connString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod]
    public DataSet getCommunityEvents()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM FBEvents";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "CommunityEvents");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getYoutube()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM youtube";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "youtube");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet GetPrimarySchool()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM PrimarySchool";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "PrimarySchool");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getFoodStation()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM FoodStation WHERE [Category]=('" + ID + "')";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "FoodStation");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getFoodStations()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM FoodStation";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "FoodStation");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet GetHDB()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM HDB";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "HDB");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet getPlacesOfInterest()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM PlacesOfInterest WHERE [Category]=('" + ID + "')";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "PlacesOfInterest");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getPlacesOfInterests()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM PlacesOfInterest";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "PlacesOfInterest");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getSeekForHelp()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM SeekForHelp WHERE [Category]=('" + ID + "')";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "SeekForHelp");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getSeekForHelps()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM SeekForHelp";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "SeekForHelps");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getHealthcare()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM Healthcare WHERE [Category]=('" + ID + "')";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "Healthcare");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet getHealthcares()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM Healthcare";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "Healthcares");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet getFB()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM Facebook";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "Checkin");
        sqlConnection1.Close();
        return (ds);
    }

    [WebMethod]
    public DataSet getTwitter()
    {
        String ID = HttpContext.Current.Request.QueryString["ID"];
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM Twitter";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "Twitter");
        sqlConnection1.Close();
        return (ds);
    }

    private Dictionary<string, object> deserializeToDictionary(string jo)
    {
        var values = JsonConvert.DeserializeObject<Dictionary<string, object>>(jo);
        var values2 = new Dictionary<string, object>();
        foreach (KeyValuePair<string, object> d in values)
        {
            if (d.Value.GetType().FullName.Contains("Newtonsoft.Json.Linq.JObject"))
            {
                values2.Add(d.Key, deserializeToDictionary(d.Value.ToString()));
            }
            else
            {
                values2.Add(d.Key, d.Value);
            }
        }
        return values2;
    }

    public void getInfo()
    {
        //1.323080, 103.814990
        //XmlDocument xDoc = new XmlDocument();
        // xDoc.Load("http://maps.googleapis.com/maps/api/place/nearbysearch/json?" + lat + "," + longitude + "&radius=1" + "&sensor=true " + "&key=AIzaSyC6No029dfRA2FiZ5Hi3bRSAtWhSzDmRNE");
        // var streetaddress = xDoc.SelectSingleNode("/GeocodeResponse/result/formatted_address").InnerText;
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + "1.323080" + "," + "103.814990" + "&radius=1" + "&sensor=true" + "&key=AIzaSyC6No029dfRA2FiZ5Hi3bRSAtWhSzDmRNE";
        //var currencyRates = _download_serialized_json_data<forjson>(url);
      //  WebClient c = new WebClient();
      //  var json = c.DownloadString(url);
     //   var jss = new JavaScriptSerializer();
      //  Dictionary<string, object> values = deserializeToDictionary(json);




       
     //   var result = new System.Net.WebClient().DownloadString(url);
        WebClient c = new WebClient();
        var data = c.DownloadString("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + "1.323080" + "," + "103.814990" + "&radius=1" + "&sensor=true" + "&key=AIzaSyC6No029dfRA2FiZ5Hi3bRSAtWhSzDmRNE");
        JObject o = JObject.Parse(data);
        var reference = o["results"][0]["reference"].ToString().Replace("{", "").Replace("}", "") ;
        WebClient c2 = new WebClient();
        var data2 = c2.DownloadString("https://maps.googleapis.com/maps/api/place/details/json?reference=" +"&sensor=true&key=AIzaSyC6No029dfRA2FiZ5Hi3bRSAtWhSzDmRNE");
        JObject o2 = JObject.Parse(data2);

        //var json = jsons.ToString().Replace("\n", "").Replace(@"\","") ;
      


        
    }
  
    GeoCoordinates geoLL;
    [WebMethod(EnableSession = true)]
    public void insertFBInfo(string names, string hometown, string sex, string latitude, string longitude, string message)
    {
        
        try
        {

            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + latitude + "," + longitude + "&sensor=false");
            var streetaddress = xDoc.SelectSingleNode("/GeocodeResponse/result/formatted_address").InnerText;
            var district = xDoc.SelectSingleNode("/GeocodeResponse/result/address_component[type = 'neighborhood']/long_name").InnerText;
            string newadd = streetaddress.Replace("Singapore", "");


            geoLL = new GeoCoordinates(double.Parse(longitude), double.Parse(latitude), true);
            Console.WriteLine("X: {0}, Y: {1}", geoLL.X, geoLL.Y);
            bool result2 = CheckForFacebookLongitudeAndLatitude(names, geoLL.X, geoLL.Y);
            if (result2 == true)
            {
            }
            else
            {
                System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();

                sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";

                string strCommandText = "INSERT INTO Facebook(name,hometown,sex,latitude,longitude,placename,message)VALUES('" + names + "','" + hometown.TrimStart() + "','" + sex + "','" + geoLL.X + "','" + geoLL.Y + "','" + district + "," + newadd + "','" + message + "')";

                SqlCommand cmd = new SqlCommand(strCommandText, sqlConnection1);

                sqlConnection1.Open();
                cmd.ExecuteNonQuery();
                sqlConnection1.Close();

            }
        }


        catch (Exception ex)
        {
            string error = ex.ToString();

        }
    }
    [WebMethod]
    private bool CheckForDuplicates(string tablename, string columnname, string datatocompare)
    {

        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string query = "select * from " + tablename + " WHERE " + columnname + "=@value";
        SqlCommand cmd = new SqlCommand(query, sqlConnection1);
        cmd.Parameters.AddWithValue("@value", datatocompare);
        sqlConnection1.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            return true;
            sqlConnection1.Close();
        }
        else
        {
            return false;
            sqlConnection1.Close();
        }
    }


    private bool CheckForFacebookLongitudeAndLatitude(string name, double longitude, double latitude)
    {

        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";


        string query = "select * from Facebook WHERE name='" + name + "' AND  longitude='" + latitude + "' AND latitude='" + longitude + "'";
        SqlCommand cmd = new SqlCommand(query, sqlConnection1);

        sqlConnection1.Open();
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            return true;
            sqlConnection1.Close();
        }
        else
        {
            return false;
            sqlConnection1.Close();
        }



    }
    [WebMethod]
    public DataSet GetSecondarySchool()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM SecondarySchool";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "SecondarySchool");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetJuniorCollege()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM JuniorCollege";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "JuniorCollege");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetUniversity()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM University";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "University");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetPedestrianCrossing()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM PedestrianCrossing";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "PedestrianCrossing");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetSchoolZone()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM SchoolZone";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "SchoolZone");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetOverHeadBridge()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM OverheadBridge";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "OverheadBridge");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetZebraCrossing()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM ZebraCrossing";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "ZebraCrossing");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetPolytechnic()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM Polytechnic";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "Polytechnic");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public DataSet GetTraffic()
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT * FROM Traffic";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "Traffic");
        sqlConnection1.Close();
        return (ds);
    }
    [WebMethod]
    public String GetFacebookData(string homeTown)
    {
        System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
        sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
        string select = "SELECT count(placename) as 'No of Visits' , hometown, placename FRom facebook Where hometown = '" + homeTown + "' group by placename ";
        sqlConnection1.Open();
        SqlDataAdapter da = new SqlDataAdapter(select, sqlConnection1);
        DataSet ds = new DataSet();
        da.Fill(ds, "GraphData");
        sqlConnection1.Close();
        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        return (serializer.Serialize(ds.Tables["GraphData"]));
    }

}