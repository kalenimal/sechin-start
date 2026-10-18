import { NextResponse, type NextRequest } from 'next/server';
import { isRole, SESSION_COOKIE, type SessionUser } from '@/entities/session';

const demo: Record<string, Omit<SessionUser, 'role'>> = {
  startup: { id: 'u-startup', email: 'startup@demo.ru', fullName: 'Алексей Алексеев', phone: '+7 900 900 00 00' },
  investor: { id: 'u-investor', email: 'investor@demo.ru', fullName: 'Ирина Соколова', phone: '+7 900 900 00 01' },
  corporate: { id: 'u-corporate', email: 'corporate@demo.ru', fullName: 'Павел Лебедев', phone: '+7 900 900 00 02' },
  expert: { id: 'u-expert', email: 'expert@demo.ru', fullName: 'Ольга Никитина', phone: '+7 900 900 00 03' },
};

/** Mock-mode helper: /api/demo-login?role=investor&next=/dashboard signs in as a demo account. */
export function GET(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_MOCK_API === 'false') return new NextResponse('Not found', { status: 404 });
  const role = request.nextUrl.searchParams.get('role');
  const next = request.nextUrl.searchParams.get('next') ?? '/dashboard';
  if (!isRole(role)) return new NextResponse('Unknown role', { status: 400 });
  const response = NextResponse.redirect(new URL(next.startsWith('/') ? next : '/dashboard', request.url));
  const user: SessionUser = { ...demo[role], role };
  response.cookies.set(SESSION_COOKIE, encodeURIComponent(JSON.stringify(user)), {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
