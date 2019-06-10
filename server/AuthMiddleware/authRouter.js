const getUser = require('./getUser')
const router = require('express').Router()
const bodyparser = require('body-parser')
const path = require("path")
router.use(bodyparser.json())
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(req.body)
    const user = username ? await getUser(username, password) : null
    console.log("DB: " + user)
    console.log({ username, password })
    if (username === user.username && password === user.password) {
      console.log(user.rol)
      req.session.rol = user.rol
      console.log(req.session)
      req.session.save()
      res.send({ ok: true })
    } else {
      res.send({ message: "Usuario o Contraseña Equivocado" })
    }

  } catch (e) {
    console.log(e)
  }

})

router.get("/login", async (req, res) => {
  res.render('login', { layout: 'loginLayout' })
})

router.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy()
  }
  res.redirect("/")
})

module.exports = router
