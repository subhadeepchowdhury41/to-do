export class APIerror extends Error {
  status: number;
  errors: any;
  constructor(status: number, message: string, errors?: any) {
    super(message);
    this.status = status;
  }
}
