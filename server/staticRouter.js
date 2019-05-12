const express = require('express')
const path = require('path')
const db = require('./dbConnection')
const queryMaker = require('./testrandom')
const router = express.Router()

router.use(express.static(path.join(__dirname, '../public')))
router.get('/', async (req, res) => {
  //res.sendFile(path.join(__dirname, '../public/index.html'))
  const [rows] = await db.query(
    queryMaker.select('*')
      .from('Cargo')
      .make())
  console.log(rows)
  res.render('intro', {
    admin: req.session.rol == 'admin',
    cargo: rows
  })
})

router.get('/agregarTrabajador', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/agregarTrabajador.html'))
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