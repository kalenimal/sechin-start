import 'server-only';
import { cookies } from 'next/headers';
import { decodeSession } from './cookie';
import { SESSION_COOKIE } from './types';

export async function getServerSession() {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}
