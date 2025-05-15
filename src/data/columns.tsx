import { type ColumnDef } from "@tanstack/react-table";
import type ReceiptItem from "@/types/receiptItem";

const columns: ColumnDef<ReceiptItem>[] = [
  {
    accessorKey: "name",
    header: "Merchant",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Subtotal</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("quantity")}</div>
    ),
  },
];

export default columns;
