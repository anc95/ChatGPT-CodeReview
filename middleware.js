export const config = {
  matcher: '/api/github/webhooks',
};

export default async function middleware(request) {
  const json = await request.json();

  console.log(json.issue)

  if (!json.issue) {
    return Response.redirect('https://github.com/apps/chatgpt-codereview-bot');
  }

  return Response.redirect('https://github.com/apps/chatgpt-codereview-bot1');
}