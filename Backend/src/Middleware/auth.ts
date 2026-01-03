import { auth as betterAuth } from "../lib/auth";
import { NextFunction, Request, Response, Router } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}
const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Your Email is not verified",
        });
      }

      console.log(session);
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Frobidden ! You dont Have Permission to acccess this recource",
        });
      }
      next();
    } catch (error) {
      console.error("Authentication midddleware failed");
    }
  };
};

export default auth;
