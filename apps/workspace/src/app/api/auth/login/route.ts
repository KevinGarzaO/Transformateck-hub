import { NextResponse } from 'next/server';
import { createToken, setAuthCookie, WorkspaceUser } from '@transformateck/auth-workspace';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // MOCK VALIDATION - En el futuro aquí se valida contra una DB de usuarios globales de workspace
    if (password !== 'transsync2026') {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const userData: WorkspaceUser = {
      userId: 'user_01_workspace',
      email: email,
      role: 'admin',
      products: [
        { product: 'transsync', companyId: 'comp_01', role: 'owner', plan: 'enterprise' },
        { product: 'inventarios', companyId: 'comp_01', role: 'admin', plan: 'trial' }
      ]
    };

    const token = await createToken(userData);
    await setAuthCookie(token);

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
