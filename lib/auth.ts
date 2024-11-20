import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUser } from "./user";

const COOKIE_NAME = "auth_token";
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

export const createAuthToken = (email: string): string => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "7d" });
};

export const decodeToken = (token: string): { email: string } | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as { email: string };
  } catch {
    return null;
  }
};

export const loginUser = (email: string): NextResponse => {
  const token = createAuthToken(email);

  const response = NextResponse.json({ message: "User logged in" });
  response.cookies.set(COOKIE_NAME, token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get(COOKIE_NAME);

  if (!cookie) return false;

  const decoded = decodeToken(cookie.value);
  return !!decoded && !!findUser(decoded.email);
};

export const logoutUser = (): NextResponse => {
  const response = NextResponse.json({ message: "User logged out" });
  response.cookies.delete(COOKIE_NAME);

  return response;
};