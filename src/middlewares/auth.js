const locals = (req, res, next) => {

res.locals.isAuthenticated = false;

if (req.session.userLogged) {

    res.locals.isAuthenticated = true;
    res.locals.userLogged = req.session.userLogged

}    

next()

}

module.exports = locals