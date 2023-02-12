export const config = {
  matcher: '/',
};

export default function middleware(request) {
  return Response.redirect('https://github.com/apps/chatgpt-codereview-bot');
}