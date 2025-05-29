/* eslint-disable @typescript-eslint/no-explicit-any */
export const decodeJWT = <T = any>(token: string): T | null => {
  try {
    const payload = token.split('.')[1];
    const decodedJson = atob(payload!);
    return JSON.parse(decodedJson) as T;
  } catch (error) {
    console.error('invalid token', error);
    return null;
  }
};
