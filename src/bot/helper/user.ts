import { user as UserDB } from "../../model/user.ts";
import { bot } from "../bot.ts";
import { adminKeybord, userKeybord } from "../menu/keyboard.ts";

export const getAllUser = async (ctx: any) => {
    const chatId = ctx.from.id;
    let user = await UserDB.findOne({ chatId }).lean();

    if (user?.admin) {
        const users = await UserDB.find().lean();
        console.log(users);
        bot.sendMessage(
            chatId,
            `Foydalanuvchilar ro'yxati:
            ${users.map((user) => `\n${user.name}: ${user.createdAt}`)}
        `
        );
    } else {
        bot.sendMessage(chatId, `Sizga bunday so'rov mumkin emas`, {
            replay_markup: {
                keyboard: userKeybord,
                resize_keyboard: true,
            },
        });
    }
};
