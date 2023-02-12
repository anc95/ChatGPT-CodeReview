export const config = {
  matcher: '/api/github/webhooks',
};

export default async function middleware(request) {
  console.log(JSON.stringify(await request.json()))
  return Response.redirect('https://github.com/apps/chatgpt-codereview-bot');
}