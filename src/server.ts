import app from "./app"
import mongoose from 'mongoose'
import configs from "./app/configs";

async function main() {
    try {
        await mongoose.connect(configs.db_url as string);
        app.listen(configs.port, () => {
            console.log(`Tech Whisper Server is running on ${configs.port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main();