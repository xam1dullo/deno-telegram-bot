import expres from "npm:express";
import mongoose from "npm:mongoose";
import "./bot/index.ts";
const app = expres();

app.use(expres.json());

const PORT = 3000;
const MONGO_URI =
    "mongodb+srv://khkhamidullo:0U7HwYK0kOWVIrdmsa@deno-bot.n6ycgor.mongodb.net/";
// "mongodb://localhost:27017/node-telegram-bot";

function dev() {
    try {
        mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log("Mongodb Connect"))
            .catch((error) => console.log(error));

        app.listen(PORT, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        dev();
        console.log(error);
    }
}

dev();
