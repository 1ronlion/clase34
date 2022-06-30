let { body } = require('express-validator');

const validationLogin = [
    body('email').isEmail().withMessage('El email debe ser un email válido'), 
    body('password').isLength({ min: 6, max: 20 }).withMessage('El password debe tener entre 6 y 20 caracteres')
]

module.exports = validationLogin;