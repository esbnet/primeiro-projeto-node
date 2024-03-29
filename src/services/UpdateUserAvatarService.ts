import { getRepository } from "typeorm";
import path = require("path");
import fs = require("fs");

import User from "../models/User";
import uploadConfig from "../config/upload";

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute( {user_id, avatarFilename}: Request): Promise<User> {

        const usersRepository = getRepository(User);

        const user  = await usersRepository.findOne(user_id);

        if(!user) {
            throw new Error("Onlu autenticated users can change avatar.");
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
            user.avatar = avatarFilename;
            await  usersRepository.save(user);

            return user;
        }
    }

}

export default UpdateUserAvatarService