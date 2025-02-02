import { compare } from 'bcrypt';

export async function comparePassword(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return await compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error('Erro ao comparar senhas:', error);
    throw new Error('Falha na comparação de senhas');
  }
}
