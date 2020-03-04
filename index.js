/*
https://www.google.com/search?q=pupeteer+reuse+browser+isntance&oq=pupeteer+reuse+browser+isntance&aqs=chrome..69i57.5239j0j1&sourceid=chrome&ie=UTF-8
https://sdk.apify.com/docs/api/puppeteerpool
https://www.npmjs.com/package/puppeteer-cluster
https://help.apify.com/en/articles/1640711-how-to-log-in-to-a-website-using-puppeteer
https://medium.com/@jsoverson/bypassing-captchas-with-headless-chrome-93f294518337
https://www.youtube.com/watch?v=wsDRkAD6lPs
https://stackoverflow.com/questions/55370677/site-that-i-am-trying-to-scrape-is-blocking-me-because-im-using-automated-tools

https://www.google.com/search?ei=sZYiXszzDOig_Qayo6DYBA&q=discord+js+global+timelock&oq=discord+js+global+timelock&gs_l=psy-ab.3..33i160l2.5171.5971..6101...0.1..0.101.690.6j2......0....1..gws-wiz.......0i71j33i22i29i30j33i299.TITAmv5pwGw&ved=0ahUKEwiMkIa_tIznAhVoUN8KHbIRCEsQ4dUDCAs&uact=5
https://stackoverflow.com/questions/48432102/discord-js-cooldown-for-a-command-for-each-user-not-all-users


Things to keep in mind:

  Need to save cookies in between each user input (Either find a way to transfer cookies between instances, use the same instance, or auto-run script that logs in each instance)
  Able to go to backup Chegg account if the main account is down
  Delay user input enough to not provoke Google automation filters
  Adblock?



Swap between multiple accounts based on counter

*/
const puppeteer = require('puppeteer-extra');
const Discord = require ('discord.js');
const {prefix, cheggCommand, token, channelID, testChannelID} = require('./config.json');           //Grabs prefix and token values from config.json file
const {username, password} = require('./credentials.json');                                  //Credentials
const client = new Discord.Client();
const {getBrowserInstance} = require('./instance');
const queue = new Map();
// add stealth plugin and use defaults (all evasion techniques)
//https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

/*        reCAPTCHA solver
    puppeteer.use(
      RecaptchaPlugin({
        provider: { id: '2captcha', token: 'XXXXXXX' },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
      })
    )
*/

var counter = 0;


client.once('ready', () => {
  console.log('Ready for use...')
})


client.on('guildMemberAdd', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Lame-ass Nerd"));
})

client.on('message', message =>{
  var userAgent = require('user-agents');





/*
  if (message.content.toLowerCase() === (prefix + 'swap')){
      //Creates another browser with different log in credentials for scraping
  }
*/
  //Prints out help info
  if (message.content.toLowerCase() === (prefix + 'help') ){
    message.channel.send("**HOW TO USE THE CHEGG BOT** ``\n!chegg <Link Goes Here>`` \n\n**EXAMPLE** \n``!chegg https://www.chegg.com/homework-help/questions-and-answers/solve-initial-value-problem-y-x-2-y-2-xy-y-2-2-note-involves-homogeneous-differential-equa-q3561645``\n\n**NOTE**\nPlease make sure that you are in the <#650940039525695509> channel for the !chegg command.");
  }

  //Prints out error message
  else if (message.content.toLowerCase().startsWith(prefix + 'error')){
    message.channel.send("<@219180749792739329> has been notified\nPlease wait while the bot undergoes maintence.");
  }

  //Prints out Navy Seal copypasta
  else if (message.content.toLowerCase().startsWith(prefix + 'ns')){
    message.channel.send("What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.");
  }

  //Degeneracy
  else if ((message.content.toLowerCase().startsWith(prefix + 'uwu')) && (Math.random() < 0.5)){
    message.channel.send("https://www.youtube.com/watch?v=h6DNdop6pD8");
  }
  else if ((message.content.toLowerCase().startsWith(prefix + 'uwu')) && (Math.random() >= 0.5)){
    message.channel.send("https://www.youtube.com/watch?v=Gq8F7dzf_qA");
  }

  else if (message.content.toLowerCase().startsWith(prefix + 'fortnite')){
    message.channel.send("```    ⠀⠀⠀⠀⣀⣤\n    ⠀⠀⠀⠀⣿⠿⣶\n    ⠀⠀⠀⠀⣿⣿⣀\n    ⠀⠀⠀⣶⣶⣿⠿⠛⣶\n    ⠤⣀⠛⣿⣿⣿⣿⣿⣿⣭⣿⣤\n    ⠒⠀⠀⠀⠉⣿⣿⣿⣿⠀⠀⠉⣀\n    ⠀⠤⣤⣤⣀⣿⣿⣿⣿⣀⠀⠀⣿\n    ⠀⠀⠛⣿⣿⣿⣿⣿⣿⣿⣭⣶⠉\n    ⠀⠀⠀⠤⣿⣿⣿⣿⣿⣿⣿\n    ⠀⠀⠀⣭⣿⣿⣿⠀⣿⣿⣿\n    ⠀⠀⠀⣉⣿⣿⠿⠀⠿⣿⣿\n    ⠀⠀⠀⠀⣿⣿⠀⠀⠀⣿⣿⣤\n    ⠀⠀⠀⣀⣿⣿⠀⠀⠀⣿⣿⣿\n    ⠀⠀⠀⣿⣿⣿⠀⠀⠀⣿⣿⣿\n    ⠀⠀⠀⣿⣿⠛⠀⠀⠀⠉⣿⣿\n    ⠀⠀⠀⠉⣿⠀⠀⠀⠀⠀⠛⣿\n    ⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣿⣿\n    ⠀⠀⠀⠀⣛⠀⠀⠀⠀⠀⠀⠛⠿⠿⠿\n    ⠀⠀⠀⠛⠛\n    ⠀⠀⠀⣀⣶⣀\n    ⠀⠀⠀⠒⣛⣭\n    ⠀⠀⠀⣀⠿⣿⣶\n    ⠀⣤⣿⠤⣭⣿⣿\n    ⣤⣿⣿⣿⠛⣿⣿⠀⣀\n    ⠀⣀⠤⣿⣿⣶⣤⣒⣛\n    ⠉⠀⣀⣿⣿⣿⣿⣭⠉\n    ⠀⠀⣭⣿⣿⠿⠿⣿\n    ⠀⣶⣿⣿⠛⠀⣿⣿\n    ⣤⣿⣿⠉⠤⣿⣿⠿\n    ⣿⣿⠛⠀⠿⣿⣿\n    ⣿⣿⣤⠀⣿⣿⠿\n    ⠀⣿⣿⣶⠀⣿⣿⣶\n    ⠀⠀⠛⣿⠀⠿⣿⣿\n    ⠀⠀⠀⣉⣿⠀⣿⣿\n    ⠀⠶⣶⠿⠛⠀⠉⣿\n    ⠀⠀⠀⠀⠀⠀⣀⣿\n    ⠀⠀⠀⠀⠀⣶⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠶⠀⠀⣀⣀\n    ⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣶⣿⣿⣿⣿⣿⣿\n    ⠀⠀⣀⣶⣤⣤⠿⠶⠿⠿⠿⣿⣿⣿⣉⣿⣿\n    ⠿⣉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⣤⣿⣿⣿⣀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿⣶⣤\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⠿⣛⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠛⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⠿⠀⣿⣿⣿⠛\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠿⣿⠀⠀⣿⣶\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠛⠀⠀⣿⣿⣶\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⠤\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿\n    ⠀⠀⣀\n    ⠀⠿⣿⣿⣀\n    ⠀⠉⣿⣿⣀\n    ⠀⠀⠛⣿⣭⣀⣀⣤\n    ⠀⠀⣿⣿⣿⣿⣿⠛⠿⣶⣀\n    ⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⣉⣶\n    ⠀⠀⠉⣿⣿⣿⣿⣀⠀⠀⣿⠉\n    ⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿\n    ⠀⣀⣿⣿⣿⣿⣿⣿⣿⣿⠿\n    ⠀⣿⣿⣿⠿⠉⣿⣿⣿⣿\n    ⠀⣿⣿⠿⠀⠀⣿⣿⣿⣿\n    ⣶⣿⣿⠀⠀⠀⠀⣿⣿⣿\n    ⠛⣿⣿⣀⠀⠀⠀⣿⣿⣿⣿⣶⣀\n    ⠀⣿⣿⠉⠀⠀⠀⠉⠉⠉⠛⠛⠿⣿⣶\n    ⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿\n    ⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉\n    ⣀⣶⣿⠛\n        ⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣶⣿⣿⣿⣶⣶⣤⣶⣶⠶⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⣤⣿⠿⣿⣿⣿⣿⣿⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠛⣿⣤⣤⣀⣤⠿⠉⠀⠉⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠉⣿⣿⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣛⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⠛⠿⣿⣿⣿⣶⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⣿⠛⠉⠀⠀⠀⠛⠿⣿⣿⣶⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣶⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠛⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀```");
    message.channel.send("```\n        ⠀⠀⠀⠀⠀⠀⣤⣶⣶\n    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣀⣀\n    ⠀⠀⠀⠀⠀⣀⣶⣿⣿⣿⣿⣿⣿\n    ⣤⣶⣀⠿⠶⣿⣿⣿⠿⣿⣿⣿⣿\n    ⠉⠿⣿⣿⠿⠛⠉⠀⣿⣿⣿⣿⣿\n    ⠀⠀⠉⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣤⣤\n    ⠀⠀⠀⠀⠀⠀⠀⣤⣶⣿⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⣀⣿⣿⣿⠿⠉⠀⠀⣿⣿⣿⣿\n    ⠀⠀⠀⠀⣿⣿⠿⠉⠀⠀⠀⠀⠿⣿⣿⠛\n    ⠀⠀⠀⠀⠛⣿⣿⣀⠀⠀⠀⠀⠀⣿⣿⣀\n    ⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠿⣿⣿\n    ⠀⠀⠀⠀⠀⠉⣿⣿⠀⠀⠀⠀⠀⠀⠉⣿\n    ⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣀⣿\n    ⠀⠀⠀⠀⠀⠀⣀⣿⣿\n    ⠀⠀⠀⠀⠤⣿⠿⠿⠿\n        ⠀⠀⠀⠀⣀\n    ⠀⠀⣶⣿⠿⠀⠀⠀⣀⠀⣤⣤\n    ⠀⣶⣿⠀⠀⠀⠀⣿⣿⣿⠛⠛⠿⣤⣀\n    ⣶⣿⣤⣤⣤⣤⣤⣿⣿⣿⣀⣤⣶⣭⣿⣶⣀\n    ⠉⠉⠉⠛⠛⠿⣿⣿⣿⣿⣿⣿⣿⠛⠛⠿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣭⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⠛⠿⣿⣤\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠀⣿⣿⣤\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣶⣿⠛⠉\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠀⠀⠉\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉\n    ⠀⠀⠀⠀⠀⠀⣶⣿⣶\n    ⠀⠀⠀⣤⣤⣤⣿⣿⣿\n    ⠀⠀⣶⣿⣿⣿⣿⣿⣿⣿⣶\n    ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿\n    ⠀⠀⣿⣉⣿⣿⣿⣿⣉⠉⣿⣶\n    ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿\n    ⠀⣤⣿⣿⣿⣿⣿⣿⣿⠿⠀⣿⣶\n    ⣤⣿⠿⣿⣿⣿⣿⣿⠿⠀⠀⣿⣿⣤\n    ⠉⠉⠀⣿⣿⣿⣿⣿⠀⠀⠒⠛⠿⠿⠿\n    ⠀⠀⠀⠉⣿⣿⣿⠀⠀⠀⠀⠀⠀⠉\n    ⠀⠀⠀⣿⣿⣿⣿⣿⣶\n    ⠀⠀⠀⠀⣿⠉⠿⣿⣿\n    ⠀⠀⠀⠀⣿⣤⠀⠛⣿⣿\n    ⠀⠀⠀⠀⣶⣿⠀⠀⠀⣿⣶\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣭⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠉\n    \n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣶\n    ⠀⠀⠀⠀⠀⣀⣀⠀⣶⣿⣿⠶\n    ⣶⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣤\n    ⠀⠉⠶⣶⣀⣿⣿⣿⣿⣿⣿⣿⠿⣿⣤⣀\n    ⠀⠀⠀⣿⣿⠿⠉⣿⣿⣿⣿⣭⠀⠶⠿⠿\n    ⠀⠀⠛⠛⠿⠀⠀⣿⣿⣿⣉⠿⣿⠶\n    ⠀⠀⠀⠀⠀⣤⣶⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠒\n    ⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⣿⣿⣿⠛⣭⣭⠉\n    ⠀⠀⠀⠀⠀⣿⣿⣭⣤⣿⠛\n    ⠀⠀⠀⠀⠀⠛⠿⣿⣿⣿⣭\n    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⠉⠛⠿⣶⣤\n    ⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⣶⣶⠿⠿⠿\n    ⠀⠀⠀⠀⠀⠀⣿⠛\n    ⠀⠀⠀⠀⠀⠀⣭⣶  \n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿\n    ⠀⠀⣶⠀⠀⣀⣤⣶⣤⣉⣿⣿⣤⣀\n    ⠤⣤⣿⣤⣿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣀\n    ⠀⠛⠿⠀⠀⠀⠀⠉⣿⣿⣿⣿⣿⠉⠛⠿⣿⣤\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⠛⠀⠀⠀⣶⠿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣤⠀⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⣿⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿⣿⠿⠉⠉\n    ⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠉\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣛⣿⣭⣶⣀\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠉⠛⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⣿⣿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣉⠀⣶⠿\n    ⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⠿\n    ⠀⠀⠀⠀⠀⠀⠀⠛⠿⠛\n    \n    ⠀⠀⠀⣶⣿⣶\n    ⠀⠀⠀⣿⣿⣿⣀\n    ⠀⣀⣿⣿⣿⣿⣿⣿\n    ⣶⣿⠛⣭⣿⣿⣿⣿\n    ⠛⠛⠛⣿⣿⣿⣿⠿\n    ⠀⠀⠀⠀⣿⣿⣿\n    ⠀⠀⣀⣭⣿⣿⣿⣿⣀\n    ⠀⠤⣿⣿⣿⣿⣿⣿⠉\n    ⠀⣿⣿⣿⣿⣿⣿⠉\n    ⣿⣿⣿⣿⣿⣿\n    ⣿⣿⣶⣿⣿\n    ⠉⠛⣿⣿⣶⣤\n    ⠀⠀⠉⠿⣿⣿⣤\n    ⠀⠀⣀⣤⣿⣿⣿\n    ⠀⠒⠿⠛⠉⠿⣿\n    ⠀⠀⠀⠀⠀⣀⣿⣿\n    ⠀⠀⠀⠀⣶⠿⠿```");
  }

  else if (message.content.toLowerCase().startsWith(prefix + 'mlm')){
    message.channel.send("Hey👋 ladies💁‍♀️ 📷 Would 😍 you 👈 like 👍 to 2️⃣ get 😮 rich 💰💰💰 by running 🏃‍♀️🏃‍♀️ your 👈 own business 👩‍💼💼 from home 🏡 with just ☝ your phone? 📱🤳 Well 🤷‍♀️ you can't. 😂 Get 👏 a 👏 real 👏 job 👏 you 👏 stupid 👏 cunt.")
  }
  else if (message.content.toLowerCase().startsWith(prefix + 'aita')){
    message.channel.send("So I (74M) was recently hit by a car (2014 Honda) and died. My wife (5F) organized me a funeral (cost $2747) without asking me (74M) at all. I (74M) was unable to make it because I (74M) was dead (17 days). At the funeral I heard my dad (15M) and other family members talking about how they wish I could be there and now I feel bad for not showing up. AITA?");
  }
  else if (message.content.toLowerCase().startsWith(prefix + cheggCommand)){
//------------------------------------------------------------------------------------------------------------------------------
    //https://www.youtube.com/watch?v=4IcBdWOOsPo
/*    const serverQueue = queue.get(message.guild.id)
    if (serverQueue === false){                  //If serverQueue is not ____, create new queue construct with the command channel and empty array as queue
      const queueConstruct = {
        textChannel: message.channel,
        memberQueue: [],
        //other things
      };
      queue.set (message.guild.id, queueConstruct);
      queueConstruct.memberQueue.push(message.author.id);
    }
    else {
      serverQueue.memberQueue.push(message.author.id);
      return message.channel.send(message.author.id + " has been added to the queue");
    }
*/

//------------------------------------------------------------------------------------------------------------------------------



    if ((message.channel.id === channelID || message.channel.id === testChannelID || message.guild === null) && message.content.indexOf("chegg.com/") != -1){
//guild.member(message.member.id)      user exists in server
//Guild ID: 644716593653481482
//client.guilds.get("id")
//    if (message.member.roles.has(allowedRole.id) {
//    let myRole = message.guild.roles.find(role => role.name === "Moderators");

  /*
      if (client.guilds.get(" ").members.roles.has("Chogger")){
        console.log("passes test");
      }
      else{
        console.log("no pass test");
      }
      */


      let date_ob = new Date();
      //Confirmation message
      console.log("         " + message.author.tag);
      console.log("                  Confirming request @" + date_ob.getHours() + ":" + date_ob.getMinutes());
      const requestComfirm = new Discord.RichEmbed()
         .setColor('#0bde3c')
         .setTitle('Request Recieved')
         .setDescription('This may take up to 1 minute. \nDon\'t be an impatient piece of shit, ya fukin twat.')
         .setThumbnail('https://s5.gifyu.com/images/ezgif.com-optimized7ce94c5d4a783cb.gif')
                        message.channel.send(requestComfirm);
      //Content is the link, modified to conform to the format "https://www."
      let content = "https://www." + message.content.substring(message.content.indexOf("chegg.com/")) ;
      (async () => {
        console.log("                  Launching headless browser");
        const browser = await getBrowserInstance();                  //Launches and recycles a single browser instance
        const page = await browser.newPage();
        await page.setUserAgent(userAgent.toString())
        if (counter != 0){
         const cookies = await page.cookies();         //Updates cookie object
         await page.setCookie(...cookies);
        }
        await page.waitFor(stallSlow());

/*
      //Log in with waiting periods between 0.5 and 2 seconds
        if (counter == 0){
         console.log("                  Logging in using credentials");
         await page.goto("https://www.chegg.com/auth?action=login&redirect=https%3A%2F%2Fwww.chegg.com%2F");
         await page.solveRecaptchas();
         await page.click("#emailForSignIn");
         await page.waitFor(stallFast());
         console.log("                          Typing Username");
         await page.keyboard.type(username);
         await page.waitFor(stallFast());
         await page.click("#passwordForSignIn");
         await page.waitFor(stallFast());
         console.log("                          Typing Password");
         await page.keyboard.type(password);
         await page.waitFor(stallFast());
         await page.keyboard.press(String.fromCharCode(13));
         await page.waitForNavigation();
         await page.waitFor(stallFast());
         console.log("                  Successfully logged in");
        }
*/
        //Logged in, accessing webpage
        console.log("                  Accessing webpage");
        console.log("                           " + content)

        await page.goto(content);
        await page.waitFor(stallSlow());
        await page.screenshot({ path: 'fullpage.png', fullPage: true });
        await page.waitFor(stallSlow());
        await message.author.send("This is the screenshot you requested\n\nIf there is any issues with the screenshot (ie. Account gets restricted), message <@219180749792739329>", {files: ['fullpage.png']});
        const cookies = await page.cookies();         //Updates cookie object cookies
        message.react('✅');
        console.log("                  Screenshot sent");
        console.log("------------------------------------------------------------------------------------------------------------------------");
        page.close();
        counter++;                      //Successfully processed and delivered request
      })().catch( e => {
        console.log("        Unexpected error");
        console.error(e);
        message.channel.send("There has been an unexpected error. Try again in a bit. If the error persists, please use the \"!error\" command.");
        message.react('❌');
        return;
      });
    }
    else if (message.content.indexOf("chegg.com/") == null){
      message.react('❗');
      const requestError = new Discord.RichEmbed()
         .setColor('##e3251b')
         .setTitle('Invalid URL')
         .setDescription('Ensure the link is valid and try again')
         .setThumbnail('https://i.lensdump.com/i/iUcB9k.png')
                        message.channel.send(requestError);
    }

    else if ((message.channel.id != channelID || message.channel.id != testChannelID || message.guild != null) && message.content.indexOf("chegg.com/") != -1){
      message.react('➡️');
      const requestRedirect = new Discord.RichEmbed()
         .setColor('#0062ff')
         .setTitle('Error')
         .setDescription('Try again in <#650940039525695509>.')
         .setThumbnail('https://i.lensdump.com/i/ixPy2i.png')
                        message.channel.send(requestRedirect);
    }


    else{
      message.react('❌');
      const requestRedirect = new Discord.RichEmbed()
         .setColor('#0062ff')
         .setTitle('Error')
         .setDescription('An unexpected error has occurred. Please ping <@219180749792739329> if the error occurs again.')
         .setThumbnail('https://i.lensdump.com/i/ixPy2i.png')
                        message.channel.send(requestRedirect);
    }
  }

  function stallSlow(){
    return Math.floor(Math.random() * (Math.floor(5000) - Math.ceil(3500))) + Math.ceil(3500)
  }
  function stallFast(){
    return Math.floor(Math.random() * (Math.floor(2500) - Math.ceil(1000))) + Math.ceil(1000)
  }



})
client.login(token);
