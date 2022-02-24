import Bot from "./Bot";

process.on("uncaughtException", err => {
    console.log("Don't forget to catch this! Error: ", err);
})

const bot = new Bot();
bot.initialise();