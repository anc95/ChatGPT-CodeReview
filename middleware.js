export const config = {
  matcher: '/api/github/webhooks',
};

export default function middleware(request) {
  console.log(JSON.stringify(request))
  return Response.redirect('https://github.com/apps/chatgpt-codereview-bot');
}