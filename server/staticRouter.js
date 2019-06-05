const express = require('express')
const path = require('path')
const db = require('./dbConnection')
const queryMaker = require('./testrandom')
const router = express.Router()
const commonQuerys = require('./DatabaseCommonQuerys/DatabaseCommonQuerys')

router.use(express.static(path.join(__dirname, '../public')))

router.use(require('./AuthMiddleware/checkAuth'))
router.get('/', async (req, res) => {
  console.log("Vengo del redirect")
  //res.sendFile(path.join(__dirname, '../public/index.html'))
  res.redirect("/agregarTrabajador")

})
router.get("/diaPago", async (req, res) => {
  res.render("diaDePago", {   
    admin: req.session.rol == 'admin',
    diaPago:await commonQuerys.getDiasPago()
  })
  })
router.get('/vistaNomina', async (req, res) => {
  res.render('vistaNomina', {
    dato : await commonQuerys.getDatosTrabajador() 
    })
})
router.get('/agregarTrabajador', async (req, res) => {
  res.render('agregarTrabajador', {
    admin: req.session.rol == 'admin',
    cargo: await commonQuerys.getCargos(),
    diaPago: await commonQuerys.getDiasPago(),
    frecuenciaDePago: await commonQuerys.getFrecuenciaDePago()
  })

})
router.get('/trabajadorHoras', async (req, res) => {
  res.render('trabajadorHoras', {
    admin: req.session.rol == 'admin'
  })
})

router.get('/crearUsuario', async (req, res) => {
  res.render('crearUsuario', {
    admin: req.session.rol == 'admin',
    Rol: await commonQuerys.getRoles()
  })
})
router.get("/eliminarTrabajador", async (req, res) => {
  res.send("pendiente", {});
})
router.get('/crearPrestamo', async (req, res) => {
  res.render('crearPrestamo', {
    admin: req.session.rol == 'admin',
  })
})

router.get('/crearHorario', async (req, res) => {
  res.render('crearHorarios', {
    admin: req.session.rol == 'admin',

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

router.get('/demo', (req, res) => {
  res.render('demo');
})

module.exports = router

