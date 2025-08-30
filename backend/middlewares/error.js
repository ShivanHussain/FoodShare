class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {

  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Create a copy of the error to avoid mutation issues
  let error = { ...err };
  error.message = err.message;

  // Duplicate key error (like duplicate email)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }

  // Invalid JWT
  if (err.name === "JsonWebTokenError") {
    error = new ErrorHandler("Json Web Token is invalid, Try again!", 400);
  }

  // Expired JWT
  if (err.name === "TokenExpiredError") {
    error = new ErrorHandler("Json Web Token is expired, Try again!", 400);
  }

  // Mongoose cast error (invalid MongoDB ID)
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new ErrorHandler(message, 400);
  }

  const errorMessage = error.errors
    ? Object.values(error.errors).map((error) => error.message).join(" ")
    : error.message;

  return res.status(error.statusCode || 500).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
