import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  parentId?: number;
  sub?: string;
  email?: string;
  name?: string;
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
}

export function getTokenData(): TokenPayload | null {
  const token = Cookies.get("token");
  if (!token) return null;
  return decodeToken(token);
}
