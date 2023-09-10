import { user as UserDB } from "../model/user.ts";
import { bot } from "./bot.ts";
import { requestContact, start } from "./helper/start.ts";
import { getAllUser } from "./helper/user.ts";

bot.on("message", async (ctx: any) => {
    const chatId = ctx.from.id;
    const text: string = ctx.text;

    const user = await UserDB.findOne({ chatId }).lean();

    if (text === "/start") {
        start(ctx);
    }

    if (user) {
        if (user.action === "request_contact" && !user.phone) {
            requestContact(ctx);
        }
        if (text === "Foydalanuvchilar") {
            getAllUser(ctx);
        }
    }
});
