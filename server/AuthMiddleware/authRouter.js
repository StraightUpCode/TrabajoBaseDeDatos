const sessionStore = require('./sessionStore')
const getUser = require('./getUser')
const router = require('express').Router

router.post("/login", async (req, res) => {
  try {
    const { username, password }
    const user = await getUser(username, password)
    if (username === user.username && password === user.password) {
      req.session.id = user.idUser
      req.session.rol = user.rol
    }
    res.redirect("/")

  } catch (e) {
    console.log(e)
  }

})
