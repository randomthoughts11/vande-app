import type { ReactNode } from 'react';

/** Web / fallback — native builds use stripe-provider.native.tsx */
export function StripeProviderWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
