import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    revalidatePath('/[locale]/blog', 'page');
    revalidatePath('/[locale]/blog/[slug]', 'page');

    return NextResponse.json(
      { revalidated: true, timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error revalidating', error }, { status: 500 });
  }
}
