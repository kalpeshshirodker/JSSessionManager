using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace JSSessionManager
{
    /// <summary>
    /// Summary description for SessionManager
    /// </summary>
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SessionManager : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public void SetSessionValue(String Name, String Value)
        {
            string sessionVal = String.Empty;

            if (Session != null)
            {
                Session[Name] = Value;
            }
        }

        //The important part is “EnableSession = true”
        [WebMethod(EnableSession = true)]
        public string GetSessionValue(String Name)
        {
            string sessionVal = String.Empty;
            if (Session != null && Session[Name] != null)
            {
                sessionVal = Session[Name].ToString();
            }
            return sessionVal;
        }
    }
}
