import { getAllPosts } from '@/sanity/queries';

export async function GET() {
  const posts = await getAllPosts('en');

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>https://bccloudsolutions.dev/en/blog/${post.slug}</link>
      <guid isPermaLink="true">https://bccloudsolutions.dev/en/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Sebastian Ballen — Blog</title>
      <description>Engineering concepts, tools, languages, and the occasional book — written to be useful, not impressive.</description>
      <link>https://bccloudsolutions.dev/en/blog</link>
      <atom:link href="https://bccloudsolutions.dev/feed.xml" rel="self" type="application/rss+xml"/>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
