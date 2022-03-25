import express from 'express'
import router from "./router/router.js"

const PORT = 5000

const app = express()

app.use("/", router)

app.listen(PORT, () => {
  console.log("server started ")
})
