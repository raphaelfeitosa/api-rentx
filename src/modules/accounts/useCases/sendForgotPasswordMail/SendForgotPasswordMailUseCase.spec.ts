import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            name: "Tested",
            email: "teste@teste.com.br",
            driver_license: "666123",
            password: "123",
        });

        await sendForgotPasswordMailUseCase.execute("teste@teste.com.br");

        expect(sendMail).toHaveBeenCalled();

    });

    it("should be able to send an email if user does not exists", async () => {

        await expect(
            sendForgotPasswordMailUseCase.execute("teste123@teste.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {

        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            name: "Tested",
            email: "teste156@teste.com.br",
            driver_license: "666123",
            password: "123",
        });

        await sendForgotPasswordMailUseCase.execute("teste156@teste.com.br");

        expect(generateTokenMail).toBeCalled();
    });
});