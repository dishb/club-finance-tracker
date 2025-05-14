export default interface ReceiptItem{
    text: string;
    subtotal: number;
    tax: number;
    total: number;
    date: Date;
    vendor: string;
}
