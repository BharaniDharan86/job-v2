import jwt from "jsonwebtoken";

export function createJWT(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}
