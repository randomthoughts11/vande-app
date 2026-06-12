import { createPaymentIntent } from './api';

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

export const isStripeConfigured = publishableKey.length > 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PaymentSheetFns = {
  initPaymentSheet: (params: any) => Promise<{ error?: { message: string; code?: string } }>;
  presentPaymentSheet: () => Promise<{ error?: { message: string; code?: string } }>;
};

export async function processPayment(
  { initPaymentSheet, presentPaymentSheet }: PaymentSheetFns,
  amountCents: number,
  metadata?: Record<string, string>,
): Promise<boolean> {
  if (!isStripeConfigured) {
    await createPaymentIntent(amountCents, metadata);
    return true;
  }

  const { clientSecret } = await createPaymentIntent(amountCents, metadata);

  const { error: initError } = await initPaymentSheet({
    merchantDisplayName: 'Vande Wellness',
    paymentIntentClientSecret: clientSecret,
    defaultBillingDetails: { name: 'Vande Member' },
  });

  if (initError) throw new Error(initError.message);

  const { error: presentError } = await presentPaymentSheet();
  if (presentError) {
    if (presentError.code === 'Canceled') return false;
    throw new Error(presentError.message);
  }

  return true;
}
