interface PrismaErrorMeta {
  target?: string[];
}

class ErrorResponse extends Error {
  statusCode: number;
  code?: string; // Prisma error code
  meta?: PrismaErrorMeta; // Additional meta information

  constructor(message: string, statusCode: number, code?: string, meta?: PrismaErrorMeta) {
      super(message);
      this.statusCode = statusCode;
      this.code = code;
      this.meta = meta;
  }
}

export default ErrorResponse;