const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./auth.json");

var fs = require("fs");
var path = require("path");
var util = require("util");

// Require substance JSON
const compounds = require("./compounds.json");

client.on("ready", () => {
  console.log("I'm Online");
});

var prefix = "--";

client.on("guildMemberAdd", member => {
  //logs every user who joins into the console
  console.log(member.user.username);
  console.log(member.toString());
  console.log(member.id.toString());
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  // This is the best way to define args. Trust me. <-- Someone else wrote this lol
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
  	console.log("Tried command: "+command)
    console.error(err);
  }
});

client.login(settings.token);