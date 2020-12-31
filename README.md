# Log the managed identity used to get a token
Code sample for logging the identity of the managed identity used to get a token.
This code sample reads a secret from keyvault using managed identity

## Getting Started

This code sample  logs the identity (appid and object id) of the managed id to which 
a token was issued 
This code sample in node shows how to use managed identity to get a secret from keyvault.
It has a generic function to read the secret: getKeyVaultSecret: which given the vault url, the secret name and id of the managed identity, reads the secret and returns it.

This logging is especially useful if you are using system assigned managed identities, and 
you are not passing an identity parameter to @azure/identity when requesting tokens. This code will allow you to keep a track for which id got used for token acquisition


Prerequisites

Either run this in a webapp in Azure that is assigned a managed identity: either system assigned managed identity or a user assigned managed identity
Make sure this identity has been granted access to your Azure keyvault, by going to the access policy in keyvault and granting this identity GET Secret 

Installing

npm run build, builds the js files
npm run start, runs the server

Running:
This implements 2 api: get /secret, gets the secret for the secret and keyvault URL specified in the environment variables.
get /id/:id/secret allows you to say what managedid to use to get the secret


