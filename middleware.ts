import { next } from '@vercel/edge';

export const config = {
  matcher: '/api/github/webhooks',
};

export async function middleware(request: any) {
  const json = await request;

  if (!json) {
    return next();
  }

  if (
    json.action === 'opened' &&
    json.pull_request &&
    json.pull_request.state === 'open'
  ) {
    return next();
  }

  if (
    json.action === 'created' &&
    json.sender &&
    json.sender.type === 'User' &&
    json.comment &&
    json.comment.body &&
    json.comment.body.startsWith('/cr.gpt')
  ) {
    return next();
  }

  return Response.redirect('https://github.com/apps/cr-gpt');
}
