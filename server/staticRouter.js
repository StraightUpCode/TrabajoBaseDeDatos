const express = require('express')
const path = require('path')
const db = require('./dbConnection')
const queryMaker = require('./testrandom')
const router = express.Router()
const checkAuthMiddleware = require('./AuthMiddleware/checkAuth')
const commonQuerys = require('./DatabaseCommonQuerys/DatabaseCommonQuerys')

router.use(express.static(path.join(__dirname, '../public')))
router.use(checkAuthMiddleware)
router.get('/', async (req, res) => {
  //res.sendFile(path.join(__dirname, '../public/index.html'))



})

router.get('/agregarTrabajador', (req, res) => {
  res.render('agregarTrabajador', {
    admin: req.session.rol == 'admin',
    cargo: await commonQuerys.getCargos(),
    diaPago: await commonQuerys.getDiasPago()
  })
})
/*
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
*/


module.exports = router