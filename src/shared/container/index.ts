import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/Implementations/CategoriesRepository";

import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/Implementations/SpecificationsRepository";

import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UserRepository";



//const containerRegister = (): void => {
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)
//}

//export { containerRegister };