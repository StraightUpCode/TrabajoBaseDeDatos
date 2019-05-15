const getUser = require('./getUser')
const router = require('express').Router()
const bodyparser = require('body-parser')
const path = require("path")
router.use(bodyparser.json())
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(req.body)
    const user = await getUser(username, password)
    console.log("DB: " + user)
    console.log({ username, password })
    if (username === user.username && password === user.password) {

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