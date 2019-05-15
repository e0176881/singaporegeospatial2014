using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using ReamSGOneMap.Utils;
using System.Xml;
using System.Text.RegularExpressions;
using System.Text;

namespace TwitterABC
{
    /// <summary>
    /// Summary description for Tweets
    /// </summary>
    public class Tweets
    {
       
        //private static int count;
        //public string[] messages = new string[count];
        //public int[] countretweet = new int[count];
        //public string[] geolocation = new string[count];
        //public string hashtag;
        //public int[] favcount = new int[count];
        //public string[] geo = new string[count];
        //public DateTime[] dt = new DateTime[count];
        //public string[] platform = new string[count];

        //private static int count;
        private string messages;
        private int countretweet;
        private string geolocation;
        private string hashtag;
        private int favcount;
        private DateTime dt;
        private string platform ;
        private Int64 uniqueID;

        public Int64 UniqueID
        {
            get
            {
                return uniqueID;
            }
            set
            {
                this.uniqueID = value;
            }
        }

        public string Message
        {
            get
            {
                return messages;
            }
            set
            {
                this.messages = value;
            }
        }

        public int Countretweet
        {
            get
            {
                return countretweet;
            }
            set
            {
                this.countretweet = value;
            }
        }
        public string Geolocation
        {
            get
            {
                return geolocation;
            }
            set
            {
                this.geolocation = value;
            }
        }

        public string Hashtag
        {
            get
            {
                return hashtag;
            }
            set
            {
                this.hashtag = value;
            }
        }
        public int Favcount
        {
            get
            {
                return favcount;
            }
            set
            {
                this.favcount = value;
            }
        }
        public DateTime DT
        {
            get
            {
                return dt;
            }
            set
            {
                this.dt = value;
            }
        }

        public string Platform
        {
            get
            {
                return platform;
            }
            set
            {
                this.platform = value;
            }
        }

        private bool checkforDupID(Int64 id)
        {
            string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
            SqlConnection myConnect = new SqlConnection(strConnectionString);
            string query = "select * from Twitter WHERE tweetID =@value";
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


        public static string EnsureOnlyLetterDigitOrWhiteSpace(string input)
        {
            StringBuilder cleanedInput = null;
            for (var i = 0; i < input.Length; ++i)
            {
                var currentChar = input[i];
                var charIsValid = char.IsLetterOrDigit(currentChar) || char.IsWhiteSpace(currentChar);

                if (charIsValid)
                {
                    if (cleanedInput != null)
                        cleanedInput.Append(currentChar);
                }
                else
                {
                    if (cleanedInput != null) continue;
                    cleanedInput = new StringBuilder();
                    if (i > 0)
                        cleanedInput.Append(input.Substring(0, i));
                }
            }

            return cleanedInput == null ? input : cleanedInput.ToString();
        }
        GeoCoordinates geoLL;
        public void insertTwitter(Tweets twitter)
        {
           
           bool boo = checkforDupID(twitter.uniqueID);
           if (boo == true)
           {
              

              
           }
           else
           {
               string coord = twitter.Geolocation;
               if (coord != "")
               {
                   string[] words = coord.Split(',');
                   string x = words[0];
                   string y = words[1];

                   string strCommandText = "";
                   string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
                   SqlConnection myConnect = new SqlConnection(strConnectionString);



                   XmlDocument xDoc = new XmlDocument();
                   xDoc.Load("http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + x + "," + y.TrimStart() + "&sensor=false");
                   var streetaddress = xDoc.SelectSingleNode("/GeocodeResponse/result/formatted_address").InnerText;
                   if(streetaddress.Contains("Singapore"))
                   {
                   var district = xDoc.SelectSingleNode("/GeocodeResponse/result/address_component[type = 'neighborhood']/long_name").InnerText;
                   string newadd = streetaddress.Replace("Singapore", "");

                 
                   geoLL = new GeoCoordinates(double.Parse(y.TrimStart()), double.Parse(x), true);
                   strCommandText = "INSERT INTO Twitter(hashtag,message,X,Y,retweetcount,favcount,platform,dt,tweetID,Address)VALUES('" + "#" + hashtag + "', @message ,'" + geoLL.X + "', '" + geoLL.Y + "', '" + twitter.countretweet + "', '" + twitter.favcount + "', '" + twitter.platform + "', '" + twitter.dt.ToString("MM/dd/yyyy HH:MM:ss") + "', '" + twitter.uniqueID + "', '" + district + "," + newadd + "')";
                   SqlCommand cmd = new SqlCommand(strCommandText, myConnect);
                   cmd.Parameters.AddWithValue("@message", twitter.messages.ToString());
                   myConnect.Open();
                   cmd.ExecuteNonQuery();
                   myConnect.Close();
                   }
               }

           }

        }


    }
}