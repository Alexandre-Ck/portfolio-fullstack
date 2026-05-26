import express from 'express';
import * as contactController from '../controllers/contact.controller.js';
import { validateContact } from '../validators/contact.validator.js';
import validate from '../middlewares/validate.middleware.js'; 

const router = express.Router();

router.post('/', validateContact, validate, contactController.sendContact);

export default router;