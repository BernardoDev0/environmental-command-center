import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const requireAuth = (allowedRoles?: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.slice(7);

    try {
      const payload = jwt.verify(token, JWT_SECRET) as { sub: string; role: Role };

      if (!payload?.sub) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (allowedRoles && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = { id: payload.sub, role: payload.role };
      next();
    } catch (error) {
      console.error("Auth middleware error", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
