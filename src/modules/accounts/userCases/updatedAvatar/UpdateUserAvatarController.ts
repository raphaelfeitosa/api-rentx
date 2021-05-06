import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatedUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.user;

        const avatar_file = request.file.filename;

        const updatedUserAvatarUseCase = container.resolve(UpdatedUserAvatarUseCase);

        await updatedUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };