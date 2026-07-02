import { type Href } from 'expo-router';

export function aiConsultHref(): Href {
  return '/ai-consult' as Href;
}

export function aiConsultSessionHref(sessionId: string): Href {
  return `/ai-consult/${sessionId}` as Href;
}
