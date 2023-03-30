import statusCodes from '../utils/statusCode';

export default class NotFound extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCodes.NOT_FOUND;
  }
}
