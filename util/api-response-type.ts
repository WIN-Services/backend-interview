export class BadRequestError {
  public error = true;
  public status = 400;
  public data = {
      success: false,
      code: 400,
      error: 'Bad Request',
      message: null, // specific error message from API
      data: null
  };

  constructor(message?: string, data?: any) {
      this.data.message = message || this.data.error;
      this.data.data = data;
  };
}

export class SuccessResponse {
  public error = false;
  public status = 200;
  public data: any;

  constructor(data?: any) {
      this.data = data || { success: true };
  }
}

export const serverError = {
  error: true,
  status: 500,
  data: ''
};
