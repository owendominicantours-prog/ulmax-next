import { NextResponse } from 'next/server';

const DEFAULT_ADMIN_USER = 'admin@ulmax.local';
const DEFAULT_ADMIN_PASSWORD = 'Ulmax2026!';

function parseBasicAuth(header) {
  if (!header?.startsWith('Basic ')) return null;

  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(':');
    if (separator === -1) return null;
    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function proxy(request) {
  const credentials = parseBasicAuth(request.headers.get('authorization'));
  const adminUser = process.env.ULMAX_ADMIN_USER || DEFAULT_ADMIN_USER;
  const adminPassword = process.env.ULMAX_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  if (credentials?.user === adminUser && credentials.password === adminPassword) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.rewrite(url);
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ULMAX Admin"',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
