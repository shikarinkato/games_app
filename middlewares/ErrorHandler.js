export const ErrorHandler = (res, statusCode, message) => {
  res.status(statusCode).json({
    message: message,
    success: false,
  });
  return;
};
