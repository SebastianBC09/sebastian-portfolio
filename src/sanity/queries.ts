import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const { projectId, dataset } = client.config();

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

export type PostCategory = 'fundamentals' | 'languages' | 'craft' | 'books';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updatedAt?: string;
  description: string;
  category: PostCategory;
  tags: string[];
  locale: string;
  published: boolean;
  featured: boolean;
  readingTime: number;
  coverImage?: SanityImageSource;
}

export interface PostFull extends PostMeta {
  body: unknown[];
}

const POST_META_FIELDS = `
  "slug": slug.current,
  title,
  date,
  updatedAt,
  description,
  category,
  tags,
  locale,
  published,
  featured,
  readingTime,
  coverImage
`;

export async function getAllPosts(): Promise<PostMeta[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current) && published == true]
     | order(date desc)[0...12]{ ${POST_META_FIELDS} }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == "${slug}" && defined(slug.current) && published == true][0]
     { ${POST_META_FIELDS}, body }`,
    {},
    { cache: 'no-store' }
  );
}

export async function getAllSlugs(): Promise<string[]> {
  const posts: { slug: string }[] = await client.fetch(
    `*[_type == "post" && defined(slug.current) && published == true]{ "slug": slug.current }`,
    {},
    { cache: 'no-store' }
  );
  return posts.map((p) => p.slug);
}
