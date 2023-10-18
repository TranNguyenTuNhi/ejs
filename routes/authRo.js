//dinh tuyen
const express = require('express');//import express
const router = express.Router();//import router
const authController = require('../controllers/authCtrl');//import controller

router.post('/register', authController.registerUser);//register

router.post('/login', authController.loginUser);//login

module.exports = router;//export router