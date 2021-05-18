import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/repositories/UserRepository";
import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {

        const { sub: user_id } = verify(token, "69acf12ae6c9b2ca3e3e71dc6793bb91") as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User dos not exists", 401);

        }

        request.user = {
            id: user_id
        }

        next();
    }

    catch {
        throw new AppError("Invalid token!", 401);
    }
}