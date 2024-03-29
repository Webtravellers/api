import express from 'express'
import router from "./routes/router.js"
import bodyParser from 'body-parser'
import cors from 'cors'
import './db.js'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))

app.use("/", router)

//Error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 400).json({
    status: false,
    message: "Hata oluştu"
  })
});


app.listen(PORT, () => {
  console.log("server started ")
})
