import { Router } from "express";
import userService from "../services/userService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await userService.register(username, email, password);
    res.cookie("auth", result, { httpOnly: true });
    res
      .status(201)
      .json({ message: "User registered successfully!", token: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.login(email, password);

    res
      .status(200)
      .cookie("auth", result, { httpOnly: true })
      .send(result.user)
      .end();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

userController.post("/logout", async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userController.get("/profile", authMiddleware, async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const user = await userService.getUserById(userId);

    res.status(200).json(user).end();
  } catch (error) {
    res.status(500).json({ message: error.message }).end();
  }
});

export default userController;
