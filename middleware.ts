import { next, rewrite } from '@vercel/edge';

export const config = {
  matcher: '/api/github/webhooks',
};

export default async function middleware(request: any) {
  let json;

  setTimeout(() => {
    console.log(1000);
  });
  setTimeout(() => {
    console.log(1000);
  }, 10000);

  try {
    console.log('enter');
    json = await request?.json?.();
  } catch {
    return rewrite(new URL('https://github.com/apps/cr-gpt'));
  }

  if (!json) {
    console.log('received is not a json');
    return rewrite(new URL('https://github.com/apps/cr-gpt'));
  }

  if (
    json.action === 'opened' &&
    json.pull_request &&
    json.pull_request.state === 'open'
  ) {
    console.log('received an open pull_request');
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
    console.log('received a comment');
    return next();
  }

  return rewrite(new URL('https://github.com/apps/cr-gpt'));
}
