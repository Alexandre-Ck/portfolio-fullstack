import AppError from "../errors/AppError.js";


export const authorize = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Utilisateur non authentifié", 401));
    }

    if (req.user.role !== allowedRole) {
      
      return next(new AppError("Action non autorisée : accès refusé", 403));
    }

    next();
  };
};