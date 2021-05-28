import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensrepository {
    create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens>;
    // findByEmail(email: string): Promise<User>;
    // findById(id: string): Promise<User>;
}

export { IUsersTokensrepository };