using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;

public partial class Default2 : System.Web.UI.Page
{
    string postalcode;
    protected void Page_Load(object sender, EventArgs e)
    {
        

        if (Request.QueryString["id"] != null)
        {
            string placename = Request.QueryString["id"];
            LabelPlaceName.Text = placename;
            postalcode = placename.Substring(placename.Length - 7);

            System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection();
            sqlConnection1.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
            string query = "select * from Placesinfo WHERE postalcode='" + postalcode.TrimEnd() + "'";
            SqlCommand cmd = new SqlCommand(query, sqlConnection1);
            sqlConnection1.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                setplacename.InnerHtml = reader["name"].ToString();
                setdescription.InnerHtml = reader["description"].ToString();
                sqlConnection1.Close();
            }
            else
            {
                sqlConnection1.Close();
            }
            string js = "<script>document.getElementById('showHide').onclick = function() { ";
            int counter = 0;
            System.Data.SqlClient.SqlConnection sqlConnection2 = new System.Data.SqlClient.SqlConnection();
            sqlConnection2.ConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|Foreigners@SG.mdf;Integrated Security=True;User Instance=True";
            string query1 = "select * from review WHERE postalcode='" + postalcode + "'";
            SqlCommand cmd1 = new SqlCommand(query1, sqlConnection2);
            sqlConnection2.Open();
            SqlDataReader reader1 = cmd1.ExecuteReader();
            setreviews.InnerHtml = "<table border='1' style='border-collapse:collapse;width:100%;height:100%;'>";
            while (reader1.Read())
            {

                if (counter < 3)
                {
                    setreviews.InnerHtml += "<tr style='width:100%;height:100%;box-shadow: 10px 10px 5px #888888;'><td style=''><img src='images/ahnehprata.jpg' style='height:100%;width:100%;max-width:100px;max-height:100px;'/>" + reader1["reviewmessage"].ToString() + "<div style='bottom:0;right:0;float: right;font-size: 70%;'>By " + reader1["name"].ToString() + "</div></td></tr>";
                }
                else if (counter == 3)
                {
                    setreviews.InnerHtml += "<tr style='width:100%;height:100%;box-shadow: 10px 10px 5px #888888;'><td style=''><span id='showHide'>Show</span></td></tr>";
                }
                else
                {
                    setreviews.InnerHtml += "<tr id='foo" + counter + "' style='display:none;width:100%;height:100%;box-shadow: 10px 10px 5px #888888;'><td style=''><img src='images/ahnehprata.jpg' style='height:100%;width:100%;max-width:100px;max-height:100px;'/>" + reader1["reviewmessage"].ToString() + "<div style='bottom:0;right:0;float: right;font-size: 70%;'>By " + reader1["name"].ToString() + "</div></td></tr>";
                    js += "   var theDiv = document.getElementById('foo" + counter + "');    if(theDiv.style.display == 'none') {        theDiv.style.display = 'table-row';        this.innerHTML = 'Hide';    } else {        theDiv.style.display = 'none';        this.innerHTML = 'Show';    }";

                }

                counter++;
            }
            js += "}</script>";
            setreviews.InnerHtml += "</table>" + js;

            sqlConnection2.Close();

        }
        else
        {
            Response.Redirect("Default.aspx");
        }
    }



    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string strConnectionString = ConfigurationManager.ConnectionStrings["Foreigners@SGString"].ConnectionString;
        SqlConnection myConnect = new SqlConnection(strConnectionString);

       

        //TODO :  possibly retrieve RFID ID by scanning the RFID card.
        string strCommandText = "INSERT INTO Review(reviewmessage,postalcode,name)VALUES('" + tbcomments.Text + "','" + postalcode + "','" + Session["username"].ToString()+ "')";

        SqlCommand cmd = new SqlCommand(strCommandText, myConnect);

        myConnect.Open();
        cmd.ExecuteNonQuery();
        myConnect.Close();


        Response.Write("<script>alert('Review submitted!');</script>");


        Response.Redirect(Request.RawUrl);
        tbcomments.Text = "";
     

    }
}