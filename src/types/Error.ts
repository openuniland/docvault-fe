export interface BackEndError {
  errors: {
    errorCode: string;
    service: string;
    status: number;
  };
  message: string;
}
