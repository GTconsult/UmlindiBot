// Add your requirements

var restify = require('restify'); 
var builder = require('botbuilder'); 

var appId = process.env.MY_APP_ID || "Missing your app ID";
var appSecret = process.env.MY_APP_SECRET || "Missing your app secret";

//create bot and add dialogs
/*
var bot = new builder.BotConnectorBot
({ appId: process.env.MY_APP_ID, appPassword: process.env.MY_APP_SECRET });
bot.add('/', new builder.SimpleDialog(function(session){
    session.send('Hello World');
}));
*/

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});
server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));
// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MY_APP_ID, appPassword: process.env.MY_APP_SECRET }); 
var bot = new builder.UniversalBot(connector);
server.post('/API/Messages', connector.listen());

// Create bot dialogs
bot.dialog('/', new builder.SimpleDialog(function (session) {
    session.send("Hello World");
}));
