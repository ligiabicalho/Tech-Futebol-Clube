// pq não posso usar const e maiúsculas como no TrybeSmith??
// enum -> define/restringe um conjunto de valores permitidos para constantes.
enum statusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export default statusCodes;
