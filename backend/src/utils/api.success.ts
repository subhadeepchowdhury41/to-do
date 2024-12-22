export class APISuccess {
  status: number;
  data: any;
  message: string;
  constructor(status: number, message: string, data?: any) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}
