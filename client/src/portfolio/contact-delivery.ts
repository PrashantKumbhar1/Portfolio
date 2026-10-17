import emailjs from '@emailjs/browser';
import { buildContactParams, type ContactValues } from './contact-validation';

type Response = { status: number; text: string };
type Sender = (service: string, template: string, params: Record<string, string>, options: { publicKey: string }) => Promise<Response>;
export class DeliveryTimeout extends Error {
  constructor() { super('Email delivery confirmation timed out.'); this.name = 'DeliveryTimeout'; }
}
export async function sendContact(values: ContactValues, options: { send?: Sender; timeoutMs?: number; config?: { service: string; template: string; publicKey: string } } = {}) {
  const config = options.config ?? {
    service: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_z99kepf',
    template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_se0l83o',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'muxiwr4l_a10uDG75',
  };
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // SDK rate limiting records attempts before the API confirms success. Keep
    // the form's post-success cooldown instead, so failed attempts can be retried.
    const request = (options.send ?? emailjs.send)(config.service, config.template, buildContactParams(values), { publicKey: config.publicKey });
    const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new DeliveryTimeout()), options.timeoutMs ?? 20000); });
    const result = await Promise.race([request, timeout]);
    if (result.status !== 200) throw result;
    return result;
  } finally { if (timer) clearTimeout(timer); }
}
export function deliveryError(error: unknown) {
  if (error instanceof DeliveryTimeout) return { message: 'The email service did not confirm the send in time. Your message is saved here. Delivery is uncertain, so check before sending it again.', detail: 'EmailJS response timeout (20 seconds).' };
  const response = error && typeof error === 'object' ? error as { status?: unknown; text?: unknown; message?: unknown } : {};
  const status = Number(response.status) || 0;
  const text = String(response.text ?? response.message ?? '').replace(/\s+/g, ' ').slice(0, 500);
  const detail = [status ? `EmailJS ${status}` : 'EmailJS connection error', text].filter(Boolean).join(': ');
  let message = 'The email service could not send your message. Your text is preserved. Please try again or use the email link.';
  if (status === 429) message = 'EmailJS is limiting requests. Please wait a minute before trying again. Your message is preserved.';
  else if (/origin|domain|allowlist|whitelist/i.test(text)) message = 'EmailJS is not allowing this website address to send mail. The site owner needs to check the EmailJS domain settings.';
  else if (/gmail|oauth|invalid.grant|authentication|access.token|refresh.token/i.test(text)) message = 'The email account connected to EmailJS needs attention. The site owner needs to reconnect or repair that email service.';
  else if ([400,401,403,404,412].includes(status)) message = 'EmailJS rejected the request. The service, template, or account settings need to be checked. Your message is preserved.';
  else if (!status) message = 'Could not connect to EmailJS. Check your connection or browser blocking settings, then try again. Your message is preserved.';
  return { message, detail };
}
