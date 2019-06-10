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
  res.render('principal', {
    admin: req.session.rol == 'admin'
  })
})
router.get("/diaPago", async (req, res) => {
  res.render("diaDePago", {
    admin: req.session.rol == 'admin',
    diaPago: await commonQuerys.getDiasPago()
  })
})
router.get('/vistaNomina', async (req, res) => {
  res.render('vistaNomina', {
    dato: await commonQuerys.getDatosTrabajador(),
    helpers: {
      sum: (salario, ingresos, deducciones, ...opciones) => {

        return (Number.parseFloat(salario) + Number.parseFloat(ingresos) - Number.parseFloat(deducciones)).toFixed(2)
      },
      date: (fecha) => {
        const newFecha = new Date(fecha)
        return newFecha.toISOString().split('T')[0].split('-').reverse().join('/')
      }
    }
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
    rrhh: req.session.rol == 'rrhh',
    Rol: await commonQuerys.getRoles()
  })
})
router.get('/cargos', async (req, res) => {
  res.render('cargos', {
    admin: req.session.rol == 'admin',
    rrhh: req.session.rol == 'rrhh',
    cargo: await commonQuerys.getCargos()
  })
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

router.get('/trabajadores', async (req, res) => {
  res.render('trabajadorHoras', {
    admin: req.session.rol == 'admin'
  })
})

router.get('/crearNomina', async (req, res) => {
  res.render('crearNomina', {
    admin: req.session.rol == 'admin',

  })
})

router.get('/administrarUsuarios', async (req, res) => {
  res.render('administrarUsuarios', {
    admin: req.session.rol == 'admin',
    usuario: await commonQuerys.getUsers()
  })
})

router.get('/agregarPrestamo', async (req, res) => {
  res.render('prestamos', {
    admin: req.session.rol == 'admin',

  })
})

router.get("/estadoPrestamos", async (req, res) => {
  res.render('estadoPrestamo', {
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


module.exports = router

