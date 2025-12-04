import { JwtPayload } from "jsonwebtoken";
import type { ITokenPayload } from "./token";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
    }
  }
}
 export{}