import statusCodes from '../utils/statusCode';

export default class BadRequest extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
