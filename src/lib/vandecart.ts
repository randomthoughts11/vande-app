import * as WebBrowser from 'expo-web-browser';
import { VANDECART_BASE_URL } from './constants';

export async function openVandeCart(path = ''): Promise<void> {
  const url = path.startsWith('http') ? path : `${VANDECART_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  await WebBrowser.openBrowserAsync(url);
}

export function buildProductUrl(sku: string): string {
  return `${VANDECART_BASE_URL}/products/${sku}`;
}
