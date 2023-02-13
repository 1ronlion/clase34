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

		let allUsers = users

		let userToCreate = {
		"id" : users[users.length - 1].id + 1,	
		"name" : req.body.name,
		"userName" : req.body.userName,
		"admin" : req.body.admin,
		"password" : req.body.password,
		}

		console.log(userToCreate)

		allUsers.push(userToCreate);

	fs.writeFileSync(usersFile, JSON.stringify(allUsers, null,  ' '));

	res.redirect("/")

    },
	login: (req, res) => {
        res.render('login');
    },
	loginProcess: (req, res) => {
		
		let resultValidation = validationResult(req);

		if(resultValidation.errors.length > 0){"render", "mostrar errores de validacion" }

		if(!req.body.email === userName){"render", "usuario no encontrado"}

		if(!req.body.password === userPass){"render", "contraseña incorrecta"} else {
			
			
				("guardamos el usuario en sesion") (req.session.userLogged)

				if(req.body.remember){res.cookie("crear una cookie con nombre de usuario")}


		}

		{"redirect", "usuario logueado"}
	
},

		logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = usersController;