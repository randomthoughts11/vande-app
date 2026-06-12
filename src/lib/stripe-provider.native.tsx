import type { ReactNode } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

const stripeKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? 'pk_test_placeholder';

export function StripeProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <StripeProvider publishableKey={stripeKey}>
      <>{children}</>
    </StripeProvider>
  );
}
