/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { hash, genSalt } from 'bcrypt';

export async function encrypt(password: string): Promise<string> {
  const salt = await genSalt();
  return hash(password, salt);
}
