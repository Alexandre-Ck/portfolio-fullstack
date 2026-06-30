import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; 
import projectRoutes from './routes/project.routes.js';
import errorHandler from './middlewares/errorHandler.js'; 
import contactRoutes from './routes/contact.routes.js'; 

const app = express();  

// Config CORS assouplie pour la production
app.use(cors({ 
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

// Tes routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Gestionnaire d'erreurs — toujours EN DERNIER
app.use(errorHandler);

// ❌ On commente le listen pour Vercel
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });

// ✅ On exporte l'application pour Vercel
export default app;