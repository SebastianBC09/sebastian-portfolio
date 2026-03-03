import { setRequestLocale } from 'next-intl/server';
import { ContactBridge } from './_components/ContactBridge';
import { ContactOptions } from './_components/ContactOptions';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactBridge />
      <ContactOptions />
    </>
  );
}
