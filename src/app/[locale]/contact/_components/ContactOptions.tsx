import { ContactOptionsClient } from './ContactOptionsClient';

export async function ContactOptions() {
  const email = process.env.CONTACT_EMAIL ?? '';
  const waNumber = process.env.CONTACT_WA_NUMBER ?? '';

  const emailHref = `mailto:${email}`;
  const waHref = `https://wa.me/${waNumber}`;

  return <ContactOptionsClient emailHref={emailHref} waHref={waHref} />;
}
