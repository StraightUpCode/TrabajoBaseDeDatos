// Cargar Variables de Entorno
require('dotenv').config()

const express = require('express')
const apiRouter = require('./ApiRouter.js')
const app = express()
const staticRouter = require("./staticRouter.js")
const sessions = require('./AuthMiddleware/session')
const authRouter = require('./AuthMiddleware/authRouter')
// Global Middleware
app.use(express.urlencoded({ extetended: true }))
app.use(sessions)
app.use(authRouter)


// Routers
app.use("/api", apiRouter)
app.use(staticRouter)
// Servidor Escuchar
app.listen(3000)

