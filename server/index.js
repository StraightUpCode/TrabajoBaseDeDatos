const express = require('express')
const apiRouter = require('./ApiRouter.js')
const app = express()
const staticRouter = require("./staticRouter.js")
// Global Middleware
app.use(express.urlencoded({ extetended: true }))
app.use("/api", apiRouter)
app.use(staticRouter)
// Servidor Escuchar
app.listen(3000)

