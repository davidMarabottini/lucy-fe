import type { decodedToken } from "../auth/types";

export const generateMockJWT = (user: string = 'user-mock', role: string = 'admin'): string => {
  const now = Math.floor(Date.now() / 1000);
  const minutesToExpire = 10;
  const exp = now + (minutesToExpire * 60);
  const created = new Date(now * 1000).toISOString();

  const alg = "HS256";
  const typ = "JWT";

  const payload = {
    user,
    role,
    created,
    exp,
    iat: now,
  };

  const header = btoa(JSON.stringify({ alg, typ }));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = "mock_signature_12345";

  return `${header}.${encodedPayload}.${signature}`;
};

export const getDecodedToken = (token: string | null): decodedToken | null => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (e) {
    console.error('Invalid token format:', e);
    return null;
  }
};