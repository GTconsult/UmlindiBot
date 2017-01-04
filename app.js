// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: '6fbf0466-a002-4a3b-96b8-d43730a01269', appPassword: 'EM60BoGX4aWWANota1V2Y6r' }); 
var bot = new builder.UniversalBot(connector);
server.post('/API/Messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});