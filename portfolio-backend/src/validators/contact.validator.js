import { body } from 'express-validator';

// IL FAUT BIEN LE MOT "export" ICI
export const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 2 }).withMessage('Le nom doit faire au moins 2 caractères'),
  
  body('email')
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Le message ne peut pas être vide')
    .isLength({ min: 10 }).withMessage('Le message doit faire au moins 10 caractères')
];