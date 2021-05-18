import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUserCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";



let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUserCase;
describe("Create Category", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUserCase(usersRepositoryInMemory);

    });

    it("should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "raphaelcs2@gmail.com",
            password: "1234",
            name: "Raphael Feitosa"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");

    });

    it("should not be able to authenticate an nonexistent user", () => {

        expect(async () => {

            await authenticateUserUseCase.execute({
                email: "fasel@email.com",
                password: "1234"
            });

        }).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able to authenticate with incorrect password", () => {

        expect(async () => {

            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com.br",
                password: "1234",
                name: "User test error"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            })

        }).rejects.toBeInstanceOf(AppError);

    });
});