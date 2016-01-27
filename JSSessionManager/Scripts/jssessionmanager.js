var jsSessionManager = (function () {
    var webMethod_result;
    function WebMethod_OnError(result, response) {
        //debugger
        //Dummy function for page method ajax call
    }
    function WebMethod_OnSuccess(result, response) {
        //Dummy function for page method ajax call
        webMethod_result = result.d;
    }

    function CallWebMethod(MethodName, ObjParams, isAsync, OnSuccessHandler, OnErrorHandler) {
        var sessionManagerASMXService = "SessionManager.asmx";
        try {
            //Set the callback methods for success and error
            if (OnSuccessHandler == undefined || typeof (OnSuccessHandler) == 'undefined') {
                OnSuccessHandler = WebMethod_OnSuccess
            }

            if (OnErrorHandler == undefined || typeof (OnErrorHandler) == 'undefined') {
                OnErrorHandler = WebMethod_OnError
            }

            //Serialize the webmethod function parameters
            var serializedParams = '';
            //using Json2.js; 

            //you can download the file from the location mentioned in the references
            serializedParams = JSON.stringify(ObjParams);

            //Make the ajax calls
            return $.ajax({
                type: 'POST',
                async: isAsync,
                url: sessionManagerASMXService + '/' + MethodName,
                data: serializedParams,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: OnSuccessHandler,
                error: OnErrorHandler
            });
        }
        catch (e) {
            //suppress error
        }
        return;
    }

    //Proxy method for getting the Session value for a given name 
    function GetSessionValue(SessionName, OnSuccessHandler, OnErrorHandler) {
        //set web method parameters; should be same as parameter name else the web 

        //method wont be called
        var methodParams = new Object();
        methodParams.Name = SessionName;

        CallWebMethod('GetSessionValue', methodParams, false, OnSuccessHandler, OnErrorHandler);

        //get the response
        return webMethod_result;
    }

    function SetSessionValue(SessionName, SessionValue, OnSuccessHandler, OnErrorHandler) {
        //set web method parameters; should be same as parameter name else the web method wont be called
        var methodParams = new Object();

        methodParams.Name = SessionName;
        methodParams.Value = SessionValue;

        CallWebMethod('SetSessionValue', methodParams, false, OnSuccessHandler, OnErrorHandler);
    }


    return {
        CallWebMethod: CallWebMethod,
        SetSessionValue: SetSessionValue,
        GetSessionValue: GetSessionValue
    }
})();