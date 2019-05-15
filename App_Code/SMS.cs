
using System.Collections.Generic;
using System.Net;
using System.Web.Script.Serialization;

namespace SMS
{
    public class SmsSender
    {
        public SmsResponse SendSMS(string apikey, string apisecret, string to, string text)
        {
            string uri = string.Format("http://rest.nexmo.com/sms/json?api_key={0}&api_secret={1}&from={2}&to={3}&text={4}", apikey, apisecret, "UnitySG", to, text);
            var json = new WebClient().DownloadString(uri);
            return ParseSmsResponseJson(json);
        }

        private SmsResponse ParseSmsResponseJson(string json)
        {
            // hyphens are not allowed in in .NET var names
            json = json.Replace("message-count", "MessageCount");
            json = json.Replace("message-price", "MessagePrice");
            json = json.Replace("message-id", "MessageId");
            json = json.Replace("remaining-balance", "RemainingBalance");
            return new JavaScriptSerializer().Deserialize<SmsResponse>(json);
        }
    }

    public class Message
    {
        public string To { get; set; }
        public string Messageprice { get; set; }
        public string Status { get; set; }
        public string MessageId { get; set; }
        public string RemainingBalance { get; set; }
    }

    public class SmsResponse
    {
        public string Messagecount { get; set; }
        public List<Message> Messages { get; set; }
    }
}