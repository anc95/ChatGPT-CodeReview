import { NextResponse } from 'next/server';

globalThis.__dirname = '/';

console.log(__dirname);

export const config = {
  matcher: '/api/github/webhooks',
};

export async function middleware(request: any) {
  const json = await request;

  if (!json) {
    return NextResponse.next();
  }

  if (
    json.action === 'opened' &&
    json.pull_request &&
    json.pull_request.state === 'open'
  ) {
    return NextResponse.next();
  }

  if (
    json.action === 'created' &&
    json.sender &&
    json.sender.type === 'User' &&
    json.comment &&
    json.comment.body &&
    json.comment.body.startsWith('/cr.gpt')
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect('https://github.com/apps/cr-gpt');
}
