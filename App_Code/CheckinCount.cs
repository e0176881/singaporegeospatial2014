using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for CheckinCount
/// </summary>
/// 
//Serializable attribute is necessary for the output to be converted to json string. 
[Serializable]
public class CheckinCount
{
    public int count { get; set; }
    public string PlaceName { get; set; }
}