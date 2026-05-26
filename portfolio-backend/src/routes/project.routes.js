import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { validateProject } from '../validators/project.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

// --- ROUTES PUBLIQUES ---
// Tout le monde peut voir les projets
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);


// --- ROUTES PRIVÉES (Admin seulement) ---
// 1. authenticate : Vérifie si le token est valide
// 2. authorize('admin') : Vérifie si le rôle est admin
// 3. validateProject + validate : Vérifie si le titre/description sont là
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validateProject,
  validate,
  projectController.create
);

router.put('/:id', authenticate, authorize('admin'), validateProject, validate, projectController.update);

router.delete('/:id', authenticate, authorize('admin'), validateProject, validate, projectController.remove);



export default router;