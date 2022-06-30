const locals = (req, res, next) => {


    if (req.session && req.session.userLogged && req.session.userLogged.admin) {
    
        next()
   
    }    
    
        res.redirect("/")
    
    }
    
    module.exports = locals