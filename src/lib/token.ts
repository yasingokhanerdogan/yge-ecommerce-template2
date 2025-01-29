import { SignJWT, decodeJwt, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
const JWT_ALG = "HS256";
const JWT_EXPIRATION = (process.env.JWT_EXPIRATION || "7d").toString();

export const generateToken = async (id: string) => {
  return await new SignJWT({ id })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
};

export const verifyToken = async (token: string) => {
  return await jwtVerify(token, JWT_SECRET, {
    algorithms: [JWT_ALG],
  });
};

export const getExpireTime = (token: string) => {
  const decoded = decodeJwt(token);
  if (decoded.exp) {
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate;
  } else {
    throw new Error("Expiration (exp) claim is missing in the token.");
  }
};
