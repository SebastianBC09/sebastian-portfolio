import { PortableText } from 'next-sanity';
import { portableTextComponents } from '@/lib/portableTextComponents';
import type { PostFull } from '@/sanity/queries';

interface PostBodyProps {
  body: PostFull['body'];
}

export function PostBody({ body }: PostBodyProps) {
  return (
    <article className="w-full" style={{ maxWidth: '68ch' }}>
      {/* Reading lane — generous line height, proper rhythm */}
      <div className="post-body">
        <PortableText
          value={body as Parameters<typeof PortableText>[0]['value']}
          components={portableTextComponents}
        />
      </div>
    </article>
  );
}
