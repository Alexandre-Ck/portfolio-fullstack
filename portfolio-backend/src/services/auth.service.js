import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import AppError from '../errors/AppError.js';


export const loginUser = async (email, password) => {
  // 1. Appel du modèle pour trouver l'utilisateur
  const user = await UserModel.findByEmail(email);

  // 2. Si l'utilisateur n'existe pas, on lance une erreur 401
  // Note : On utilise le même message pour l'email et le MDP par sécurité
  if (!user) {
    throw new AppError("Email ou mot de passe incorrect", 401);
  }

  // 3. Comparaison du mot de passe envoyé avec le hash en BDD
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // 4. Si le mot de passe est incorrect -> Erreur 401
  if (!isPasswordValid) {
    throw new AppError("Email ou mot de passe incorrect", 401);
  }

  // 5. Génération du JWT si tout est OK
  // On y met l'ID, l'email et surtout le ROLE pour les futures autorisations
  console.log("Secret chargé :", process.env.JWT_SECRET);
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // Durée de validité : 24 heures
  );

  // 6. On retourne uniquement le token au contrôleur
  return token;
};