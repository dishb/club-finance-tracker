export default interface Receipt {
  merchant: string;
  total: number;
  tax: number;
  date: Date;
  time: string;
}
