import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUserRepository";


@injectable()
class CreateUserUserCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<void> {


        await this.usersRepository.create({

            name, username, email, password, driver_license
        });
    }
}

export { CreateUserUserCase };