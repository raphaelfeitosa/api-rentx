import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensrepository } from "@modules/accounts/repositories/IUsersTokensrepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../typeorm/entities/UserTokens";


class UsersTokensRepository implements IUsersTokensrepository {

    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {

        const userToken = this.repository.create({
            user_id, expires_date, refresh_token
        });

        await this.repository.save(userToken);

        return userToken;


    }

}

export { UsersTokensRepository };