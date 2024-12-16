import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies["auth"]?.accessToken || null;

  if (!token) {
    return res.status(401).send({ message: "Invalid token!" }).end();
  }

  try {
    const decodedToken = jwt.verify(token, "MYSECRET");

    req.user = decodedToken;
    req.isAuthenticated = true;

    next();
  } catch (err) {
    res.status(401).end();
  }
};
