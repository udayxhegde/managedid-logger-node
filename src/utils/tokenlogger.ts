import {GetTokenOptions, TokenCredential} from  "@azure/core-http";
var logger = require("./loghelper").logger;
const jwt = require("jsonwebtoken");


//
// This is a LoggingCredential class that implements the TokenCredential interface
// The main goal here is to wrap a real credential, which is used via @azure/identity
// to get tokens.
// By implementing getToken here, we get a chance to inspect the token and 
// log the app id for which the token was granted
//
class LoggingCredential implements TokenCredential {
    private credential: TokenCredential;

    constructor(credential: TokenCredential) {
        this.credential = credential;
    }

    public async getToken(
        scopes: string | string[],
        options?: GetTokenOptions) {         

        return this.credential.getToken(scopes, options)
                .then (function(response:any) {
                    if (response) {                    
                        var decoded = jwt.decode(response.token, {complete : true});
                        logger.info("Managed id: app id %s obj id %s", decoded.payload.appid, decoded.payload.oid);
                        logger.debug("scopes %o", scopes);
                    } 
                    else {
                        logger.info("in get token, empty response");
                    }
                    return response;
                })
                .catch(function(error:any) {
                    logger.error("error in getToken %o", error);
                });
    }
}

module.exports= {LoggingCredential};