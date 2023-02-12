export const config = {
  matcher: '/api/github/webhooks',
};

export default async function middleware(request) {
  const json = await request.json();

  if (!json) {
    return Response.next();
  }

  if (json.action === "opened" && json.pull_request && json.pull_request.state === 'open') {
    return Response.next();
  }

  if (json.action === 'created' && json.sender && json.sender.type === 'User' && json.comment && json.comment.body && json.comment.body.startsWith('@CR')) {
    return Response.next();
  }

  return Response.redirect('https://github.com/apps/cr-gpt');
}