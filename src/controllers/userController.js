const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const ModelUsers = require('../models/User');

const usersFile = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));


const usersController = {

    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res)=>{
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = ModelUsers.findField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

        let image
        if(req.file.filename != undefined){
			image = req.file.filename
		}else{
			image = 'avatar.png'
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			password_confirm: bcryptjs.hashSync(req.body.password_confirm, 10),
			image: image
		}

		ModelUsers.create(userToCreate);
		

		return res.redirect('/users/login');
    },
	login: (req, res) => {
        res.render('login');
    },
	loginProcess: (req, res) => {

		let resultValidation = validationResult(req)
		let userToLogin = ModelUsers.findField('email', req.body.email);
		
		if (!resultValidation.errors.length > 0){ 
		if(userToLogin) {
			let password = req.body.password == userToLogin.password;
			if (password) {
				userData = userToLogin
				delete userToLogin.password;
				req.session.userLogged = userData;

				console.log("🚀 ~" , userToLogin )
                console.log("🚀 ~" , userData )
				
				if(req.body.remember) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 1000) * 90 })
				}

				return res.redirect('/');
			} 
				return res.render('login', {
				errors: {
					email: {
						msg: 'Los datos ingresados son incorrectos'
					}
				}
			});
		} else {
			return res.render('login', {
				errors: {
					email: {
						msg: 'No se encontro el correo ingresado'
					}
				}
			})
		}
	} else {
	
	return res.render('login', {
		errors: resultValidation.mapped(),
	})
}

},




		logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = usersController;