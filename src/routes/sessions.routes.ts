import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";
const sessionsRouter = Router();

sessionsRouter.post("/", async (resquest, response) => {
    try {
        const { email, password } = resquest.body;

        const authenticateUser = new AuthenticateUserService();
        
        const { user } = await authenticateUser.execute({
            email,
            password,
        });

        // delete user.password;

        return response.json({user});
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default sessionsRouter;