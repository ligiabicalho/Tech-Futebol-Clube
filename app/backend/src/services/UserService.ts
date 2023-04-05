import { compareSync } from 'bcryptjs'; // (senha inserida, senha criptografada no db) return boolean;
import { ModelStatic } from 'sequelize';
import { IUser, UserLogin } from '../interfaces/IUser';
import Unauthorized from '../errors/Unauthorized';
import User from '../database/models/UserModel';

export default class UserService {
  constructor(private _userModel: ModelStatic<User> = User) {
  }

  async login(userLogin: UserLogin): Promise<IUser> {
    const { email, password } = userLogin;
    const user = await this._userModel.findOne({ where: { email }, raw: true }); // raw: true -> retorna JSON leve, ao invés de um Model completo.

    if (!user || !compareSync(password, user.password)) { // usuário não enconstrado! email ou senha incorreta.
      throw new Unauthorized('Invalid email or password');
    }

    return user;
  }
}
