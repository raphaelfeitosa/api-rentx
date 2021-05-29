import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken"
import { UsersTokensRepository } from "@modules/accounts/infra/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {

        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;
        
        const user = usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

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