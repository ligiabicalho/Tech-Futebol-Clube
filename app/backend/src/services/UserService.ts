import { compareSync } from 'bcryptjs'; // (senha inserida, senha criptografada no db) return boolean;
import { ModelStatic } from 'sequelize';
import { IPayload, UserLogin } from '../interfaces/IUser';
import Unauthorized from '../errors/Unauthorized';
import TokenJWT from '../auth/TokenJWT';
import User from '../database/models/UserModel';

export default class UserService {
  private _jwt: TokenJWT;
  private _userModel: ModelStatic<User>;
  constructor() {
    this._userModel = User;
    this._jwt = new TokenJWT();
  }

  async login(userLogin: UserLogin): Promise<string> {
    const { email, password } = userLogin;
    const user = await this._userModel.findOne({ where: { email }, raw: true }); // raw: true -> retorna JSON leve, ao invés de um Model completo.

    if (!user || !password || !compareSync(password, user.password)) { // se email (usuário não encotrado) ou a senha não estiver correta.
      throw new Unauthorized('Invalid email or password');
    }

    const { id, username, role } = user;
    const payload: IPayload = { id, username, email, role };
    const token = this._jwt.generateToken(payload);
    return token;
  }
}
