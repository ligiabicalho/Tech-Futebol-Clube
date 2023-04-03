import statusCodes from '../utils/statusCode';

export default class Unauthorized extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}
