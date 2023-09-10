import { bot } from "../bot.ts";
import { user as UserDB } from "../../model/user.ts";
import { adminKeybord, userKeybord } from "../menu/keyboard.ts";
export const start = async (ctx: any) => {
    const chatId = ctx.from.id;
    const checkUser = await UserDB.findOne({ chatId }).lean();
    if (!checkUser) {
        const newUser = new UserDB({
            name: ctx.from.first_name,
            chatId,
            status: true,
            createdAt: new Date(),
            action: "request_contact",
        });
        await newUser.save();
        bot.sendMessage(chatId, `Iltimos Telefon raqamingizni share qiling!.`, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: "Share contact",
                            request_contact: true,
                        },
                    ],
                ],
                resize_keyboard: true,
            },
        });
    } else {
        await UserDB.findByIdAndUpdate(
            checkUser._id,
            {
                ...checkUser,
                action: "menu",
            },
            {
                new: true,
            }
        );
        bot.sendMessage(chatId, `Iltimos Telefon raqamingizni share qiling!.`, {
            reply_markup: {
                keyboard: adminKeybord,
                resize_keyboard: true,
            },
        });
    }
};

export const requestContact = async (ctx: any) => {
    const chatId = ctx.from.id;
    if (ctx.contact.phone_number) {
        let user: any = await UserDB.findOne({ chatId }).lean();
        user.phone = ctx.contact.phone_number;
        user.admin = ctx.contact.phone_number === "+998946110066";
        await UserDB.findByIdAndUpdate(
            user._id,
            {
                ...user,
                action: "menu",
            },
            {
                new: true,
            }
        );
        bot.sendMessage(
            chatId,
            `Menu tanlang, ${user.admin ? "Admin" : user.name}`,
            {
                reply_markup: {
                    keyboard: adminKeybord,
                    resize_keyboard: true,
                },
            }
        );
    }
};
