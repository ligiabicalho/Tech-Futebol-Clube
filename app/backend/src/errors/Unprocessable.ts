import statusCodes from '../utils/statusCode';

export default class Unprocessable extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCodes.UNPROCESSABLE;
  }
}
