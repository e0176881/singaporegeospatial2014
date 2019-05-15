using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Xml;
using System.IO;

public partial class Default3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        aa.InnerHtml += "Starting C# Weather Undeground Web API Test..."+ "<br>";
        string wunderground_key = "3d75fcdb57d2a878"; 

        parse("http://api.wunderground.com/api/" + wunderground_key + "/geolookup/conditions/forecast/q/1.37000000,103.98000336.xml");
      


        // End.
       
    }
    private void parse(string input_xml)
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

        var cli = new WebClient();
        string weather = cli.DownloadString(input_xml);

        using (XmlReader reader = XmlReader.Create(new StringReader(weather)))
        {
            // Parse the file and display each of the nodes.
            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.Element:
                        if (reader.Name.Equals("full"))
                        {
                            reader.Read();
                            place = reader.Value;
                        }
                        else if (reader.Name.Equals("observation_time"))
                        {
                            reader.Read();
                            obs_time = reader.Value;
                        }
                        else if (reader.Name.Equals("weather"))
                        {
                            reader.Read();
                            weather1 = reader.Value;
                        }
                        else if (reader.Name.Equals("temperature_string"))
                        {
                            reader.Read();
                            temperature_string = reader.Value;
                        }
                        else if (reader.Name.Equals("relative_humidity"))
                        {
                            reader.Read();
                            relative_humidity = reader.Value;
                        }
                        else if (reader.Name.Equals("wind_string"))
                        {
                            reader.Read();
                            wind_string = reader.Value;
                        }
                        else if (reader.Name.Equals("pressure_mb"))
                        {
                            reader.Read();
                            pressure_mb = reader.Value;
                        }
                        else if (reader.Name.Equals("dewpoint_string"))
                        {
                            reader.Read();
                            dewpoint_string = reader.Value;
                        }
                        else if (reader.Name.Equals("visibility_km"))
                        {
                            reader.Read();
                            visibility_km = reader.Value;
                        }
                        else if (reader.Name.Equals("latitude"))
                        {
                            reader.Read();
                            latitude = reader.Value;
                        }
                        else if (reader.Name.Equals("longitude"))
                        {
                            reader.Read();
                            longitude = reader.Value;
                        }

                        break;
                }
            }
        }

       aa.InnerHtml +=  "Place:             " + place + "<br>" +
        "Observation Time:  " + obs_time + "<br>" +
       "Weather:           " + weather1 + "<br>" +
       "Temperature:       " + temperature_string + "<br>" +
       "Relative Humidity: " + relative_humidity + "<br>" +
       "Wind:              " + wind_string + "<br>" +
       "Pressure (mb):     " + pressure_mb + "<br>" +
       "Dewpoint:          " + dewpoint_string + "<br>" +
        "Visibility (km):   " + visibility_km + "<br>" +
      "Location:          " + longitude + ", " + latitude;
    }
}