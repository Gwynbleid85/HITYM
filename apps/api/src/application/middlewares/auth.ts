import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type JWTUser = {
  sub: string;
  email: string;
  name: string;
};

// Extend Express Request interface to include user property
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JWTUser;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).send({ error: "Authentication failed." });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "") as JWTUser;
    if (!user) {
      res.status(401).send({ error: "Authorization failed." });
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Authorization failed." });
  }
};

export default auth;
