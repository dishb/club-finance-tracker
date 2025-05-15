export default interface ReceiptItem {
  name: string; // merchant
  quantity: number;
  price: number; // subtotal
  total?: number; // total
}
