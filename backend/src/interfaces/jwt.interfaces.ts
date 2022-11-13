// main
import { JwtPayload } from "jsonwebtoken";

export interface EmailTokenPayload extends JwtPayload {
  _id: string;
}
