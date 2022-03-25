import express from 'express'

const PORT = 5000

const app = express()

app.get("/", (req, res, next) => {
  res.json({
    status: "server running"
  })
})

app.listen(PORT, () => {
  console.log("server start")
})
