const checkAuth = async (req, res) => {
  if (!req.session.rol) {
    // Si no ha iniciado Sesion, lo manda a "/login"
    console.log("No hay session")
    res.redirect("/login")
  } else {
    // De lo Contrario, que siga a donde iba 
    req.next()
  }

}

module.exports = checkAuth