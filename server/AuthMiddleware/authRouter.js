const getUser = require('./getUser')
const router = require('express').Router()
const bodyparser = require('body-parser')
const path = require("path")
router.use(bodyparser.json())
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await getUser(username, password)
    console.log(user.username)
    console.log({ username, password })
    if (username === user.username && password === user.password) {
      req.session.user = user
      req.session.save()
    }
    res.redirect("/")
  } catch (e) {
    console.log(e)
  }

})

router.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/login.html'))
})

module.exports = router