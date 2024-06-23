class ApiError extends Error {
  private statusCode: number;
  private error: string;

  constructor(statusCode: number, message: string, error: string = 'Error') {
      super(message);
      this.statusCode = statusCode;
      this.error = error;
  }

  getResponse() {
    return {
      error: this.error,
      code: this.statusCode,
      message: this.message
    }
  }

  getStatusCode() {
    return this.statusCode
  }
}

export default ApiError;