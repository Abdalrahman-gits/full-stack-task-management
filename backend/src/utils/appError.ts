type ErrorDetail = { field: string; message: string };
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  errors?: ErrorDetail[];

  constructor(message: string, statusCode: number, errors?: ErrorDetail[]) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    if (errors) this.errors = errors;
  }
}

export default AppError;
