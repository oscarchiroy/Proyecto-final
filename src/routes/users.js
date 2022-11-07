const express = require('express');
const router = express.Router();

const User = require ('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
})
router.post('/users/signin', passport.authenticate('local', {
    //ruta para pantalla de credito
    successRedirect: '/prestamos',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
const { name, email, password, confirm_password } = req.body;
const errors = [];
if(name.length <= 0) {
    errors.push({text: 'Porfavor Ingrese el nombre'});
}
if(password != confirm_password) {
    errors.push({text: 'Contraseña no coinciden'});
}
if (password.length < 4) {
    errors.push({text: 'La contraseña debe ser mayor de 4 caracteres'});
}

if(errors.length > 0) {
    res.render('users/signup', {errors, name, email, password, confirm_password});
} else {
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
    req.flash('error_msg', 'El correo ya existe');
    res.redirect('/users/signup');
    }
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Regristro Exitoso');
    res.redirect('/users/signin');
}
});

module.exports = router