class ClientError {
  //4XX
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  public showError() {
    console.log(this.status, this.message);
  }
}

export class IdNotFoundError extends ClientError {
  public constructor(id: number) {
    super(404, `id ${id} not found`);
  }
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(404, `route ${route} not found`);
  }
}

export class ValidationError extends ClientError {
  public constructor(message: string) {
    super(400, message);
  }
}

export default ClientError;