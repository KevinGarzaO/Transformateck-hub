import { NextResponse } from 'next/server';
import { createToken, setAuthCookie, OneUser } from '@transformateck/auth-one';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // MOCK VALIDATION - Ecosistema Personal
    if (password !== 'avocado2026') {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const userData: OneUser = {
      userId: 'user_01_one',
      email: email,
      role: 'creator',
      projects: ['avocado', 'specforge']
    };

    const token = await createToken(userData);
    await setAuthCookie(token);

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
