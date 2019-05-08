const express = require('express')
const apiRouter = require('./ApiRouter.js')
const app = express()

// Global Middleware
app.use(express.urlencoded({ extetended: true }))
app.use("/api", apiRouter)
// Servidor Escuchar
app.listen(3000)

