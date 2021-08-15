import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import ensureAuthenticated from "../meddlewares/ensuruAuthenticanted";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (resquest, response) => {
    try {
        const { name, email, password } = resquest.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

usersRouter.patch(
    "/avatar",
    ensureAuthenticated,
    upload.single("avatar"),
    async (request, response) => {
        try {
            const updateUserAvatarService = new UpdateUserAvatarService();

            await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            })

            return response.json({ ok: true})
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
);

export default usersRouter;
