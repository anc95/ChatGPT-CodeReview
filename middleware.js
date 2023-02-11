import { geolocation } from '@vercel/edge';

const BLOCKED_COUNTRY = 'US';

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  return Response.redirect('https://github.com/apps/chatgpt-codereview-bot');
}