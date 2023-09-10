import TELEGRAM_BOT from "npm:node-telegram-bot-api";

const TOKEN = "6039041189:AAEGEwL22RpqWsMDvUCFE8o5wWfVw5LZzUI";

export const bot = new TELEGRAM_BOT(TOKEN, {
    polling: true,
});
