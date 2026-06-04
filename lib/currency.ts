// Conversion rate: 1 USD = 83 INR (approx)
export const INR_TO_USD = 0.012;
export const USD_TO_INR = 83;

export function formatMoney(amount: number, currency: 'INR' | 'USD'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export function convertCurrency(amount: number, from: 'INR' | 'USD', to: 'INR' | 'USD'): number {
  if (from === to) return amount;
  if (from === 'INR' && to === 'USD') return amount * INR_TO_USD;
  return amount * USD_TO_INR;
}