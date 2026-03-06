import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ProjectsBridge } from './_components/ProjectsBridge';
import { ProjectsFolders } from './_components/ProjectsFolders';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: `${t('bridge.heading')} ${t('bridge.headingAccent')} — Sebastian Ballen`,
    description: t('bridge.description'),
  };
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBridge />
      <ProjectsFolders />
    </>
  );
}
