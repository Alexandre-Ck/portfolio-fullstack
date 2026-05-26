import { body } from 'express-validator';
 
export const validateAuth = [
  body('email')
    .notEmpty().withMessage('Le champ email est requis')
    .isEmail().withMessage('Email invalide'),
    
  body('password')
    .notEmpty().withMessage('Mot de passe requis'),
];