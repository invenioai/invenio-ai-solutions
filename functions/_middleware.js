export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  const acceptsHtml = (request.headers.get('accept') || '').includes('text/html');

  if (
    request.method !== 'GET' ||
    !acceptsHtml ||
    url.searchParams.has('market')
  ) {
    return context.next();
  }

  const country = (request.cf && request.cf.country) || '';

  const marketByCountry = {
    ZA: 'south-africa',
    KW: 'kuwait',
    OM: 'oman',
    GY: 'guyana',
  };

  const market = marketByCountry[country];

  if (!market) {
    return context.next();
  }

  url.searchParams.set('market', market);

  return Response.redirect(url.toString(), 302);
}
