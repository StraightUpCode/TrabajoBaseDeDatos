const getUser = require('./getUser')
const router = require('express').Router()
const bodyparser = require('body-parser')
const path = require("path")
router.use(bodyparser.json())
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = username ? await getUser(username, password) : null
    if (!user) throw new Error("usuario vacio")
    console.log("DB: " + user)
    console.log({ username, password })
    if (username === user.username && password === user.password) {
      console.log(user.rol)
      req.session.rol = user.rol
      console.log(req.session)
      req.session.save()
      res.redirect("/")
    }

  } catch (e) {
    console.log(e)
  }

})

router.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/login.html'))
})

router.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy()
  }
  res.send("Session Cerrada")
})

module.exports = router
