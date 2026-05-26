import AppError from "../errors/AppError.js";

const errorHandler = (err, req, res, next) => {

if (err instanceof AppError) {
return res.status(err.statusCode).json({
message: err.message,
});
}

console.error(err.stack);

res.status(500).json({
message: "Erreur serveur interne",
});
};
export default errorHandler;