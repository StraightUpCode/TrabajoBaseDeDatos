const express = require('express')
const mainRouter = require('./routes.js')
const app = express()

// Global Middleware
app.use(express.urlencoded())
app.use("/api", mainRouter)
// Servidor Escuchar
app.listen(3000)

