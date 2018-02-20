var Discord = require('discord.io');
var logger = require('winston');
var auth = require('../token.json');
var responses = require('./responses');
var starts = require('./start-keywords');
var stops = require('./stop-keywords');
var botIsOn = true;
var jeepsId = "222531796334542849";
var date = new Date();
var currentDay = date.getDate();
var currentMonth = date.getMonth() + 1;
var guptaBirthday = "2/19";
var currentDateString = currentMonth + '/' + currentDay;
var guptachannel = "415541062539673603";


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');

  // gupta will announce birthday
  if (currentDateString === guptaBirthday) {
    // if it's gupta's birthday
    bot.sendMessage({
      to: guptachannel,
      message: "hello my birthday"
    })
  } else if (currentDateString !== guptaBirthday) {
    // if not gupta birthday   
    bot.sendMessage({
      to: guptachannel,
      message: "hello gupta here welcome tech support"
    })  

  }

});

bot.on('message', function (user, userID, channelID, message, evt) {

  // Check to see if 'The Master' is speaking.
  if (userID === jeepsId) {
    // Check to see if the message was a turn off or turn on command
    if (checkAll(message, starts)) {
      botIsOn = true; // set state to ON if a turn on command was passed
    } else if (checkAll(message, stops)) {
      botIsOn = false; // set state to OFF if a turn off command was passed
      bot.sendMessage({
        to: channelID,
        message: "ok master"
      })
    }
  }

  /**
   * THEN
   */

  // If the message wasn't from the bot and the bot is turned on
  if (userID !== bot.id && botIsOn === true) {
    //Random Handler
    var rand = Math.floor(Math.random() * responses.length);

    // Do the thing
    var randMessage = responses[rand];

    bot.sendMessage({
      to: channelID,
      // message: 'gupta is for the help your problem with your microsoft device. what are you need for? '
      message: randMessage
    })
  }

  //     // Our bot needs to know if it will execute a command
  //     // It will listen for messages that will start with `!`
  //     if (message.substring(0, 1) == '!') {
  //         var args = message.substring(1).split(' ');
  //         var cmd = args[0];

  //         args = args.splice(1);
  //         switch(cmd) {
  //             // !ping
  //             case 'ping':
  //                 bot.sendMessage({
  //                     to: channelID,
  //                     message: 'Pong!'
  //                 });
  //             break;
  //             // Just add any case commands if you want to..
  //          }
  //      }\
});


/**
 * 
 * @param {string} string string to be checked against the array of accepted commands
 * @param {array} array array of accepted commands to be checked
 */
function checkAll(string, array) {
  counter = 0;
  array.forEach((element) => {
    if (string.includes(element) === false) {
      counter++;
    } else {
      // Do nothing 
    }
  })

  if (counter === array.length) {
    return false;
  } else {
    return true;
  }
}


