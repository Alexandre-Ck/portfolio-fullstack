import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; 
import projectRoutes from './routes/project.routes.js';
import errorHandler from './middlewares/errorHandler.js';// c le middleware des gestion d'erreur 
import contactRoutes from './routes/contact.routes.js'; 
const app = express();  
const PORT = process.env.PORT || 3001;

// Middlewares globaux
app.use(cors({ origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());

// Exemple avec une route — à dupliquer pour chaque groupe de routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
// TODO : brancher les autres routes ici

// Gestionnaire d'erreurs — toujours EN DERNIER
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});