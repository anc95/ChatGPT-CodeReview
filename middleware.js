export const config = {
  matcher: '/api/github/webhooks',
};

export default async function middleware(request) {
  const json = await request.json();

  if (!json) {
    return;
  }

  if (json.action === "opened" && json.action.pull_request && json.action.pull_request.state === 'open') {
    return;
  }

  if (json.action === 'created' && json.sender && json.sender.type === 'User' && json.comment && json.comment.body && json.comment.body.startsWith('@CR')) {
    return
  }

  return Response.redirect('https://github.com/apps/cr-gpt');
}