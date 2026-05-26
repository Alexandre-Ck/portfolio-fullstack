import { body, param } from 'express-validator';

export const validateProject = [
  body('title')
    .trim()
    .notEmpty().withMessage('Le titre est requis')
    .isLength({ min: 2, max:150 }).withMessage('Le titre doit contenir au moins 3 caractères et maximum 150 caractères'),

  body('description')
    .trim()
    .notEmpty().withMessage('La description est requise')
    .isLength({ max:2000 }).withMessage('La description doit contenir au max 2000 caractères'),

  body('image_url')
    .optional({ checkFalsy: true })
    .isURL().withMessage('L\'URL de l\'image n\'est pas valide'),

  body('github_url')
    .optional({ checkFalsy: true })
    .isURL().withMessage('L\'URL GitHub n\'est pas valide'),

  body('tech_stack')
    .trim()
    .notEmpty().withMessage('La liste des technos est requise'),

  body('demo_url')
    .optional({ checkFalsy: true })
    .isURL().withMessage('La demo de l\'image n\'est pas valide'),
];

export const validateProjectId = [
  param('id')
    .isInt({ min:1 }).withMessage('L\'ID du projet doit être un entier positif '),
];