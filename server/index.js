// Cargar Variables de Entorno
require('dotenv').config()
// Imports
// Packages
const express = require('express')
const exphdb = require('express-handlebars')
const path = require('path')

// local files
const apiRouter = require('./ApiRouter.js')
const staticRouter = require("./staticRouter.js")
const sessions = require('./AuthMiddleware/session')
const authRouter = require('./AuthMiddleware/authRouter')
// Inicializacion de apps 
const app = express()
// Global Middleware

app.engine('.hbs', exphdb({
  extname: '.hbs',
  defaultLayout: 'main',
}))
//app.use(express.static(path.join(__dirname + '../public')))
console.log(app.settings)
app.set('view engine', '.hbs')
app.use(express.urlencoded({ extended: true }))
app.use(sessions)

// Routers
app.use("/api", apiRouter)
app.use(authRouter)
app.use(staticRouter)
// Servidor Escuchar
app.listen(3000)

