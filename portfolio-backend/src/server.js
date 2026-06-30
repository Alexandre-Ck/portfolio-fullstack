import express from 'express';
import cors from 'cors';

// ✅ Charge dotenv UNIQUEMENT en développement local (évite le conflit sur Vercel)
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}

import authRoutes from './routes/auth.routes.js'; 
import projectRoutes from './routes/project.routes.js';
import errorHandler from './middlewares/errorHandler.js'; // Middleware de gestion d'erreurs
import contactRoutes from './routes/contact.routes.js'; 

const app = express();  

// ✅ Configuration CORS : Autorise toutes les origines pour le moment
app.use(cors({ 
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

// ✅ Les routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Gestionnaire d'erreurs — toujours EN DERNIER
app.use(errorHandler);

// ❌ Désactivé pour Vercel : On ne lance pas de serveur d'écoute traditionnel en production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Serveur local démarré sur http://localhost:${PORT}`);
  });
}

// ✅ Essentiel pour Vercel : On exporte l'application
export default app;