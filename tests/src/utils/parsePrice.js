export function parsePrice(priceStr = '') {
  return parseFloat(priceStr.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
}
