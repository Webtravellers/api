import mongoose from "mongoose";
const localUrl = `mongodb+srv://WebTravellers:Webtravellers5@webtravellers.1nmip.mongodb.net/WebTravellers?authSource=admin&replicaSet=atlas-punzrw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`

mongoose.connect(process.env.CONNECTION_URL || localUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connect to database")
}).catch((err) => {
    console.error("Not connected to database\n", err)
})