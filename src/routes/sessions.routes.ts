import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";
const sessionsRouter = Router();

sessionsRouter.post("/", async (resquest, response) => {
  try {
    const { email, password } = resquest.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    //@ts-ignore
    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
