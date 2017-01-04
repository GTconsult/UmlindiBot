// Add your requirements

var restify = require('restify'); 
var builder = require('botbuilder'); 
var cognitiveservices = require('botbuilder-cognitiveservices'); 

var appId = "6fbf0466-a002-4a3b-96b8-d43730a01269";//process.env.MY_APP_ID || "Missing your app ID";
var appSecret = "EM60BoGX4aWWANota1V2Y6r";//process.env.MY_APP_SECRET || "Missing your app secret";

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
/*
server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));
*/
// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MY_APP_ID, appPassword: process.env.MY_APP_SECRET }); 
var bot = new builder.UniversalBot(connector);
server.post('/API/Messages', connector.listen());

// Create bot dialogs
var recognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: '58ebb34a-9a26-4f83-88bd-c023538291b0', 
	subscriptionKey: '86285636f73b41b7bc7ad2c8e0935938'});

var BasicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({ 
	recognizers: [recognizer],
	defaultMessage: 'No good match in FAQ.',
	qnaThreshold: 0.5});

/*bot.dialog('/', new builder.SimpleDialog(function (session) {
    session.send("Hello World");
}));
*/
bot.dialog('/', BasicQnAMakerDialog);