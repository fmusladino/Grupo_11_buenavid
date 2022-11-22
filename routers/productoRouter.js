const express = require ('express');
const { controller }  = require('../controller/mainController');
const router = express.Router();
const multer = require('multer');
const {check} = require('express-validator');