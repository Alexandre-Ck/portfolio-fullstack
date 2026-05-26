class AppError extends Error {
constructor(message, statusCode) {
super(message);
// appelle le constructeur de Error
this.statusCode = statusCode;// code HTTP associé à l'erreur
this.name = "AppError";// nom de l'erreur pour le debug en mode simplissimo
}
}
export default AppError;